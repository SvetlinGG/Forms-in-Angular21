import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    comments: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true
            },
            text: {
                type: String,
                required: true,
                minLength: 2,
                maxLength: 300
            },
            createdAt: {
                type: Date,
                default: Date.now
            }
        }
    ]
},
{ timestamps: true}
);

export default mongoose.model('Comment', commentSchema);