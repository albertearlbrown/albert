const express = require('express');
const router = express.Router();
const conn =  require('../config/db');
const jwt = require('jsonwebtoken');
const verifyToken = require('../middlewares/auth');
const fileuploader = require('../utils/fileuploader');

router.post('/', (req, res) => {
    // initialize fileuploader
    var uploader = fileuploader('files', {
        // options will go here

        // limit of files {null, Number}
        // also with the preloaded files
        // important to set 1 if file input has no multiple attribute
        // if null - has no limits
        // example: 3
        limit: null,

        // file's maximal size in MB {null, Number}
        // also with the preloaded files
        // if null - has no limits
        // example: 2
        maxSize: null,

        // each file's maximal size in MB {null, Number}
        // if null - has no limits
        // example: 2
        fileMaxSize: null,

        // allowed extensions or file types {null, Array}
        // if null - has no limits
        // example: ['jpg', 'jpeg', 'png', 'text/plain', 'audio/*']
        extensions: null,
        
        // disallowed extensions or file types {null, Array}
        // if null - has no limits
        // example: ['jpg', 'jpeg', 'png', 'text/plain', 'audio/*']
        disallowedExtensions: null,

        // check if files were choosed (minimum 1 file should be choosed)
        required: false,

        // upload directory {String}
        // note that main directory is the directory where you are initializing the fileuploader module
        // example: '../uploads/'
        uploadDir: 'uploads/',

        // file title {String, Array}
        // example: 'name' - original file name
        // example: 'auto' - random text from 12 letters
        // example: 'my_custom_filename' - custom file name
        // example: 'my_custom_filename_{random}' - my_custom_filename_(+ random text from 12 letters)
        // '{random} {file_name} {file_size} {timestamp} {date} {extension}' - variables that can be used to generate a new file name
        // example: ['auto', 24] - [0] is a string as in the examples above, [1] is the length of the random string
        title: ['auto', 12],
    }, req, res)

    // call to process the form (req.body) and to upload the files
    uploader.upload(function(data) {

        if (data.isSuccess) {
            var files = data.files;
            res.json({
                success: true,
                msg: "fileupload successfully",
                files: files                
            });
        } else {
            var warnings = data.warnings;
            res.json({
                success: false,
                msg: "fileupload failed",
                warnings: warnings                
            })
        }
            
        res.end()
    })
});

module.exports = router;