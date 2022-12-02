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

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNzRkNDcyZDk1OTU4YzdmMTVkNzY3YiIsImlhdCI6MTY2ODYwMjA4MSwiZXhwIjoxNjY5MjA2ODgxfQ.nIV0VIdvgj0jWYVaC6yilCel7nOnEUH6BY7MOHj2gFs
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNmUyODg5ZWNlYjBiYjBkZmJlNDYyMiIsImlhdCI6MTY2ODU5NTkxNywiZXhwIjoxNjY5MjAwNzE3fQ.xuDXvp3cNjabl7fyRSk7Yh_ODxSdior9itQJxuffRrM
// Ana R
// Register: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNzRmNmRiZGM3ODgxNjhmYWMyZWQxNCIsImlhdCI6MTY2ODYwOTc1NSwiZXhwIjoxNjY5MjE0NTU1fQ.yN_lH2JOOEaXXPmSCUGHFfDF3Dh0AjVJ0rCpF5XKjoc
// Login: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNzRmNmRiZGM3ODgxNjhmYWMyZWQxNCIsImlhdCI6MTY2ODYwOTc5MywiZXhwIjoxNjY5MjE0NTkzfQ.vufOt5qcyB4B1RYuOytEmg417OBmyR4XPs8x4zeZNNQ