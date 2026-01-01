const jwt = require('jsonwebtoken')

 const verifyToken=(token,secret)=>{
    try{
        const decoded = jwt.verify(token,secret)
        return decoded
    }
    catch(e){
        console.log(e)
        return null
    }
}