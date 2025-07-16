import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema(
  {
    title: String,
    content: String,
    authorId: String, 
    status: {
      type: String,
      enum: ['draft', 'published'],
      default: 'draft',
    },
  },
  { timestamps: true } 
);

export default mongoose.models.Post || mongoose.model('Post', PostSchema);
