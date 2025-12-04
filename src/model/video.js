import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  views: {
    type: Number,
    default: 0,
  },
  category: {
    type: String,
    enum: ['Action', 'Drama', 'Comedy', 'Thriller', 'Documentary', 'Education'],
    default: 'Education',
  },
  duration: {
    type: Number, // in seconds
    default: 0,
  },
  thumbnailUrl: {
    type: String,
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

export default mongoose.model('Video', videoSchema);