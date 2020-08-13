const express = require('express');
const router = express.Router();
const conn =  require('../config/db');
const jwt = require('jsonwebtoken');
const verifyToken = require('../middlewares/auth');
const fileuploader = require('../utils/fileuploader');
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart();
const fs = require('fs');
const path = require('path');
const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
AWS.config.update({region: 'us-east-1'});


router.post('/', multipartMiddleware, verifyToken, (req, res) => {

    const fileName = uuidv4() + path.extname(req.files.file.originalFilename);

    var fileStream = fs.createReadStream(req.files.file.path);
    fileStream.on('error', function(err) {
        console.log('File Error', err);
    });

    s3 = new AWS.S3();

    const params = {
        Bucket: 'fnm-uploads', // AWS Bucket Name
        Key: fileName, // Title of file after upload on aws s3 bucket
        Body: fileStream // file path where keep in local computer
    }

    // call S3 to retrieve upload file to specified bucket
    s3.upload (params, function (err, data) {
        if (err) res.json({ success: false, message: err })
        
        if (data) {
            res.json({
                success: true,
                fileUrl: data.Location
            });
        }
    });

});

module.exports = router;