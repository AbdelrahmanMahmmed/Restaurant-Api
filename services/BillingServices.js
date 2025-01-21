const { json } = require('express');
const Billing = require('../models/BillingModel');
const ApiError = require('../utils/APIError');
const asyncHandler = require('express-async-handler')
const slugify = require('slugify');

// @desc   Find Billing
// @router Get   api/v1/Billing
// @access   Public

exports.getBillings = asyncHandler(async(req, res) => {

    let filter = {}

    if(req.query.branchId) {
        filter = { branchId: req.query.branchId }
    }

    if(req.query.CustomerID){
        filter = { CustomerID: req.query.CustomerID }
    }

    const BILLING = await Billing.find(filter);
    res.status(200).json( {results : BILLING.length , data : BILLING});
});

// @desc   Get Categorey By Id
// @router Get   api/v1/Categories/:id
// @access   Public

exports.getBilling = asyncHandler( async(req , res , next)=>{
    const {id} = req.params ;
    const BILLING = await Billing.findById(id)
    .populate({
        path: 'branchId',
        select: 'namebranch -_id'
    })
    .populate({
        path: 'Menus',
        select: 'nameMenu priceMenu -_id'
    })
    .populate({
        path: 'createdBy',
        select: 'namestaff -_id'
    })
    .populate({
        path: 'CustomerID',
        select: 'nameCustomer -_id'
    });
    if(!BILLING) { return next(new ApiError(`No Billing for this id :  ${id}` , 404))};
    res.status(200).json({data : BILLING});
})


// @desc   Update   Categorey By Id
// @router PUT      api/v1/Categories/:id
// @access          Private

exports.UpdateBilling = asyncHandler( async(req , res , next)=>{
    const {id} = req.params ; 
    const { CustomerID , invoiceDate , startDate , Menus , totalAmount  , branchId , createdBy , notes , paymentStatus , discount , paymentMethod} = req.body;

    const BILLING = await Billing.findByIdAndUpdate(
        {_id : id} , 
        {
            CustomerID,
            invoiceDate,
            startDate,
            Menus,
            totalAmount,
            branchId,
            createdBy,
            notes,
            paymentStatus,
            discount,
            paymentMethod,
        }, 
        {new : true}
    ).populate({
        path: 'branchId',
        select: 'namebranch'
    })
    .populate({
        path: 'Menus',
        select: 'nameMenu priceMenu'
    })
    .populate({
        path: 'createdBy',
        select: 'namestaff'
    })
    .populate({
        path: 'CustomerID',
        select: 'nameCustomer'
    });
    if(!BILLING) { return next(new ApiError(`No Billing for this id :  ${id}` , 404))};
    res.status(200).json({data : BILLING});
})


// @desc   Delete   Categorey By Id
// @router Delete   api/v1/Categories/:id
// @access          Private

exports.DeleteBilling = asyncHandler( async(req , res , next)=>{
    const {id} = req.params ; 
    const BILLING = await Billing.findByIdAndDelete(id);
    if(!BILLING) { return next(new ApiError(`No Billing for this id :  ${id}` , 404))};
    res.status(200).json({data : BILLING});
})

// @desc     Create   Category
// @router   Post     api/v1/Categories
// @access            Private

exports.createBillings = asyncHandler(async(req, res) => {
    const { CustomerID , invoiceDate , startDate , Menus , totalAmount  , branchId , createdBy , notes , paymentStatus , discount , paymentMethod} = req.body;
    const BILLING = await Billing.create(
        {
            CustomerID,
            invoiceDate,
            startDate,
            Menus,
            totalAmount,
            branchId,
            createdBy,
            notes,
            paymentStatus,
            discount,
            paymentMethod,
        });
    res.status(201).json({data : BILLING});  
});