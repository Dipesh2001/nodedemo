const bcrypt = require('bcrypt');

// module.exports.encryptPassword = (password, callback) => {
//     bcrypt.genSalt(10, (err, salt) => {
//         bcrypt.hash(password, salt, (err, hash) => {
//             return callback(err, hash);
//         });
//     });
// };

module.exports.encryptPassword = (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(10, (err, salt) => {
            if (err) return reject(err);
            bcrypt.hash(password, salt, (err, hash) => {
                if (err) return reject(err);
                resolve(hash);
            });
        });
    });
};

// module.exports.comparePassword = (password, hash, callback) => {
//     bcrypt.compare(password, hash, (err, isMatch) => {
//         if (err) return callback(err);
//         callback(null, isMatch);
//     });
// };

module.exports.comparePassword = (password, hash) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, hash, (err, isMatch) => {
            if (err) {
                reject(err);
            } else {
                resolve(isMatch);
            }
        });
    });
};