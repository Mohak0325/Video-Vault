const express = require('express');
const userAuth = require('../middlewares/authMiddleware');
const upload = require('../middlewares/multer');
const { uploadHelper , dashboardHelper , videoDetailsHelper , deletevideoHelper, publicVideoDetailsHelper} = require('../controllers/videoController');

const videoRouter = express.Router();

videoRouter.post('/upload', userAuth , upload.single('video'), uploadHelper);

videoRouter.get('/my', userAuth , dashboardHelper);

videoRouter.get('/:id', userAuth , videoDetailsHelper);

videoRouter.delete('/:id', userAuth , deletevideoHelper);

videoRouter.get('/public/:id', publicVideoDetailsHelper);

module.exports = videoRouter;