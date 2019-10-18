const mongoose = require('mongoose');

const woodSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        maxlength:100,
        unique:true
    }
})

const woodModel = mongoose.model('Wood',woodSchema);

module.exports = woodModel