const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        maxLength: 15
    },
    description: {
        type: String,
        maxLength:100
    },
    videoUrl: {
        type: String,
        required: true,
    },
    publicId: {
        type: String,
        required: true,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
} , {timestamps:true});

module.exports = mongoose.model('Video' , videoSchema);