const express = require("express");
const Category = require("../models/Category")
const Subcategory = require("../models/Subcategory");
const SubcategoryRouter = express.Router();
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");

SubcategoryRouter.post("/subcategory/:id", auth, authAdmin, async (req, res) =>{
    const {id} = req.params
    const {title, description, image} = req.body
  try{
    let category = await Category.findById(id)

    console.log(category)

        if(!category) {
            return res.status(400).json({
                success: false,
                message: "Category not found"
            });
        }
        if(!title || !description) {
            return res.status(400).json({
                success: false,
                message: "Please fill all the fields"
            });
        }
        let subcategory = new Subcategory({
            title,
            description,
            category: id,
            image
        })
        await subcategory.save()
        await Category.findByIdAndUpdate(id, {
            $push: {
                Subcategory: subcategory._id 
            }
        })
        return res.status(200).json({
            success: true,
            subcategory,
            message: "Subcategory created successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
});

// SeasonRouter.post("/season/:id", auth, authAdmin, async (req, res) =>{
//     const {id} = req.params
//     const {title, description} = req.body
//   try{
//     let category = await Category.findById(id)
//         if(!category) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Category not found"
//             });
//         }
//         if(!title || !description) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Please fill all the fields"
//             });
//         }
//         if(title.length < 3 || title.length > 50){
//             return res.status(400).json({
//                 success: false,
//                 message: "Title must be between 3 and 50 characteres"
//             })
//         }
//         let season = new Season({
//             title,
//             description,
//             category: id,
//         })
//         await season.save()
//         await Category.findByIdAndUpdate(id, {
//             $push: {
//                 Season: season._id 
//             }
//         })
//         return res.status(200).json({
//             success: true,
//             season,
//             message: "Season created successfully"
//         })
//     } catch (error) {
//         return res.status(500).json({
//             success: false,
//             message: error.message
//         })
//     }
// });

SubcategoryRouter.get("/subcategories", async (req, res)=>{

    try{
        let subcategories = await Subcategory.find({})
        return res.status(200).json({
            success: true,
            subcategories
        })
    } catch (error){
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
})

SubcategoryRouter.get("/subcategories/:id", async (req, res)=>{
    const {id} = req.params

    try{
        let category = await Category.findById(id)
        console.log(category)
        let subcategories = await Subcategory.find({})
        return res.status(200).json({
            success: true,
            subcategories
        })
    } catch (error){
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
})

SubcategoryRouter.get("/subcategory/:id", async (req, res)=>{
    const {id} = req.params;
    try{
        let subcategory = await Subcategory.findById(id).populate({path:"products", select:"title image price"}).populate("category")
        return res.status(200).json({
            success: true,
            subcategory,
            message: "Subcategory found successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
})

SubcategoryRouter.put("/subcategory/:id", auth, authAdmin, async (req, res)=>{
    const {id} = req.params
    const {title, description, category} = req.body
    try {
        await Subcategory.findByIdAndUpdate(id, {title, description, category})
        return res.status(200).json({
            success: true,
            message: "Subcategory updated successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
})

SubcategoryRouter.delete("/subcategory/:id", auth, authAdmin, async (req, res)=>{
    const {id} = req.params
    try {
        await Subcategory.findByIdAndDelete(id)
        return res.status(200).json({
            success: true,
            message: "Subcategory deleted successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
})

module.exports = SubcategoryRouter;
