// IMPORT DEPENDENCIES
const express = require("express")
const app = express()
require("dotenv").config();
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload")
const cors = require("cors")

app.use(express.json({extended: true}));
app.use(express.urlencoded());
app.use(fileUpload({
      useTempFiles: true,
    }));
app.use(cors());

// IMPORT ROUTES
const ProductRouter = require("./routes/ProductRouter")
const UserRouter = require("./routes/UserRouter")
// const CollectionRouter = require("./routes/CollectionRouter")
const SubcategoryRouter = require("./routes/SubcategoryRouter")
const CategoryRouter = require("./routes/CategoryRouter")
const PaymentRouter = require("./routes/PaymentRouter")
const FotoRouter = require("./routes/FotoRouter")


//CONECT TO DB
const URL = process.env.MONGODB_URL
mongoose.connect(URL, {}).then(() =>{
    console.log("BBDD is now connected")
}).catch((error) => {console.log(error);
});

//ROUTES -Utilizacion de las rutas 
app.use("/api", ProductRouter)
app.use("/api", UserRouter)
// app.use("/api", CollectionRouter)
app.use("/api", SubcategoryRouter)
app.use("/api", CategoryRouter)
app.use("/api", PaymentRouter)
app.use("/api", FotoRouter)



app.listen(5000, ()=>{
    console.log("Server is running on port 5000")
})
