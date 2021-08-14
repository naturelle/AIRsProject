const jwt = require ('jsonwebtoken')
const { JWT_SECRET } = require('../keys')
const mongoose = require ('mongoose')
const User = mongoose.model("User")

module.exports = (req, res, next) =>{
    const {authorization} = req.headers 
    //authorization === Bearer yhyk
    if (!authorization) {
        console.log(req)
        return res.status(401).json({error:req.headers })
    //    return res.status(401).json({error:"auth yokk"})
    }
    const token = authorization.replace( "Bearer ", "")
    jwt.verify(token, JWT_SECRET, (err, payload) => {
        if (err) {
            return res.status(401).json({error: "Giriş yapmalısınız"})
        }

        const {_id} = payload
        User.findById(_id).then(userdata=>{
            req.user = userdata
            //  console.log(userdata)
            next()
        })
       
    })
}