const users = require('../users.json')["users"];
const passport = require('passport');
const {user : usermodel} = require("../models/user.model")
const bcrypt = require("bcryptjs")
const verifyEmailAndPassword = (email,password)=>{

    for( let i=0;i<users.length;i++)
    {
        if( users[i]["email"] == email && users[i]["password"]===password )
        {
            return users[i]["id"];
        }
    }
    return null;
}

const findUserById = async(id)=>{
   try{
    const user = await usermodel.findById(id)
    return user;
   }
   catch(err)
   {
        throw err;
   }
}
const findUserByEmail = async function (email){
    try{
            
        const user = await usermodel.findOne({"email" : email});
        
        if( user)
        {
            return user;
            // throw { "message" : "email already exist"};
        }
        else
            return false;
    }
    catch(err)
    {
        throw err
    }
}
const createUser = async(userName,email,password)=>{
    try{
        const salt = await bcrypt.genSalt();
        const hashedPass = await bcrypt.hash(password,salt)
        const data = await usermodel.create({userName : userName,email:email,password : hashedPass});
        
        return data;
    }
    catch(err)
    {
        throw err
    }
}
const comparePassword = async(pass1,pass2)=>{
    try
    {
        return bcrypt.compare(pass1,pass2);
    }
    catch(err)
    {
        throw err;
    }
}

module.exports = {verifyEmailAndPassword,findUserById, findUserByEmail,createUser , comparePassword}