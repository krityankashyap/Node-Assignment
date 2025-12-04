import * as videoService from '../service/videoService.js';

export const createVideo = async (req, res) => {
  try {
    const { title, description, url } = req.body;
    const video = await videoService.createVideo(title, description, url);

    res.status(201).json({
      success: true,
      message: 'Video created successfully',
      video,
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export const getAllVideos = async (req, res) => {
  try {
    const videos = await videoService.getAllVideos();

    res.json({
      success: true,
      count: videos.length,
      videos,
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export const getOneVideo = async (req, res) => {
  try {
    const video = await videoService.getOneVideo(req.params.id);

    res.json({
      success: true,
      video,
    });
  } catch (error) {
    res.status(404).json({ success: false, error: error.message });
  }
};

export const updateVideo = async (req, res) => {
  try {
    const { title, description, url } = req.body;
    const video = await videoService.updateVideo(req.params.id, title, description, url);

    res.json({
      success: true,
      message: 'Video updated successfully',
      video,
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export const deleteVideo = async (req, res) => {
  try {
    const result = await videoService.deleteVideo(req.params.id);

    res.json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export const watchVideo = async (req, res) => {
  try {
    const videoId = req.params.id;
    const userId = req.userId;

    const result = await videoService.watchVideo(videoId, userId);

    res.json({
      success: true,
      message: result.message,
      video: result.video,
    });
  } catch (error) {
    if (error.code === 'SUBSCRIPTION_REQUIRED') {
      return res.status(403).json({
        success: false,
        error: error.code,
        message: error.message,
      });
    }
    res.status(400).json({ success: false, error: error.message });
  }
};

export const getVideoAnalytics = async (req, res) => {
  try {
    const analytics = await videoService.getVideoAnalytics(req.params.id);

    res.json({
      success: true,
      analytics,
    });
  } catch (error) {
    res.status(404).json({ success: false, error: error.message });
  }
};