const express = require ('express')
const router = express.Router()
const mongoose = require ('mongoose')
const requireLogin = require ('../middleware/requireLogin')
const Personel = mongoose.model("Personel")
const multer = require("multer");


router.get('/personel', (req, res)=>{
    Personel.find()
    .then(personels=>{
        res.json({personels})
    })
    .catch(err =>{
        console.log(err)
    })
})

router.post('/createpersonel', (req, res)=>{
    const {
        NO,
        ADI,
        SOYADI,
        DAİRE,
        UNVAN,
        MESLEK,
        BOLUM,
        KONU,
        EMAIL,
        KATILMA,
        AYRILMA
    } 
    = req.body
    if(!ADI || !SOYADI || !DAİRE) {
        return res.status(422).json({error:"Tüm alanları doldurun"})
    }
   
    const personel = new Personel ( {
        NO,
        ADI,
        SOYADI,
        DAİRE,
        UNVAN,
        MESLEK,
        BOLUM,
        KONU,
        EMAIL,
        KATILMA,
        AYRILMA
    })
    personel.save().then(result=>{
        res.json({personel:result})
    })
    .catch(err=>{
        console.log(err)
    })
})


module.exports = router 