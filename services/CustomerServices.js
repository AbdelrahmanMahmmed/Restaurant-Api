const { json } = require('express');
const Customer = require('../models/CustomerModel');
const ApiError = require('../utils/apiError');
const asyncHandler = require('express-async-handler')
const slugify = require('slugify');

// @desc   Find Customer
// @router Get   api/v1/Customer
// @access   Public

exports.getCustomers = asyncHandler(async(req, res) => {
    
    let filter = {};
    if(req.params.CustomerId) {
        filter = { Customer: req.params.CustomerId }
    }

    const CUSTOMER = await Customer.find(filter);
    res.status(200).json( {results : CUSTOMER.length , data : CUSTOMER});
});

// @desc   Get Customer By Id
// @router Get   api/v1/Customers/:id
// @access   Public

exports.getCustomer = asyncHandler( async(req , res , next)=>{
    const {id} = req.params ;
    const CUSTOMER = await Customer.findById(id);
    if(!CUSTOMER) { return next(new ApiError(`No Customer for this id :  ${id}` , 404))};
    res.status(200).json({data : CUSTOMER});
})


// @desc   Update   Customer By Id
// @router PUT      api/v1/Customers/:id
// @access          Private

exports.UpdateCustomer = asyncHandler( async(req , res , next)=>{
    const {id} = req.params ; 
    const { nameCustomer , addressCustomer , PhoneNumberCustomer  } = req.body;

    const CUSTOMER = await Customer.findByIdAndUpdate(
        {_id : id} , 
        {
            nameCustomer,
            slugCustomer : slugify(nameCustomer),
            addressCustomer,
            PhoneNumberCustomer,
        }, 
        {new : true}
    );
    if(!CUSTOMER) { return next(new ApiError(`No Customer for this id :  ${id}` , 404))};
    res.status(200).json({data : CUSTOMER});
})


// @desc   Delete   Customer By Id
// @router Delete   api/v1/Customers/:id
// @access          Private

exports.DeleteCustomer = asyncHandler( async(req , res , next)=>{
    const {id} = req.params ; 
    const CUSTOMER = await Customer.findByIdAndDelete(id);
    if(!CUSTOMER) { return next(new ApiError(`No Customer for this id :  ${id}` , 404))};
    res.status(200).json({data : CUSTOMER});
})

// @desc     Create   Customer
// @router   Post     api/v1/Customers
// @access            Private

exports.createCustomer = asyncHandler(async(req, res) => {
    const { nameCustomer , addressCustomer , PhoneNumberCustomer } = req.body;
    const CUSTOMER = await Customer.create(
        {
            nameCustomer,
            slugCustomer : slugify(nameCustomer),
            addressCustomer,
            PhoneNumberCustomer,
        });
    res.status(201).json({data : CUSTOMER});  
});