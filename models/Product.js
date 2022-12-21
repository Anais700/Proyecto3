const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
    title: {
        type: String,
        maxlength: 50,
        minlenght: 3,
        required: true
    },

    description:{
        type: String,
        maxlength: 450,
        minlenght: 10,
    },
    price:{
        type: Number,
        maxlength: 10,
        minlength: 1,
        required: true
    },
    // Category: {
    //     type: mongoose.Types.ObjectId,
    //     ref: "Category"
    // },
    // Collection: {
    //     type: mongoose.Types.ObjectId,
    //     ref: "Collection"
    // },
    Subcategory: {
        type: mongoose.Types.ObjectId,
        ref: "Subcategory"
    },
    sizes: {
        type: String
    },
    image:{
        type: Object,
    },
}, {timestamps: true});

module.exports = mongoose.model("Product", productSchema);
