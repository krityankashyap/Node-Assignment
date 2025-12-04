import mongoose from 'mongoose';

const analyticsSchema = new mongoose.Schema({
  videoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Video',
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  watchedAt: {
    type: Date,
    default: Date.now,
  },
  watchDuration: {
    type: Number, // in seconds - how long they watched
    default: 0,
  },
  completionPercentage: {
    type: Number, // 0-100%
    default: 0,
  },
}, { timestamps: true });

// Index for fast queries
analyticsSchema.index({ videoId: 1 });
analyticsSchema.index({ userId: 1 });
analyticsSchema.index({ watchedAt: -1 });

export default mongoose.model('Analytics', analyticsSchema);