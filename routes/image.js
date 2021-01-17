const express = require('express');

const router  = express.Router();

const imageController = require('../controllers/image');

router.post('/image/upload', imageController.uploadImg, imageController.newImage);

router.get('/image/:name', imageController.getOneImage);

module.exports = router; 
