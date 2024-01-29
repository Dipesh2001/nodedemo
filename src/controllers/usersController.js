const Users = require('../models/users')
const Address = require('../models/address')
const { encryptPassword, comparePassword } = require("../utils/passwordUtils")
const mongoose = require("mongoose")
const upload = require('../config/multerConfig');
const { createTokenAccordingToRole } = require('../middlewares/authMiddleware');
const { handleUploadError } = require('../helpers/response');

const getUsers = async(req, res) => {
    try {

        const users = await Users.find();
        // res.status(200).json(users);
        res.status(200).json({
            success: true,
            message: 'Users List',
            data: users
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
            data: {}
        });
    }
}

const addUser = async(req, res) => {
    try {
        const hashedPassword = await encryptPassword(req.body.password);
        const newUser = new Users({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
        });

        if (req.file) {
            newUser.profileImage = req.file.path;
        } else {
            throw new Error("Error while uploading image!");
        }

        const savedUser = await newUser.save();

        res.status(201).json({
            success: true,
            message: 'User added successfully',
            data: savedUser,
        });

    } catch (error) {

        if (error.name === 'ValidationError') {
            const errors = {};
            for (let field in error.errors) {
                errors[field] = error.errors[field].message;
            }
            res.status(400).json({
                success: false,
                message: 'Validation Errors',
                data: {
                    errors: [errors]
                }
            });
            // res.status(400).json({ errors });
        } else {
            res.status(500).json({
                success: false,
                message: 'Server Error',
                data: {}
            });
            // res.status(500).json({ error: 'Server Error' });
        }
        handleUploadError(req, res, error);
    }
}

const deleteUser = async(req, res) => {
    try {
        const id = req.params.id;
        const ans = await Users.findByIdAndDelete({ _id: id });

        if (ans) {
            res.status(200).json({
                success: true,
                message: "User deleted successfully.",
                data: ans
            });
        } else {
            throw new Error("No user found!")
        }
    } catch (error) {
        res.status(402).json({
            success: false,
            message: error.message,
            data: {}
        });
    }
}

const updateUser = async(req, res) => {
    try {
        const id = req.params.id;
        const ans = await Users.findByIdAndUpdate(id, req.body, { new: true });

        console.log("ans", ans)
        if (ans) {
            res.status(200).json({
                success: true,
                message: "User updated successfully.",
                data: ans
            });
        } else {
            throw new Error("No user found!")
        }
    } catch (error) {
        res.status(402).json({
            success: false,
            message: error.message,
            data: {}
        });
        console.log(error)
            // res.status(500).json({ error: error.message });
    }
}


const loginUser = async(req, res) => {
    try {
        const user = await Users.findOne({
            email: req.body.email
        });

        if (!user) {
            throw new Error("No user found!")
        }

        const match = await comparePassword(req.body.password, user.password);

        if (!match) {
            throw new Error("Invalid email or password!");
        }

        res.status(200).json({
            success: true,
            message: 'Users List',
            data: {
                user,
                authToken: createTokenAccordingToRole(user),
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
            data: {}
        });
    }
}

const addAddress = async(req, res) => {
    try {
        const newAddress = new Address({
            street: "Purushottam nagar",
            city: "Ahmedabad",
            state: "Gujrat",
            postalCode: "382350",
            country: "India",
        });

        const savedAddress = await newAddress.save();

        const addItToUser = await Users.findByIdAndUpdate({ _id: req.params.id }, { $push: { addresses: savedAddress._id } })

        res.status(201).json({
            success: true,
            message: 'Address added successfully',
            data: savedAddress,
        });

    } catch (error) {
        if (error.name === 'ValidationError') {
            const errors = {};
            for (let field in error.errors) {
                errors[field] = error.errors[field].message;
            }
            res.status(400).json({
                success: false,
                message: 'Validation Errors',
                data: {
                    errors: [errors]
                }
            });
        } else {
            res.status(500).json({
                success: false,
                message: 'Server Error',
                data: {}
            });
        }
    }
}



module.exports = { getUsers, addUser, deleteUser, updateUser, loginUser, addAddress };