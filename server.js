const express  =  require('express')
const bodyParser = require('body-parser')
const app = express();
const cors = require('cors');
const errorHandler = require('./middlewares/error');
require('dotenv').config({ path: 'config/config.env' });
const share = require('social-share');

app.use(cors())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use('/uploads', express.static('uploads'))

// Welcome 
app.all('/', (req, res) => {
    res.send('Welcome To Fnmotivation');
});

// routes
app.use('/api/v1/auth', require('./routes/auth'));
app.use('/api/v1/users', require('./routes/users'));
app.use('/api/v1/posts', require('./routes/posts'));
app.use('/api/v1/followers', require('./routes/followers'));
app.use('/api/v1/push_notification', require('./routes/push_notification'));
app.use('/api/v1/communities', require('./routes/communities'));
app.use('/api/v1/stories', require('./routes/stories'));
app.use('/api/v1/upload', require('./routes/upload'));

app.use(errorHandler);

// share the post
app.get('/redirect', function(req, res) {
    var url = share(req.query.service, req.query);
    res.redirect(url);
});

const PORT = process.env.PORT || 403;

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));