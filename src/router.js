const express = require('express');
const router = express.Router();
const authMiddleware = require("./middlewares/authMiddleware");


// const indexRoutes = require('./routes/index');
const userRoutes = require('./routes/users');
// const postRoutes = require('./routes/posts');

// Define routes

router.use('/users', userRoutes);
// router.use('/getCountryList', async(req, res) => {
//     try {
//         const nationsList = await getData();
//         // res.status(200).json(users);
//         res.status(200).json({
//             success: true,
//             message: 'Country List',
//             data: nationsList
//         });
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: error.message,
//             data: {}
//         });
//     }
// });


// router.use("/", (req, res) => {
//     res.status(200).send("Node js")
// })

module.exports = router;