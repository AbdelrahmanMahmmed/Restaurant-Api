const { json } = require('express');
const Item = require('../models/ItemsModel');
const ApiError = require('../utils/apiError');
const asyncHandler = require('express-async-handler')
const slugify = require('slugify');

// @desc   Find Item
// @router Get   api/v1/Item
// @access   Public

exports.getItems = asyncHandler(async(req, res) => {
    const ITEM = await Item.find({});
    res.status(200).json( {results : ITEM.length , data : ITEM});
});

// @desc   Get Categorey By Id
// @router Get   api/v1/Categories/:id
// @access   Public

exports.getItem = asyncHandler( async(req , res , next)=>{
    const {id} = req.params ;
    const ITEM = await Item.findById(id);
    if(!ITEM) { return next(new ApiError(`No Item for this id :  ${id}` , 404))};
    res.status(200).json({data : ITEM});
})


// @desc   Update   Categorey By Id
// @router PUT      api/v1/Categories/:id
// @access          Private

exports.UpdateItem = asyncHandler( async(req , res , next)=>{
    const {id} = req.params ; 
    const {nameItem , descriptionItem} = req.body ;

    const ITEM = await Item.findByIdAndUpdate(
        {_id : id} , 
        {
            nameItem , 
            slugItem : slugify(nameItem),
            descriptionItem
        }, 
        {new : true}
    );
    if(!ITEM) { return next(new ApiError(`No Item for this id :  ${id}` , 404))};
    res.status(200).json({data : ITEM});
})


// @desc   Delete   Categorey By Id
// @router Delete   api/v1/Categories/:id
// @access          Private

exports.Deleteitem = asyncHandler( async(req , res , next)=>{
    const {id} = req.params ; 
    const ITEM = await Item.findByIdAndDelete(id);
    if(!ITEM) { return next(new ApiError(`No Item for this id :  ${id}` , 404))};
    res.status(200).json({data : ITEM});
})

// @desc     Create   Category
// @router   Post     api/v1/Categories
// @access            Private

exports.createItems = asyncHandler(async(req, res) => {
    const { nameItem , descriptionItem } = req.body;
    const item = await Item.create({nameItem , descriptionItem , slugItem : slugify(nameItem)} );
    res.status(201).json({data : item});  
});