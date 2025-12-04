import Video from '../models/Video.js';
import User from '../models/User.js';
import Analytics from '../models/Analytics.js';

export const createVideo = async (title, description, url) => {
  if (!title || !description || !url) {
    throw new Error('Title, description, and URL are required');
  }

  const video = new Video({ title, description, url });
  await video.save();

  return video;
};

export const getAllVideos = async () => {
  const videos = await Video.find();
  return videos;
};

export const getOneVideo = async (videoId) => {
  const video = await Video.findById(videoId);
  if (!video) {
    throw new Error('Video not found');
  }
  return video;
};

export const updateVideo = async (videoId, title, description, url) => {
  const video = await Video.findByIdAndUpdate(
    videoId,
    { title, description, url },
    { new: true, runValidators: true }
  );

  if (!video) {
    throw new Error('Video not found');
  }

  return video;
};

export const deleteVideo = async (videoId) => {
  const video = await Video.findByIdAndDelete(videoId);
  if (!video) {
    throw new Error('Video not found');
  }
  return { message: 'Video deleted successfully' };
};


export const watchVideo = async (videoId, userId) => {

  const user = await User.findById(userId);
  if (!user) {
    throw new Error('User not found');
  }

  if (!user.isSubscribed) {
    const error = new Error('You must subscribe to watch videos');
    error.code = 'SUBSCRIPTION_REQUIRED';
    throw error;
  }

  const video = await Video.findById(videoId);
  if (!video) {
    throw new Error('Video not found');
  }

  const analytics = new Analytics({
    videoId,
    userId,
  });
  await analytics.save();

  video.views += 1;
  await video.save();

  return {
    message: 'Access granted',
    video: {
      id: video._id,
      title: video.title,
      url: video.url,
      views: video.views,
    },
  };
};

export const getVideoAnalytics = async (videoId) => {
  const video = await Video.findById(videoId);
  if (!video) {
    throw new Error('Video not found');
  }

  const totalWatches = await Analytics.countDocuments({ videoId });

  const uniqueViewers = await Analytics.distinct('userId', { videoId });

  return {
    videoTitle: video.title,
    totalViews: totalWatches,
    uniqueViewers: uniqueViewers.length,
  };
};