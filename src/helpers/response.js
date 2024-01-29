const fs = require('fs');

exports.errorResponse = (res, message, statusCode) => {
    return res.status(statusCode).json({ success: false, message: message, data: {} });
};

exports.successResponse = (res, message, statusCode) => {
    res.status(statusCode).json({ success: true, data: res, });
};

exports.handleUploadError = (req, res, err) => {
    // Delete the uploaded image
    if (req.file && req.file.path) {
        fs.unlink(req.file.path, (unlinkErr) => {
            if (unlinkErr) {
                console.error('Error deleting uploaded image:', unlinkErr);
            }
        });
    }
    return res.status(400).json({ success: false, data: {}, message: err });
    // Pass the error to the next middleware
};