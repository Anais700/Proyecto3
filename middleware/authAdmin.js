const User = require("../models/User");

const authAdmin = async (req, res, next) => {
    try {
        const user = await User.findOne({
            _id: req.user.id 
        })
        if(user.role === 0 || user.role === 1){
            return res.status(400).json({
                success: false,
                message: "Acceso denegado, no eres administrador"
            })
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

module.exports = authAdmin;