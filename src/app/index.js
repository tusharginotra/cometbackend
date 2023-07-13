
const loginRoutes = require("../../routes/login.routes")
const signupRoutes = require("../../routes/signup.routes")
const express = require("express");
const passport = require("passport");
const { jwtStrategy } = require("../../config/passport");
const config = require("../../config/config")
const mongoose = require("mongoose")


const app = express();

const PORT = 8082
const URI = config.uri
app.use(express.json())

passport.use("jwt",jwtStrategy);
app.use("/signup",signupRoutes)
app.use("/login",loginRoutes)



app.use((req, res, next) => {
   res.status(404).json({"message":"NOT FOUND"})
});
mongoose.connect(URI)
.then((err,data)=>{
    console.log("Database is connected on")
    app.listen(PORT,()=>{
        console.log(" Backend is Listening on port", PORT)
        
    }) ;
})
