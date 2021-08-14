const express = require ('express')
const router = express.Router()
const mongoose = require ('mongoose')
const requireLogin = require ('../middleware/requireLogin')
const Gelismeler = mongoose.model("Gelismeler")
const multer = require("multer");
const uuid = require ("uuid").v4

// STORAGE MULTER CONFIG
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
        // cb(null, __dirname +"/uploads");
    },
    filename: (req, file, cb) => {
        cb(null, `${uuid()}-${Date.now()}_${file.originalname}`);
    }
    
});

const upload = multer({ storage: storage })


router.get('/gelismeler', (req, res)=>{
    Gelismeler.find()
    .then(gelismeler=>{
        res.json({gelismeler})
    })
    .catch(err =>{
        console.log(err)
    })
})

router.post("/uploadImage",upload.single("avatar"), (req, res) => {

/*     let fileType = req.file.mimetype.split('/')[1]
    res.send(200) */

     upload(req, res, err => {
        if (err) {
            return res.json({ success: false, err })
        }
        return res.json({ success: true, image: res.req.file.path, fileName: res.req.file.filename })
    })
 
});



router.post('/creategelisme', requireLogin, (req, res)=>{
   
    const {
        YIL,
        TARIH,
        GELISMELER,
        BELGEKODU ,
        YETKIBELGESI,
        KARARMETNI,
        GGDRAPORU
    } = req.body
   
    if(!YIL || !TARIH || !GELISMELER) {
        return res.status(422).json({error:"Tüm alanları doldurun"})
    }
   
    const gelisme = new Gelismeler ( {
        YIL,
        TARIH,
        GELISMELER,
        BELGEKODU,
        YETKIBELGESI,
        KARARMETNI,
        GGDRAPORU
    })
    gelisme.save().then(result=>{
        res.json({gelisme:result})
    })
    .catch(err=>{
        console.log(err)
    })
})


module.exports = router 