const multer = require("multer");
const path = require("path");
// const fs = require("fs");

// Set storage engine
const storage = multer.diskStorage({
    destination: "public/images",
    filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
    }
});

const uploadSingle = multer({
    storage: storage,
    limits: { fileSize: 1500000 },
    fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
    }
}).single("image");

const uploadMultiple = multer({
    storage: storage,
    limits: { fileSize: 6000000 },
    fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
    }
}).array("image");

// Check file Type
function checkFileType(file, cb) {

    const fileTypes = /jpeg|jpg|png|gif/;
    const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = fileTypes.test(file.mimetype);

    if (mimeType && extName) {
        return cb(null, true);
    } else {
        cb("Error: Images Only !!!");
    }
}

module.exports = { uploadMultiple, uploadSingle };