const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    nickname: {
        type: String,
    },
    password: {
        type: String,
        minlength: 8,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    role: {
        type: Number,
        default: 0
    },
    cart: {
        type: Array,
        default: [],
     },
    // role: {
    //     type: String,
    //     default: "user",
    //     enum: ["user", "userpro", "admin"]
    // }

}, {timestamps: true});

module.exports = mongoose.model("User", userSchema);
