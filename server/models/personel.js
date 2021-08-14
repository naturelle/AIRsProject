const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types

const personelSchema = new mongoose.Schema({
    NO: {
        type:Number,
    },
    ADI: {
        type:String,
        required: true
    },
    SOYADI: {
        type:String,
        required: true  
    },
    DAİRE: {
        type:String,
        required: true
    },
    UNVAN: {
        type:String,
        // required: true  
    },
    MESLEK: {
        type:String,
        // required: true
    },
    BOLUM: {
        type:String,
        // required: true
    },
    KONU: {
        type:String,
        // required: true
    },
    EMAIL: {
        type:String,
        // required: true
    },
    KATILMA: {
        type:String,
        // required: true
    },
    AYRILMA: {
        type:String,
        // required: true
    },

})

mongoose.model("Personel", personelSchema)