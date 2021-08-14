//özgün
/* var sqlite3 = require('sqlite3')
var db = new sqlite3.Database('imalat.db') */

const express = require ('express')
const router = express.Router()
const mongoose = require ('mongoose')
const requireLogin = require ('../middleware/requireLogin')
const Air = mongoose.model("Air")
const User = mongoose.model("User")
const multer = require("multer")
const path = require("path")
const fs = require("fs")


// STORAGE MULTER CONFIG
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images/");
        // cb(null, __dirname +"/uploads");
    },
    filename: (req, file, cb) => {
      //  cb(null, `${Date.now()}_${file.originalname}`);
      cb(null, file.originalname.toLowerCase());
    },
    fileFilter: (req, file, cb) => {
    
        const ext = path.extname(file.originalname)
        
        if (ext !== '.jpg' && ext !== '.png') {
            return cb(res.status(400).end('only jpg, png is allowed'), false);
        }
        cb(null, true)
    }
});

const upload = multer({ storage: storage })

router.post("/uploads", upload.single('upload'), (req, res) => {
    
    let TempFile = req.file.filename
    let targetPathUrl = "192.168.5.234:3000/server/images/"+TempFile
    
    fs.rename(TempFile, targetPathUrl, err =>{
        res.status(200).json({
            uploaded: true,
            url:`${TempFile}`
          });
    })
   

     console.log(req.file.path);
     console.log(TempFile);
     console.log("localhost:3000/server/images/"+TempFile)
    


/*     if(req.file.path.extname(TempFile.originalFilename).toLowerCase() === ".png"||".jpg"){
        fs.rename(TempPathFile, targetPathUrl, err=>{
            if(err) return console.log(err)
        })
    } */
   
  });



router.get('/allair',requireLogin, (req, res)=>{
    Air.find()
    .populate("postedBy", "_id name")
    .then(airs=>{
        res.json({airs})
    })
    .catch(err =>{
        console.log(err)
    })
})

//özgün
/* router.get('/allair', (req, res)=>{
    db.all(`SELECT * FROM imalat`, function(err,rows){
        console.log(rows)
        res.send(rows)
    })
}) */

router.post("/uploadfiles",upload.single('upload'), (req, res) => {
   
    upload(req, res, err => {
         console.log(err)
        if (err) {
            return res.json({ success: false, err });
        }
        return res.json({ success: true, url: res.req.file.path, fileName: res.req.file.filename });
    });
});


router.post('/createair',requireLogin, (req, res)=>{
    const 
        {title, 
        body, 
        airCode, 
        category,
        dateofMade,
        relevant,
        projectGroup,
        expRespDate,
        documentArea,
        rationale
        } 
        = req.body

    if(!title || !body) {
        return res.status(422).json({error:"please add all the fields"})
    }
    const air = new Air ( {
        title,
        body,
        postedBy:req.user,
        airCode,
        category,
        dateofMade,
        relevant,
        projectGroup,
        expRespDate,
        documentArea,
        rationale,
        isTaslak:true
        // response,
        // dateofResp,
        // response1,
        // summary,
        // appendices,
        // dateRespReceived,
        // review1,
        // dateRevMade1,
        // expRevDate1,
        // revised1,
        // dateofResp2,
        // response2,
        // summary2,
        // appendices2,
        // dateRespReceived2,
        // review2,
        // dateofDecision,
        // decision
    })
    air.save().then(result=>{
        res.json({air:result})
    })
    .catch(err=>{
        console.log(err)
    })
})

router.get('/myair',requireLogin, (req, res)=>{
    Air.find({postedBy:req.user._id})
    .populate("postedBy", "_id name")
    .then(myair=>{
        res.json({myair})
    })
    .catch(err=>{
        console.log(err)
    })
})
//deneme airdetail
router.get('/airs/:airCode',requireLogin, (req, res)=>{
    
    Air.findOne({_id:req.params.airCode})
    .populate("postedBy", "_id name")
    .then(air=>{
         console.log(air)
        res.json({air})
    })
    .catch(err=>{
        console.log(err)
    })
})


//update air

router.put("/airs/:airCode",requireLogin, async (req, res) => {
    try {
      const air = await  Air.findOne({_id:req.params.airCode})
      .populate("postedBy", "_id name")
      .exec((err,air)=>{
        if(err || !air){
            return res.status(422).json({error:err})
        }
        if(air.postedBy._id.toString() === req.user._id.toString()){
            try {
                air.title = req.body.title;
                air.body = req.body.body;
                air.postedBy=req.user;
                air.airCode= req.body.airCode;
                air.category = req.body.category;
                air.dateofMade = req.body.dateofMade;
                air.relevant = req.body.relevant
                air.projectGroup = req.body.projectGroup
                air.expRespDate = req.body.expRespDate
                air.documentArea = req.body.documentArea
                air.rationale = req.body.rationale

                air.save().then(air => {
                res.json('AIR güncellendi!');
                      })
               
              } catch (err) {
                res.status(500).json(err);
              }
        }
        else {
            res.send("başkasının airi");
            console.log("başkasının airi")
        }
    })
      
    } catch (err) {
      res.status(500).json(err);
      console.log("hata burada")
    }
  });



router.delete('/airs/:airCode',requireLogin,async (req,res)=>{
    try {
        const air = await Air.findOne({_id:req.params.airCode})
        .populate("postedBy","_id")
        .exec((err,air)=>{
            if(err || !air){
                return res.status(422).json({error:err})
            }
            if(air.postedBy._id.toString() === req.user._id.toString()){
                  air.remove()
                  .then(result=>{
                      res.json(result)
                  }).catch(err=>{
                      console.log(err)
                  })
            }
            else {
                res.send("başkasının airi");
                console.log("başkasının airi")
            }
        })
    }
 catch (err) {
    res.status(500).json(err);
  }
  
})


module.exports = router 