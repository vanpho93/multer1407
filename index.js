const express = require('express');
const parser = require('body-parser').urlencoded({ extended: false });

const multer = require('multer');
const limits = {
    fileSize: 102400
}

const fileFilter = (req, file, cb) => {
    const { mimetype } = file;
    const isMimetypeCorrect = mimetype === 'image/png' || mimetype === 'image/jpeg';
    if (isMimetypeCorrect) return cb(null, true);
    cb(new Error('Khong dung dinh dang'));
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, './public/'),
    filename: (req, file, cb) => cb(null, Date.now() + 'a.png')
});

const upload = multer({ storage, limits, fileFilter });
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
