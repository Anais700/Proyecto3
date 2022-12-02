const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
 try {
    const token = req.header("Authorization")
    if(!token) return res.status(400).json({
        success: false,
        message: "Invalid Authentication (falta de token)"
    })
    jwt.verify(token, process.env.ACCES_TOKEN_SECRET, (error, user)=>{
        if (error)
            return res.status(400).json({
                success: false,
                message: "Invalid Authentication (token invalido)",
            });

        req.user = user;
        next();
})
 } catch (error) {
    return res.status(500).json({
        success: false,
        message: error.message
    });
 }   
}
module.exports = auth;