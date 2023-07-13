require('dotenv').config( '../.env')
module.exports = {
    jwt : {
        secret : process.env.secret,
    },
    tokenTypes : 
    {
        ACCESS : process.env.ACCESS
    },
    uri : process.env.MONGO_URI
}