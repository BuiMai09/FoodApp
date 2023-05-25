const mongoose = require('mongoose')


const UserSchema = mongoose.Schema({
    firstName: { type: String },
    lastName: { type: String },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 50,
    },

    // isAdmin: {
    //     type: Boolean,
    //     default: false,
    //     required: false,
    // },
    image: { type: String },
});

module.exports = mongoose.model("User", UserSchema)