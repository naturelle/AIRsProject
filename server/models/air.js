const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types

const airSchema = new mongoose.Schema ({
    title: {
        type:String,
        required: false
    },
    body: {
        type:String,
        required: false
    },
    postedBy: {
        type:ObjectId,
        ref:"User"
    },
     airCode: {
        type:String,
        required: true
    },
    category: {
        type:String,
        required: false
    },
    dateofMade: {
        type:Date,
        required: false
    },
    relevant: {
        type:String,
        required: false
    },
    projectGroup: {
        type:String,
        required: false
    },
    expRespDate: {
        type:Date,
        required: false
    },
    documentArea: {
        type:String,
        required: false
    },
    rationale: {
        type:String,
        required: false
    },
    isTaslak: {
        type:Boolean,
        required: true
    },
    chapter: {
        type:String,
        required: false
    },
    no: {
        type:Number,
        required: false
    },
    status: {
        type:String,
        required: false
    },
    note: {
        type:String,
        required: false
    },
    // response: {
    //     type:String,
    //     required: true
    // },
    // dateofResp: {
    //     type:Date,
    //     required: true
    // },
    // response1: {
    //     type:String,
    //     required: true
    // },
    // summary: {
    //     type:String,
    //     required: true
    // },
    // appendices: {
    //     type:String,
    //     required: true
    // },
    // dateRespReceived: {
    //     type:Date,
    //     required: true
    // },
    // review1: {
    //     type:String,
    //     required: true
    // },
    // dateRevMade1: {
    //     type:Date,
    //     required: true
    // },
    // expRevDate1: {
    //     type:Date,
    //     required: true
    // },
    // revised1: {
    //     type:String,
    //     required: true
    // },
    // dateofResp2: {
    //     type:Date,
    //     required: true
    // },
    // response2: {
    //     type:String,
    //     required: true
    // },
    // summary2: {
    //     type:String,
    //     required: true
    // },
    // appendices2: {
    //     type:String,
    //     required: true
    // },
    // dateRespReceived2: {
    //     type:Date,
    //     required: false
    // },
    // review2: {
    //     type:String,
    //     required: false
    // },
    // dateofDecision: {
    //     type:Date,
    //     required: false
    // },
    // decision: {
    //     type:String,
    //     required: false
    // }
    
})
/* ,
{timestamps:true})     */  

mongoose.model("Air", airSchema)