const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types

const gelismelerSchema = new mongoose.Schema({
  
    YIL: {
        type:Number,
        required: true
    },
    TARIH: {
        type:String,
        required: true  
    },
    GELISMELER: {
        type:String,
        required: true
    },
    BELGEKODU: {
        type:String,
        // required: true  
    },
    YETKIBELGESI: {
        type:String,
        // required: true
    },

    KARARMETNI: {
        type:String,
        // required: true
    },
    GGDRAPORU: {
        type:String,
        // required: true
    },
    images: {
        type: Array,
        default: []
    }
})

mongoose.model("Gelismeler", gelismelerSchema)