const express = require('express');
const router = express.Router();
const upload = require('../config/multerConfig');
const multer = require("multer")

const { authMiddleware, checkUserAccess } = require("../middlewares/authMiddleware");

const { getUsers, addUser, deleteUser, updateUser, loginUser, addAddress } = require('../controllers/usersController');
const { handleUploadError } = require('../helpers/response');

router.route('/login').post(loginUser);
router.route('/').get(authMiddleware, checkUserAccess, getUsers);

// router.route('/:id').delete(deleteUser);

router.route('/:id').put(updateUser);
// router.route('/add').post(upload("profile_images", ['image/jpg', 'image/jpeg']).single('profileImage'), addUser);


router.route('/add').post(
    (req, res, next) => {
        upload("profile_images", ['image/jpg', 'image/jpeg', 'image/png']).single('profileImage')(req, res, function(err) {
            if (err instanceof multer.MulterError) {
                return handleUploadError(req, res, err);
            }
            next();
        });
    },
    addUser
);

router.route('/addAddress/:id').post(authMiddleware, addAddress);

module.exports = router;