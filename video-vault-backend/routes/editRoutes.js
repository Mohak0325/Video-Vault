const express = require("express");
const mongoose = require("mongoose");
const userAuth = require("../middlewares/authMiddleware");
const Video = require("../models/Video");
const { validateVideoDetails } = require("../utils/validateData");
const editRouter = express.Router();

editRouter.put('/details/:id' , userAuth , async(req ,res) => {
    try{
        const videoId = req.params.id;
         if (!mongoose.Types.ObjectId.isValid(videoId)) {
            return res.status(400).json({ message: 'Invalid video ID format' });
        }
        validateVideoDetails(req.body);
        const {title , description} = req.body;

        const video = await Video.findById(videoId);
        if (!video || video.owner.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: 'Access denied. You are not the owner of this video.' });
        }

        video.title = title;
        video.description = description;
        await video.save();

        res.status(200).json({ message: 'Video details updated successfully', video });

    }
    catch(error) {
        return res.status(400).json({ message: error.message });
    }
});

module.exports = editRouter;