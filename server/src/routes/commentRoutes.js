import { Router } from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import Comment from '../models/Comments.js'

const router = Router();


router.get('/liked', authMiddleware, async (req, res) => {
    try {
        const likedComments = await Comment.find({likes: req.user.id})
            .populate('owner', 'username email')
            .sort({createdAt: -1});
        res.json(likedComments);
    } catch (error) {
        res.status(500).json({message: 'Failed to fetch your liked comments'})
    }
});

router.get('/', async (req, res) => {
    try {
        const comments = await Comment.find()
            .populate('owner', 'username email')
            .sort({createdAt: -1});
        res.json(comments);
    } catch (error) {
        res.status(500).json({message: 'Failed to fetch comments'})
    }
});

router.get('/:id', async (req, res) => {

    try {
        const comment = await Comment.findById(req.params.id)
            .populate('owner', 'username email')
            .populate('comments.user', 'username email');

        if(!comment) return res.status(404).json({ message: 'Comment not found'});
        res.json(comment)
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch comment details'})
    }
});

router.post('/', authMiddleware, async (req, res) => {
    try {
        const comment = await Comment.create({
            ...req.body,
            owner: req.user.id
        });

        res.status(201).json(comment)
    } catch (error) {
        res.status(400).json({message: 'Failed to create comment'})
    }
});

router.post('/:id/like', authMiddleware, async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id)

        if(!comment){
            return res.status(404).json({message: 'Comment not found'})
        }

        const userId = req.user.id;
        const alreadyLiked = comment.likes.some((id) => id.toString() === userId);

        if(alreadyLiked){
            comment.likes = comment.likes.filter((id) => id.toString() !== userId);
        }else{
            comment.likes.push(userId);
        }

        await comment.save();

        const updatedComment = await Comment.findById(req.params.id)
            .populate('owner', 'username email')
            .populate('comments.user', 'username email');

        res.json(updatedComment)
        } catch (error) {
            res.status(500).json({ message: 'Failed to update likes'})
    }
});

router.post('/:id/comments', authMiddleware, async (req, res) => {
    try {
        const { text } = req.body;

        if(!text || text.trim().length < 2){
            return res.status(400).json({
                message: 'Comment must be at least 2 characters long'
            }); 
        }

        const comment = await Comment.findById(req.params.id);

        if(!comment){
            return res.status(404).json({ message: 'Comment not found'})
        }

        comment.comments.push({
            user: req.user.id,
            text: text.trim()
        });

        await comment.save();

        const updatedComment = await Comment.findById(req.params.id)
            .populate('owner', 'username email')
            .populate('comments.user', 'username email');
        res.status(201).json(updatedComment);
    } catch (error) {
        res.status(500).json({ message: 'Failed to add comment'})
    }
});

router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const deletedComment = await Comment.findById(req.params.id);

        if(!deletedComment){
            return res.status(404).json({ message: 'Comment not found'})
        }

        if(deletedComment.owner.toString() !== req.user.id){
            return res.status(403).json({ message: 'You are not the owner of this comment'})
        }

        await Comment.findByIdAndDelete(req.params.id);

        res.json({message: 'Comment deleted successfully'});
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete comment'})
    }
});

export default router;