const multer = require('multer');

const storage = multer.memoryStorage(); // use memory instead of disk

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['video/mp4', 'video/mkv', 'video/webm'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only video files are allowed'), false);
  }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
