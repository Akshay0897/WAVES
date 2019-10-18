const mongoose = require('mongoose');
const validator = require('validator');
const Schema = mongoose.Schema;

const Product = mongoose.Schema({

    name:{
        type:String,
        unique:true,
        maxLength:100,

    },

    description:{
        type:String,
        maxLength:1000,
        require:true
    },

    price:{
        type:Number,
        required:true,
        maxLength:100     
    },

    brand:{
        type: Schema.Types.ObjectId,
        ref:'Brand'
    },

    shipping:{
        type:Boolean,
        required:true
    },

    available:{
        type:String,
        required:true,
    },

    frets:{
        type:Number,
        required:true
    },

    wood:{
        type: Schema.Types.ObjectId,
        ref:'Wood',
        required:true
    },

    sold:{
        type:Number,
        maxLength:100,
        default:0
    },

    publish:{
        required:true,
        type:Boolean
    },

    images:{
        type:Array,
        default: []
    }

},{timestamps:true});

const productModel = mongoose.model('Product',Product);

module.exports = productModel;