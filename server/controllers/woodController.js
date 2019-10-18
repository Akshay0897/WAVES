const woodModel = require('../models/Woods');

exports.addWood = async (req,res,next) =>{
    if(req.body)
    {
        const doc = await woodModel.create({
            name:req.body.name
        });

        res.status(200).json({
            'message':'item added successfully',
            'brand': doc
        })
    }
}

exports.getWoods = async (req,res,next) => {

        const docs = await woodModel.find({})

        res.status(200).json({
            'message':'item fetched successfully',
            'brand': docs
        })
}