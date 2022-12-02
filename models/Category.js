const mongoose = require("mongoose")
const categorySchema = new mongoose.Schema({
    title: {
        type: String,
        maxlength: 50,
        minlength: 3,
        required: true
    },
    Subcategory:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Season"
    }],
    // Collections:[{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Collection"
    // }]
}, {timestamps: true});

module.exports = mongoose.model("Category", categorySchema);