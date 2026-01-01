const verifyToken = require('../utiles/token')

export const verifyToken=(token,secret)=>{
    try{
        const decoded = jwt.verify(token,secret)
        return decoded
    }
    catch(e){
        console.log(e)
        return null
    }
}