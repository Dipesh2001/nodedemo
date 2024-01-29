const multer = require('multer');
const fs = require('fs');
const { errorResponse, handleUploadError } = require('../helpers/response');
// Set up Multer storage configuration
const storage = (route) => multer.diskStorage({
    destination: function(req, file, cb) {
        const dynamicDestination = `uploads/${route}`;
        if (!fs.existsSync(dynamicDestination)) {
            fs.mkdirSync(dynamicDestination);
        }
        cb(null, dynamicDestination);
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    },
});

// Define file filter to accept only certain file types
const fileFilter = (types) => (req, file, cb) => {
    // Example: accept only image files

    if (types.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb('Only image files are allowed', false);
    }
};
// Create the Multer instance
const upload = (route, types) => multer({ storage: storage(route), fileFilter: fileFilter(types) });



module.exports = upload;
// exports.imageTypes = ;