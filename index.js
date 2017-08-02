const express = require('express');
const parser = require('body-parser').urlencoded({ extended: false });
const upload = require('./uploadConfig');

const multerParser = upload.single('avatar');
const fileArrayParser = upload.array('hinhsanpham');

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

app.post('/sanpham', fileArrayParser, (req, res) => {
    console.log(req.body, req.files);
    res.send('Da nhan');
});

app.post('/xuly', parser, (req, res) => {
    console.log(req.body);
    res.status(200).send('Da nhan');
});

app.use((err, req, res, next) => {
    console.log(err);
    res.send('CO LOI');
});

app.listen(3000, () => console.log('Server started!'));

// 200
// 201 
// 404 

class MyError extends Error {
    constructor(message, code) {
        super(message);
        this.code = code;
    }
}
