const express = require("express");
const Category = require("../models/Category");
const CategoryRouter = express.Router();
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");

CategoryRouter.post("/category", auth, authAdmin, async (req, res)=>{
    const {title} = req.body
    try {
        if(!title){
            return res.status(400).json({
                success: false,
                message: "Please fill all the fields"
            })
        }
        if(title.length < 3 || title.length > 50){
            return res.status(400).json({
                success: false,
                message: "Title must be between 3 and 50 characters"
            })
        }
        let category = new Category({
            title,
        })
        await category.save()
        return res.status(200).json({
            success: true,
            category,
            message: "Category created successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
});

CategoryRouter.get("/categories", async (req, res)=>{
    try{
        let categories = await Category.find({}).populate({path:"Subcategory", select:"title image"});
        return res.status(200).json({
            success: true,
            categories
        })
    } catch (error){
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
})

CategoryRouter.get("/category/:id", async (req, res)=>{
    const {id} = req.params;
    try{
        let category = await Category.findById(id).populate({path:"Subcategory", select:"title image"});
        return res.status(200).json({
            success: true,
            category,
            message: "Category found successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
})

CategoryRouter.put("/category/:id", auth, authAdmin, async (req, res)=>{
    const {id} = req.params
    const {title, Subcategory} = req.body
    try {
        await Category.findByIdAndUpdate(id, {title, Subcategory})
        return res.status(200).json({
            success: true,
            message: "Category updated successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
})

CategoryRouter.delete("/category/:id", auth, authAdmin, async (req, res)=>{
    const {id} = req.params
    try {
        await Category.findByIdAndDelete(id)
        return res.status(200).json({
            success: true,
            message: "Category deleted successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
})


module.exports = CategoryRouter;