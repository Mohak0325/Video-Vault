const fs = require('fs');
const path = require('path');
const {uploadToCloudinary} = require('../utils/cloudinary');
const Video = require('../models/Video');
const mongoose = require('mongoose');
const { validateVideoDetails } = require('../utils/validateData');

const uploadHelper = async (req , res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No video file uploaded' });
    }
    validateVideoDetails(req.body);

    const { title, description } = req.body;

    const result = await uploadToCloudinary(req.file.buffer);
    
    if (!result || !result.secure_url) {
      return res.status(500).json({ message: 'Video upload failed' });
    }

    const newVideo = new Video({
      title,
      description,
      videoUrl: result.secure_url,
      public_id: result.public_id,
      owner: req.user._id,
    });
    
    const savedVideo = await newVideo.save();

    res.status(201).json({
      message: 'Video uploaded successfully',
      video: savedVideo,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const dashboardHelper = async (req, res) => {
        try {
        // Logic to list videos
        const user = req.user;
        const page = parseInt(req.query.page) || 1;
        const limit = 10;
        const skip = (page - 1) * limit;
        const totalVideos = await Video.countDocuments({ owner: req.user._id });
        const videoList = await Video.find({ owner: req.user._id })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

        if (!videoList) {
            return res.status(404).json({ message: 'No videos found for this user' });
        }
        const videos = videoList.map(video => ({
            id: video._id,
            title: video.title,
            description: video.description,
            videoUrl: video.videoUrl,
            publicId : video.publicId,
        }));

        res.status(200).json({ message: 'Videos listed successfully' , videos , totalVideos , page });

    } catch (error) {
        return res.status(500).json({ message: 'Failed to list videos', error: error.message });
    }
}

const videoDetailsHelper = async (req, res) => {
    try {
        // Logic to get video details by ID

        const videoId = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(videoId)) {
            return res.status(400).json({ message: 'Invalid video ID format' });
        }

        const video = await Video.findById(videoId);
        if (!video) {
            return res.status(404).json({ message: 'Video not found' });
        }
        if (!video.owner.equals(req.user._id)) {
            return res.status(403).json({ message: 'Access denied' });
       }

        res.status(200).json({ message: `Video details for ID: ${videoId}` , video });
    } catch (error) {
        return res.status(500).json({ message: 'Failed to get video details', error: error.message });
    }
}

const deletevideoHelper = async (req , res) => {
        try {
            // Logic to delete video by ID
        const videoId = req.params.id;

        if(!mongoose.Types.ObjectId.isValid(videoId)) {
            return res.status(400).json({ message: 'Invalid video ID' });
        }
        const video = await Video.findOne({ _id: videoId, owner: req.user._id });

        if (!video) {
        return res.status(404).json({ message: 'Video not found or access denied' });
        }

        if (video.publicId) {
        await cloudinary.uploader.destroy(video.publicId, { resource_type: 'video' });
        }

        await video.deleteOne();

        res.status(200).json({ message: `Video with ID: ${videoId} deleted successfully` });
    } catch (error) {
        return res.status(500).json({ message: 'Failed to delete video', error: error.message });
    }
}

const publicVideoDetailsHelper = async (req, res) => {
    try {
        const videoId = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(videoId)) {
            return res.status(400).json({ message: 'Invalid video ID format' });
        }

        const video = await Video.findById({ _id: videoId});
        if (!video) {
            return res.status(404).json({ message: 'Video not found' });
        }

        res.status(200).json({ message: `Public video details for ID: ${videoId}`, video});
    } catch (error) {
        return res.status(500).json({ message: 'Failed to get public video details', error: error.message });
    }
}

module.exports = {uploadHelper, dashboardHelper , videoDetailsHelper , deletevideoHelper , publicVideoDetailsHelper};