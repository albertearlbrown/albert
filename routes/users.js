const express = require('express');
const router = express.Router();
const conn =  require('../config/db');

router.get('/profile/:id', (req, res) => {
    const sql = `SELECT username, firstname, gender, birthdate, role, avatar FROM users WHERE user_id=${req.params.id}`;    
    conn.query(sql, (err, result) => {
        if(result.length > 0) {
            const data =  result[0];
            res.json({
                success: true,
                data
            })
        }
        else {
            res.json({
                success: false,
                msg: `Could not find profile user ${req.params.id}`
            })            
        }
    });
});

module.exports = router;