const mongoose = require('mongoose');
const validator = require('validator');

const brandSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        maxlength:100,
        unique:true
    }
})

const brandModel = mongoose.model('Brand',brandSchema);

module.exports = brandModel