const multer = require('multer');
const path = require('path');
const shortid = require('shortid');

//multer config
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(path.dirname(__dirname), 'uploads'));
    },
    filename: function (req, file, cb) {
        cb(null, shortid.generate() + "-" + file.originalname);
    }
});

exports.upload = multer({ storage });