const express = require('express');
const router = express.Router();
const con = require('../config/db');

router.get('/', (req, res) => {
    const sql = 'SELECT * FROM communities';
    con.query(sql, (err, result) => {
        if(err) return res.json({ success: false,  error: err.sqlMessage});
        res.send({
            success: true,
            data: result
        });
    });
});

router.post('/', (req, res) => {
    const { title, imageURL } = req.body;
    const sql = 'INSERT INTO communities (title, imageURl) VALUES (?, ?)';
    con.query(sql, [title, imageURL], (err, result) => {
        if(err) return res.json({ success: false,  error: err.sqlMessage});
        res.send({
            success: true,
            data: result
        });
    });
});

module.exports = router;