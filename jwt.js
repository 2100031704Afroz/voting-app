const jwt = require('jsonwebtoken')

const jwtAuthMiddleware = (req, res, next)=>{
    const authorization = req.headers.authorization;
    if(!authorization) return res.status(404).json({error:'token not found'})
 

    const token = req.headers.authorization.split(' ')[1];
    if(!token)   return res.status(401).json({error:"unauthorised"})

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded 
        next();
    } catch (error) {
        console.log(error)
        res.status(401).json({err:"Invalid token"})
        
    }
}
const generateToken=(userData) =>{
    return jwt.sign(userData, process.env.JWT_SECRET, {expiresIn:30000})
}

module.exports = {jwtAuthMiddleware, generateToken};