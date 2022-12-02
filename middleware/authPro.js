const User = require("../models/User");

const authPro = async (req, res, next) => {
    try {
        const user = await User.findOne({
            _id: req.user.id 
        })
        if(user.role === 0 || user.role === 2){
            return res.status(400).json({
                success: false,
                message: "Acceso denegado, no eres usuario Pro"
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

module.exports = authPro;