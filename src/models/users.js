const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: [3, "Name should be grater than 3 letters"]
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [{
                validator: function(v) {
                    return /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(v); // validate email format
                },
                message: 'Invalid email format',
            },
            {
                validator: async function(v) {
                    const user = await this.constructor.findOne({ email: v });
                    return !user; // check if email is already used by another user
                },
                message: `Email already exists!`
            }
        ],
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
    },
    profileImage: {
        type: String,
        required: true,
    },
    addresses: {
        type: Array,
    },
    role: {
        type: String,
        default: "User",
    }
}, { timestamps: true });



module.exports = mongoose.model('Users', userSchema);