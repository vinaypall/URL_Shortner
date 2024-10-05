const mongoose = require("mongoose");

//Schema
const urlShtortner = new mongoose.Schema({
    shortID:{
        type:String,
        required:true,
        unique:true,
    },
    redirectURL:{
        type:String,
        required:true
    },
    visitHistory:[{timestamp:{type:Number}}],
},
{timestamps:true}
)

const URL = mongoose.model("url",urlShtortner);

module.exports= URL;