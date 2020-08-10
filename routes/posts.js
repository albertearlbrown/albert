const express = require('express');
const router = express.Router();
const conn =  require('../config/db');
const jwt = require('jsonwebtoken');
const verifyToken = require('../middlewares/auth');

router.get('/', (req, res) => {
    var sql = `SELECT post_id, title, username, post_thumbnail FROM posts INNER JOIN users ON posts.user_id = users.user_id`;
    conn.query(sql, (err, result) => {
        if(err) throw err;

        if(result.length > 0) {
            res.json({
                success: true,
                data: result            
            })
        }

        else {
            res.json({
                success: false,
                msg: "There are no records"
            });            
        }

    });
})

router.get('/:id', (req, res) => {
    var sql = `SELECT title, username, body  FROM posts INNER JOIN users ON posts.user_id  = users.user_id WHERE posts.post_id = ${req.params.id}`;
    conn.query(sql, (err, result) => {
        if(err) throw err;

        if(result.length > 0) {
            const data = result[0];
            res.json({
                success: true,
                data          
            })
        }
        else {
            res.json({
                success: false,
                msg: `Could not find the post ${req.params.id}`
            });
        }
    });
});

router.post('/', verifyToken , (req, res) => {
       // verify a token symmetric
    jwt.verify(req.token, process.env.privateKey, (err, authData)  => {

        if(err) {
            res.sendStatus(403);
        }
        else {
            const { title, community_categories, summary, post_thumbnail, story, tags} = req.body;
            var sql = "INSERT INTO posts (title, community_categories, summary, post_thumbnail, story, tags, user_id) VALUES ?";            
            var values = [
                [title, community_categories, summary, post_thumbnail, story, tags, authData.user.userid]
            ];
            
            conn.query(sql, [values], (err, result) => {                
                if(err) {
                    res.json({
                        success: false,
                        msg: err.message
                    })
                }
                res.json({
                    success: true,
                    msg: "Post created",
                    authData            
                })        
            });
        }
    });
});



router.get('/:id/comments', async (req, res) => {
    var sql = `SELECT * FROM comments WHERE post_id = ${req.params.id}`;
    conn.query(sql, (err, result) => {
        if(err) throw err;

        if(result.length > 0) {
            res.json({
                success: true,
                data: result            
            })
        }
        else {
            res.json({
                success: false,
                msg: `Could not find the post ${req.params.id} comments`
            }).status(404);
        }
    });
});


router.post('/:id/comments', verifyToken,  (req, res) => {

    jwt.verify(req.token, process.env.privateKey, (err, authData)  => {

        if(err) {
            res.sendStatus(403);
        }
        else {

            const { message, post_id } = req.body;

            var sql = `INSERT INTO comments (message, username, post_id) VALUES ('${message}', '${authData.user.username}', '${post_id}')`;
        
            conn.query(sql, (err, result) => {

                if(err) {
                    res.json({
                        success: false,
                        msg: err.message
                    });
                }
        
                if(result.affectedRows > 0) {
                    res.json({
                        success: true,
                        msg: "comment posted successfully",
                        data: result            
                    })
                }                

                else {
                    res.json({
                        success: false,
                        msg: "Invalid Request Sent"
                    })                    
                }
            });
        }
    });
});

module.exports = router;