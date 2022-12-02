const express = require("express")
const Payment = require("../models/Payment")
const User = require("../models/User")
const Product = require("../models/Product")
const auth = require("../middleware/auth")
const PaymentRouter = express.Router()

PaymentRouter.get("/payments", auth, async (req, res)=>{
    try {
        const payments = await Payment.find()
        return res.status(200).json({
            success: true,
            payments
        })
    } catch (error) {
        return res.status(500).json({
            success: true,
            message: error.message
        })
    }
})

PaymentRouter.post("/payment", auth, async(req, res) =>{
    try {
        const user = await User.findById(req.user.id).select("name email")
        if(!user) 
        return res.status(400).json({
            success: false,
            message: "User not found"
        }) //Esta condición es como un extra de seguridad

        const {cart, paymentID, address} = req.body
        const {_id, name, email} = user //Estos datos vienen devueltos por el usuario (token)

        const newPayment = new Payment({
            user_id: _id,
            name, 
            email, 
            cart, 
            paymentID, 
            address
        })
        // cart.filter(product =>{
        //     return sold(product._id, product.quantity, product.sold)
        // })

        await newPayment.save()
        return res.status(200).json({
            success: true,
            message: "Payment made successfully",
        });
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
})

// const sold = async (id, quantity, sold) =>{
//     await Product.findOneAndUpdate({_id: id},
//         {sold: quantity + sold
//         })
// }

module.exports = PaymentRouter;