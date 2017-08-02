const express = require('express');
const parser = require('body-parser').urlencoded({ extended: false });
const upload = require('./uploadConfig');

const multerParser = upload.single('avatar');
const app = express();
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));

app.get('/', (req, res) => res.render('home'));
app.get('/signup', (req, res) => res.render('signup'));

app.post('/signup', multerParser, (req, res) => {
    console.log(req.body, req.file);
    res.send('Da nhan');
});

app.post('/xuly', parser, (req, res) => {
    console.log(req.body);
    res.send('Da nhan');
});

app.listen(3000, () => console.log('Server started!'));
