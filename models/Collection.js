const mongoose = require("mongoose");
const collectionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        maxlength: 450,
        minlength: 8
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    }
}, {timestamps: true});

module.exports = mongoose.model("Collection", collectionSchema);