const express = require('express');
const router = express.Router();
const conn =  require('../config/db');
const jwt = require('jsonwebtoken');
const md5 = require('md5');

router.post('/login', (req, res) => {

    const { email, password }  = req.body;
    
    const sql = `SELECT * FROM users WHERE email='${email}' AND password='${md5(password)}'`;

    conn.query(sql, (err,result) => {

        if (err) throw err;

        if(result.length > 0) {


            // GET USERNAME FROM DATABASE OF THIS EMAIL
            const getUsername = `SELECT user_id, username, role FROM users WHERE email='${email}'`;

            conn.query(getUsername, (err, result, fields) => {
                const userid = result[0].user_id;
                const username =  result[0].username;
                const userRole = result[0].role;

                const user = {
                    userid: userid,
                    email: email,
                    username: username,
                    password: md5(password),
                    role: userRole
                }
                
                var token = jwt.sign({user}, process.env.privateKey);
                
                res.json({
                    success: true,
                    token
                });
            });
        }

        else {
            res.json({
                success: false,
                msg: "Password is not of this email"          
            });
        }

    });
})

router.post('/register', (req, res) => {    
    
    const { username, firstname, lastname, email, password } = req.body;

     // checking username in database
     const a = `SELECT * FROM users WHERE username='${username}'`;
  
     conn.query(a, (err, result, fields) => {
            
        // if any error in query, tell errors 
        if (err) res.json({ success: false, msg: err.message })

        // checking username already exist or not.
        if(result.length > 0) {
            return res.json({ success: false, msg: "Username is already exist" });
        }
        else {
             // checking email in database
            const b = `SELECT * FROM users WHERE email='${email}'`;

            conn.query(b, (err, result, fields) => {
                
                // if any error in query, tell errors 
                if (err) {
                    return res.json({ success: false, msg: err.message });
                }

                // checking email already exist or not.
                if(result.length > 0) {
                   return res.json({ success: false, msg: "email is already exist" });
                }

                else {

                    // register user 
                    const sql = "INSERT INTO users (username, firstname, last_name, email, password) VALUES ?";
                    var values = [
                        [username, firstname, lastname, email, birthdate, md5(password)]
                    ];
                    conn.query(sql, [values], (err, result) => {
                        
                        // if any error in query, tell errors 
                        if (err) return res.json({ success: false, msg: err.message });

                        else {                            

                            const user = {
                                userid: result.insertId,
                                email: email,
                                username: username,                                
                                password: password
                            }
                
                            var token = jwt.sign({user}, process.env.privateKey);
                
                            res.json({
                                success: true,
                                token,
                                msg: "registered successfully"
                            });
                        }
                    });
                }
            });    
        }
     });
});


module.exports = router;