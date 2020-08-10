const express = require('express');
const router = express.Router();
const conn =  require('../config/db');

router.post('/', (req, res) => {
    const { title, navigateUrl, message, imageUrl } = req.body;
    const sql = `INSERT INTO push_notifications (title, navigateUrl, message, imageUrl) VALUES('${title}','${navigateUrl}', '${message}', '${imageUrl}')`;
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
                data: result
            });
        }
        else {
            res.json({
                success: false,
                msg: "Invalid request"
            });            
        }

    });
});

module.exports = router;