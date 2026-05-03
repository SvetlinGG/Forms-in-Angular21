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

