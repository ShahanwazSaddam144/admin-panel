const jwt = require("jsonwebtoken")

const JWT_SECRET = process.env.JWT_SECRET

export const verifyToken=(token)=>{
    try{
        const decoded = jwt.verify(token,JWT_SECRET)
        return decoded
    }
    catch(e){
        console.log(e)
        return null
    }
}