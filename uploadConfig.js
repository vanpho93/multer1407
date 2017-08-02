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

module.exports = upload;