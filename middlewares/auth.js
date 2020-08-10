// Format of Token
// Authorization: Bearer <access_token>

// Verify token
const auth = (req, res, next) => {
    // get auth header value
    const bearerHeader = req.headers['authorization'];
    // check if bearer is undefined
    if(typeof bearerHeader !== 'undefined') {
        // seperate Authorization header by space
        const bearer = bearerHeader.split(' '); 
        // Get token from array
        const token = bearer[1];                
        // set the token
        req.token = token;
        // Next Middleware
        next();
    } else {
        // Forbidden
        res.json({ 
            msg: "Token is missing"
        }).status(403);
    }   
}

module.exports = auth;