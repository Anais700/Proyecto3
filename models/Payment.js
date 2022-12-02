const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
    // user_id: {
    //     type: mongoose.Types.ObjectId,
    //     ref: "User"
    // },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    paymentID:{
        type: String,
        required: true
    }, //esto viene del Paypal
    address: {
        type: Object
    },
    cart: {
        type: Array,
        default: []
    },
}, {timestamps: true});
// No la podremos comprobar muy pronto, sino hasta que por el Front podamos tener la clave de Paypal.
module.exports = mongoose.model("Payment", paymentSchema)