const dotenv = require('dotenv');
const cloudinary = require('cloudinary').v2;
dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadVideo = async (filePath) => {
    try {
        const result = await cloudinary.uploader.upload(filePath, {
            resource_type: 'video',
            folder: 'video-vault',
            chunk_size: 6000000,
        });
        if (!result || !result.secure_url) {
            throw new Error('No secure URL returned');
        }

        return result;
    } catch (error) {
        throw new Error('Video upload failed: ' + error.message);
    }
};

module.exports = {uploadVideo, cloudinary};