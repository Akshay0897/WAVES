const productModel = require('../models/Product');
const mongoose = require('mongoose');

exports.addProduct = async (req,res,next) => {
    if(req.body)
    {
        const content = req.body;
        console.log(content);
        const doc = new productModel(content);
        const newdoc = await doc.save();
        res.status(200).json({
            'message':'product added successfully',
            'article': newdoc
        })
    }
}

exports.getProductsByIds = async (req,res,next) => {
   let type = req.query.type;
   let items = req.query.id;

   if( type==='array' ) {
       let ids = req.query.id.split(',');
       items = [];
       items = ids.map(item => {
           return mongoose.Types.ObjectId(item);
       })
    }
    
   const articles = await productModel.find({'_id': { $in:items}}).populate('brand').populate('wood');

   res.status(200).json({
       'message':'mali gayu',
        'docs':articles
   })
}

exports.getProductsByArrivals =  async (req,res,next) => {
    
    let sortparams = req.query.sort.split(',');
    let order = req.query.order === 'desc' ? '-' : '+'; 
    sortparams = sortparams.map(sortparam => `${order}${sortparam}`).join(',');
    console.log(sortparams);
    const articles = await productModel.find({})
    .populate('brand')
    .populate('wood')
    .sort(sortparams).limit(4);
    res.status(200).json({
        'message':'mali gayu',
         'docs':articles
    })
}