const express = require("express");
const FotoRouter = express.Router();
// const FotoRouter = require("express").Router(); -> Otra forma de escribir lo anterior.
const cloudinary = require("cloudinary");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");
const fs = require("fs"); //módulo que nos permite subir cosas
const path = require("path");

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
}); //Claves secretas que vienen del fichero .env

//Utilizar await implica sí o sí utilizar el asyn, pero poner el async no implica necesariamente usar await

FotoRouter.post("/upload", auth, authAdmin, (req, res)=>{
    try {
        console.log(req.files)
        if(!req.files || Object.keys(req.files).length === 0)
        return res.status(400).json({
            success: false,
            message: "No files were uploaded"
        });
        
        const file = req.files.file;
        if(file.size > 1024*1024){
            removeTmp(file.tempFilePath)
            return res.status(400).json({
                success: false,
                message: "Size too large"
            });
        }
        if(file.mimetype !== "image/jpeg" && file.mimetype !== "image/png" 
        && file.mimetype !== "image/svg" && file.mimetype !== "image/jpg"){
            removeTmp(file.tempFilePath)
            return res.status(400).json({
                success: false,
                message: "File format is incorrect"
            });
        }
        cloudinary.v2.uploader.upload
        (file.tempFilePath, {folder: "PinkBoutique"}, async (error, result) => {
            if (error) throw error;

            removeTmp(file.tempFilePath)
       
        return res.json({
            success: true,
            message: "Image uploaded successfully",
            public_id: result.public_id,
            url: result.secure_url
        });
    });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
});

FotoRouter.post("/destroy", auth, authAdmin, (req, res)=>{
    try {
        const {public_id} = req.body;
        if(!public_id) {
            return res.status(400).json({
                success: false,
                message: "No images selected"
            })
        }

        cloudinary.v2.uploader.destroy(public_id, async(error, result)=>{
            if(error) throw error;
            return res.status(200).json({
                success: true,
                message: "Image deleted successfully"
            })
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
})

const removeTmp = (path) => {
    fs.unlink(path, error =>{
        if (error) throw error
    })
}

module.exports = FotoRouter;