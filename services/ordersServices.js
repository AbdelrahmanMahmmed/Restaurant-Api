const { json } = require('express');
const Order = require('../models/ordersModel');
const ApiError = require('../utils/apiError');
const asyncHandler = require('express-async-handler')
const slugify = require('slugify');

// @desc   Find Order
// @router Get   api/v1/Order
// @access   Public

exports.getOrders = asyncHandler(async(req, res) => {
    
    let filter = {};
    if(req.params.BranchId) {
        filter = { item: req.params.BranchId }
    }

    if(req.params.OrderId) {
        filter = { item: req.params.OrderId }
    }
    
    const ORDER = await Order.find(filter);
    res.status(200).json( {results : ORDER.length , data : ORDER});
});

// @desc   Get Order By Id
// @router Get   api/v1/Orders/:id
// @access   Public

exports.getOrder = asyncHandler( async(req , res , next)=>{
    const {id} = req.params ;
    const ORDER = await Order.findById(id);
    if(!ORDER) { return next(new ApiError(`No Order for this id :  ${id}` , 404))};
    res.status(200).json({data : ORDER});
})


// @desc   Update   Order By Id
// @router PUT      api/v1/Orders/:id
// @access          Private

exports.UpdateOrder = asyncHandler( async(req , res , next)=>{
    const {id} = req.params ; 
    const { CustomerId  , totalPrice ,  orderStatus , Menus } = req.body ;

    const ORDER = await Order.findByIdAndUpdate(
        {_id : id} , 
        {
            CustomerId,
            totalPrice,
            orderStatus,
            Menus,
        }, 
        {new : true}
    );
    if(!ORDER) { return next(new ApiError(`No Order for this id :  ${id}` , 404))};
    res.status(200).json({data : ORDER});
})


// @desc   Delete   Order By Id
// @router Delete   api/v1/Orders/:id
// @access          Private

exports.DeleteOrder = asyncHandler( async(req , res , next)=>{
    const {id} = req.params ; 
    const ORDER = await Order.findByIdAndDelete(id);
    if(!ORDER) { return next(new ApiError(`No Order for this id :  ${id}` , 404))};
    res.status(200).json({data : ORDER});
})

// @desc     Create   Order
// @router   Post     api/v1/Orders
// @access            Private

exports.createOrder = asyncHandler(async(req, res) => {
    const { CustomerId  , totalPrice ,  orderStatus , Menus } = req.body ;
    const ORDER = await Order.create(
        {
            CustomerId,
            totalPrice,
            orderStatus,
            Menus,
        });
    res.status(201).json({data : ORDER});  
});