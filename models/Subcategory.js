const mongoose = require("mongoose");
const subcategorySchema = new mongoose.Schema({
    title:{
        type: String,
        maxlength: 50,
        minlength: 3,
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
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    }],
    image: {
        type: Object
    }
}, {timestamps: true});

module.exports = mongoose.model("Subcategory", subcategorySchema);