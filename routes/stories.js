const express = require('express');
const router = express.Router();
const con = require('../config/db');
const jwt = require('jsonwebtoken');
const validUrl = require('valid-url');
const verifyToken = require('../middlewares/auth');

router.get('/', (req, res) => {
    const sql = 'SELECT stories.id, communityTitle, storyTitle, redirectLink, username FROM stories INNER JOIN users ON stories.user_id=users.user_id INNER JOIN communities ON stories.community_id = communities.id';
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

        if(title.length === 0) {
            return res.json({ success: false, message: 'Title is require' })
        }

        if(community_id === 0) {
            return res.json({ success: false, message: 'Please select any one from the list of communities' })
        }        

        if(validUrl.isUri(redirectLink) !== true) {
            return res.json({ success: false, message: 'URL is invalid.' })
        }

        const sql = 'INSERT INTO stories (storytitle, redirectLink, community_id, user_id) VALUES (?, ?, ?, ?)';
        con.query(sql, [title, redirectLink, community_id, authData.user.userid], (err, result) => {
            if(err) return res.send({ success: false, message: err.sqlMessage });
            res.send({
                success: true,
                data: result
            });
        });
    });
});

module.exports = router;