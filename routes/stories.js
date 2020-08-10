const express = require('express');
const router = express.Router();
const con = require('../config/db');
const jwt = require('jsonwebtoken');
const verifyToken = require('../middlewares/auth');

router.get('/', (req, res) => {
    const sql = 'SELECT communityTitle, storyTitle, redirectLink, username FROM stories INNER JOIN users ON stories.user_id=users.user_id INNER JOIN communities ON stories.community_id = communities.id';
    con.query(sql, (err, result) => {
        if(err) throw err;
        res.send({
            success: true,
            data: result
        });
    });
});

router.post('/', verifyToken, (req, res) => {
    jwt.verify(req.token, process.env.privateKey, (err, authData) => {
        if(err) throw err;
        const { title, redirectLink, community_id } = req.body;
        const sql = 'INSERT INTO stories (storytitle, redirectLink, community_id, user_id) VALUES (?, ?, ?, ?)';
        con.query(sql, [title, redirectLink, community_id, authData.user.userid], (err, result) => {
            if(err) return res.send({ success: false, error: err.sqlMessage });
            res.send({
                success: true,
                data: result
            });
        });
    });
});

module.exports = router;