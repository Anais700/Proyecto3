const express = require("express");
const Category = require("../models/Category")
const Collection = require("../models/Collection");
const CollectionRouter = express.Router();
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");

CollectionRouter.post("/collection/:id", auth, authAdmin, async (req, res) =>{
    const {id} = req.params
    const {title, description} = req.body
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
        let collection = new Collection({
            title,
            description,
            category: id,
        })
        await collection.save()
        await Category.findByIdAndUpdate(id, {
            $push: {
                Collections: collection._id 
            }
        })
        return res.status(200).json({
            success: true,
            collection,
            message: "Collection created successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
});

// CollectionRouter.post("/collection/:id", auth, authAdmin, async (req, res) =>{
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
//         let collection = new Collection({
//             title,
//             description,
//             category: id,
//         })
//         await collection.save()
//         await Category.findByIdAndUpdate(id, {
//             $push: {
//                 Collection: collection._id 
//             }
//         })
//         return res.status(200).json({
//             success: true,
//             collection,
//             message: "Collection created successfully"
//         })
//     } catch (error) {
//         return res.status(500).json({
//             success: false,
//             message: error.message
//         })
//     }
// });

// CollectionRouter.post("/collection", auth, authAdmin, async (req, res) =>{
//     const {title, description} = req.body
//     try{
//         if(!title || !description) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Please fill all the fields"
//             });
//         }
//         let collection = new Collection({
//             title,
//             description
//         })
//         await collection.save()
//         return res.status(200).json({
//             success: true,
//             collection,
//             message: "Collection created successfully"
//         })
//     } catch (error) {
//         return res.status(500).json({
//             success: false,
//             message: "Internal server error"
//         })
//     }
// });

CollectionRouter.get("/collections", async (req, res) => {
    try {
        let collections = await Collection.find({})
        return res.status(200).json({
            success: true,
            collections
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
        
    }
})

CollectionRouter.get("/collection/:id", async (req, res)=>{
    const {id} = req.params;
    try{
        let collection = await Collection.findById(id);
        return res.status(200).json({
            success: true,
            collection,
            message: "Collection found successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
})

CollectionRouter.put("/collection/:id", auth, authAdmin, async (req, res)=>{
    const {id} = req.params
    const {title, description} = req.body
    try {
        await Collection.findByIdAndUpdate(id, {title, description})
        return res.status(200).json({
            success: true,
            message: "Collection updated successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
})

CollectionRouter.delete("/collection/:id", auth, authAdmin, async (req, res)=>{
    const {id} = req.params
    try {
        await Collection.findByIdAndDelete(id)
        return res.status(200).json({
            success: true,
            message: "Collection deleted successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
})

module.exports = CollectionRouter;