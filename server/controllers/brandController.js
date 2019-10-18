const brandModel = require('../models/Brand');

exports.addBrand = async (req,res,next) =>{
    if(req.body)
    {
        const doc = await brandModel.create({
            name:req.body.name
        })
        res.status(200).json({
            'message':'item added successfully',
            'brand': doc
        })
    }
}