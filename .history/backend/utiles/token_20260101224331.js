const jwt = require("jsonwebtoken")

const JWT_SECRET = process.env.JWT_SECRET

export const verifyToken=(token)=>{
    try{
        
    }
    catch(e){
        console.log(e)
        return null
    }
}