const express = require("express");
const Product = require("../models/Product");
const ProductRouter = express.Router();
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin")

//CREAR UN PRODUCTO
ProductRouter.post("/product", auth, authAdmin, async (req, res)=>{
    const {title, description, price, subcategoryId, image} = req.body
    try {
        if(!title || !description || !price || !subcategoryId || !image) {
            return res.status(400).json({
                success: false,
                message: "Please fill all the fields", 
            });
        }
        if (title.length < 3 || title.length > 50) {
            return res.status(400).json({
                success: false,
                message: "Title must be between 3 and 50 characters",
            })
        }
        if (description.length < 10 || description.length > 450){
            return res.status(400).json({
                success: false,
                message: "Description must be between 10 and 450 characters",
            })
        }
        if (price.length < 2 || price.length > 10) {
            return res.status(400).json({
                success: false,
                message: "Price must be between 2 and 10 digits"
            })
        }

        let product = new Product({
            title,  
            description, 
            price,
            Subcategory: subcategoryId,
            image
        })
        await product.save()
        return res.status(200).json({
            success: true,
            product,
            message: "Product created successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});

//OBTENER TODOS LOS PRODUCTOS
ProductRouter.get("/products", async (req, res) => {
    try{
        let products = await Product.find({})
        return res.status(200).json({
            success: true,
            products
        }) 
    } catch (error){
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
});

//OBTENER UN PRODUCTO
ProductRouter.get("/product/:id", async (req, res)=>{
    const {id} = req.params;
    try {
        let product = await Product.findById(id).populate("Subcategory");
        return res.status(200).json({
            success: true,
            product,
            message: "Product found successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
});

//MODIFIAR UN PRODUCTO
ProductRouter.put("/product/:id", auth, authAdmin, async (req, res)=>{
    const {id} = req.params;
    const {title, description, price} = req.body
    try {
        await Product.findByIdAndUpdate(id, {title, description, price})
        return res.status(200).json({
            success: true,
            message: "Product updated successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
});

//BORRAR UN PRODUCTO
ProductRouter.delete("/product/:id",auth, authAdmin, async (req, res)=>{
    const {id} = req.params;
    try {
        await Product.findByIdAndDelete(id)
        return res.status(200).json({
            success: true,
            message: "Product deleted successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }

})

module.exports = ProductRouter;