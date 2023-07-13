const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    userName : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
    }
    ,
    password : {
        type : String,
        required : true
    }
})

const user = mongoose.model("users",userSchema)
module.exports= {user}