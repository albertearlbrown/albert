const express = require('express');
const router = express.Router();
const con = require('../config/db');
const jwt = require('jsonwebtoken');
const verifyToken = require('../middlewares/auth');

// Get Followers
router.get('/:userid', (req, res) => {
    // checking userid is exist or not
    const sql1 = `SELECT * FROM users WHERE user_id=${req.params.userid}`;
    con.query(sql1, (err1, result1) => {
        if(err1) throw err1;

        if(result1.length > 0) {
            const sql2 = `SELECT * FROM followers WHERE user_id=${req.params.userid}`;
            con.query(sql2, (err2, result2) => {
                if (err2) throw err2;        
                const counts = result2.length > 0 ? result2.length : 0;
                res.send({
                    success: true,
                    follower: counts
                });
            });
        }
        else {
            res.send({
                success: false,
                message: "User is Not Exist"
            });          
        }
    });
});

// Follow Someone
router.post('/:userid', verifyToken, (req, res) => {
    jwt.verify(req.token,  process.env.privateKey, (err, authData) => {
        if(err) throw err;              
        
        const userID = req.params.userid;
        const followerID = authData.user.userid;

        // checking userid is exist or not
        const sql1 = `SELECT * FROM users WHERE user_id=${req.params.userid}`;
        con.query(sql1, (err1, result1) => {
            if(err1) throw err1;

            if(result1.length > 0) {
                // checking if user already follow 
                const sql2 = "SELECT * FROM followers WHERE user_id=? AND follower_id= ?";

                con.query(sql2, [userID, followerID], (err2, result2) => {
                    if(err2) throw err2;
                    if(result2.length > 0) {
                        res.send({
                            success: false,
                            message: 'You are already followed'
                        });
                    }
                    else {
                        const sql = "INSERT INTO followers (user_id, follower_id) VALUES (?, ?)";
                        con.query(sql, [userID, followerID], (err, result) => {
                            if (err) throw err;
                            if(result.affectedRows > 0) {
                                res.send({
                                    success: true
                                });
                            }
                        });                         
                    }
                });               
            }
            else {
                res.send({
                    success: false,
                    message: "User is Not Exist"
                });           
            }
        });        

    });
});

module.exports = router;