const { user } = require('../models/user.model');
const {verifyEmailAndPassword , findUserByEmail,createUser , comparePassword} = require('../services/auth.service')
const { generateAuthToken} = require("../services/token.service")

const login = async ( req,res)=>{
    const{ email , password} = req.body;
    if( email && password)
    {
        try
        {
            const user = await findUserByEmail(email);
            if( user)
            {
                if( await comparePassword(password,user.password))
                {
                    const id = user._id;
                    const token = await generateAuthToken(id);
    
                    res.status(201).json({
                        email : email,
                        tokens :token
                    });
                }
                else
                {
                    res.status(203).json({"message":"Password didn't match"})
                }
            }
            else
            {
                res.status(404).json({"message":"user does not exist with this email"})
            }
        }
        catch(err)
        {
            console.log(err)
            res.status(404).json(err)
        }
    }
    else
    {
        res.status(203).json({"message":"Please enter email and password"})
    }
   
    
}

const signUp = async(req,res)=>
{
    try{
        const{userName, email , password} = req.body;
    if( userName && email && password )
    {
       
        if( ! await findUserByEmail(email))
        {
            
            const data = await createUser(userName,email,password);
            const id = data._id;
            const token = await generateAuthToken(id);

            res.status(201).json({
                email : email,
                tokens :token
            });
        }
        else
        {
            res.status(404).json({"message":"user already exist"})
        }
    }
    else
    {
        res.status(404).json({"message" : "Please enter valid username,email and password"})
    }
    }
    catch(err)
    {
       
        res.status(404).json(err);
    }
    
}
module.exports = {login, signUp}