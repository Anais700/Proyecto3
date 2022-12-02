const express = require("express");
const User = require("../models/User")
const UserRouter = express.Router();
const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync(10);
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin")


UserRouter.post("/user", async (req, res)=>{
    const {name, surname, nickname, password, email} = req.body
    try {
        const Usuario = await User.findOne({email})
        if (Usuario){
            return res.status(400).json({
                success: false,
                message: "This user... Este usuario ya está registrado, no puedes registrarte con el mismo correo"
            })
        }
        if(!name || !surname || !password || !email){
            return res.status(400).json({
                success: false,
                message: "Please fill all the fields",
            });
        }
        if(password.length < 8){
            return res.status(400).json({
                success: false,
                message: "Password must be at least 8 characters"
            })
        }
        const validateEmail =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const validatePassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}$/;
        // Hay 2 formas de validar si el email tiene el formato correcto:
        if(!validateEmail.test(email)){
            return res.status(400).json({
                success: false,
                message: "Este correo no es válido"
            })
        }
        // if(validateEmail.match(email)){
        //     return res.status(400).json({
        //         success: false,
        //         message: "Este correo no es válido"
        //     })
        // }

        if (!validatePassword.test(password)) {
            return res.status(400).json({
              success: false,
              message:
                "La contraseña debe tener al menos una mayúscula, una minúscula y un número",
            });
            }
        // if(role !== "userpro" || role !== "user"){
        //     return res.status(400).json({
        //         success: false,
        //         message: "El rol debe ser user o userpro"
        //     })
        // };

        let passwordHash = bcrypt.hashSync(password, salt);

        let user = new User({
            name,
            surname,
            nickname,
            password: passwordHash,
            email,
        })
        await user.save()
        const accessToken = createToken({id: user._id})
        return res.status(200).json({
            success: true,
            user,
            message: "User account created successfully",
            accessToken
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

UserRouter.get("/users", auth, authAdmin, async (req, res) =>{
    try{
        let users = await User.find({}).select("name email")
        if(!users){
            return res.status(400).json({
                success: false,
                message: "No hay usuarios en la base de datos"
            })
        }
        return res.status(200).json({
            success: true,
            users,
        })
    } catch (error){
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}); // -ruta privada de Admin para ver los usuarios que tiene en la BD

UserRouter.get("/user", auth, async (req, res)=>{
    try {
        let user = await User.findById(req.user.id);
        if(!user)
            return res.status(400).json({
                success: false,
                message: "User not found"
            })
        return res.status(200).json({
            success: true,
            user,
            message: "User found successfully"
        });
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}); // ruta privada para el mismo usuario, para ver su propio perfil.

// ruta para que un usuario pueda ver otros usuarios (eso sería por ejemplo para una red social)
// con .select puedo indicar qué datos podrá ver: en este caso sólo el "name"
// UserRouter.get("/user: id", auth, async (req, res)=>{
//     try {
//         const {id} = req.params
//         let user = await User.findById(id).select("name");
//         if(!user)
//             return res.status(400).json({
//                 success: false,
//                 message: "User not found"
//             })
//         return res.status(200).json({
//             success: true,
//             user,
//             message: "User found successfully"
//         });
        
//     } catch (error) {
//         return res.status(500).json({
//             success: false,
//             message: error.message
//         })
//     }
// }); // ruta privada, donde yo como usuario logueado puedo ver el perfil de otros usuarios, solo con su nombre.

UserRouter.put("/user/:id", auth, authAdmin, async (req, res)=>{
    const {id} = req.params;
    const {name, surname, role} = req.body;
    try {
        let user = await User.findById(id).select("name surname role")
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found"
            })
        }
        if (role > 1){
            return res.status(400).json({
                success: false,
                message: "Rol not allowed"
            })
        }
        await User.findByIdAndUpdate(id, {name, surname, role})
        return res.status(200).json({
            success: true,
            message: "User updated successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
})

UserRouter.put("/user", auth, async (req, res)=>{
    const {nickname, password} = req.body;
    try {
        let user = await User.findById(req.user.id).select("nickname password")
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found"
            })
        }
        await User.findByIdAndUpdate(req.user.id, {nickname, password})
        return res.status(200).json({
            success: true,
            message: "User updated successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
})

UserRouter.delete("/user/:id", auth, authAdmin, async (req, res)=>{
    const {id} = req.params;
    try {
        let user = await User.findById(id)
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found"
            })
        }
        await User.findByIdAndDelete(id)
        return res.status(200).json({
            success: true,
            message: "User deleted successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
})

UserRouter.post("/login", async (req, res)=>{
    const {email, password} = req.body
    try {
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                success: false,
                message: "Alguno de tus datos es incorrecto (correo)"
            })
        }

        const passwordOk = bcrypt.compareSync(password, user.password);
        if(!passwordOk){
            return res.status(400).json({
                success: false,
                message: "Alguno de tus datos son incorrectos (password)"
            })
        }

        const accessToken = createToken({ id: user._id})
        
        return res.status(200).json({
            success: true,
            message: "Usuario identificado con éxito",
            accessToken,
        }) 
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }

});

// Para añadir productos al carrito:
// UserRouter.patch() // se puede hacer con PATCH
UserRouter.post("/cart", auth, async (req, res)=>{
    try {
        let user = await User.findById(req.user.id);
        if(!user)
            return res.status(400).json({
                success: false,
                message: "User not found"
            });
    //Hay 3 formas de escribirlo:
        await User.findByIdAndUpdate(req.user.id, {cart: req.body.cart})
        // await User.findOneAndUpdate({_id: req.user.id}, {cart: req.body.cart});
//        await User.findOneAndUpdate({_id: user}, {cart: req.body.cart})
//        await User.findByIdAndUpdate(user, {cart: req.user.id})
        return res.status(200).json({
            success: true,
            message: "Product added to cart successfully"
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
});

// función para generar token de autentificación de usuario
const createToken = (user) =>{
    return jwt.sign(user, process.env.ACCES_TOKEN_SECRET, {expiresIn: '7d'});
}

module.exports = UserRouter;


