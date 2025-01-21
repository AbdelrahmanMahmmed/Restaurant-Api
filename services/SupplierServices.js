const { json } = require('express');
const Supplier = require('../models/SuppliersModel');
const ApiError = require('../utils/apiError');
const asyncHandler = require('express-async-handler')

// @desc   Find Supplier
// @router Get   api/v1/Supplier
// @access   Public

exports.getSuppliers = asyncHandler(async(req, res) => {

    let filter = {};
    if(req.query.branchId) {
        filter = { BranchId: req.query.branchId }
    }
    const SUPPLIER = await Supplier.find(filter);
    res.status(200).json( {results : SUPPLIER.length , data : SUPPLIER});
});

// @desc   Get Categorey By Id
// @router Get   api/v1/Categories/:id
// @access   Public

exports.getSupplier = asyncHandler( async(req , res , next)=>{
    const {id} = req.params ;
    const SUPPLIER = await Supplier.findById(id);
    if(!SUPPLIER) { return next(new ApiError(`No Supplier for this id :  ${id}` , 404))};
    res.status(200).json({data : SUPPLIER});
})


// @desc   Update   Categorey By Id
// @router PUT      api/v1/Categories/:id
// @access          Private

exports.UpdateSupplier = asyncHandler( async(req , res , next)=>{
    const {id} = req.params ; 
    const { supplierName , BranchId , contactName , AddressSuplier , phonecontact , emailcontact , ItemsSupplied } = req.body ;

    const SUPPLIER = await Supplier.findByIdAndUpdate(
        {_id : id} , 
        {
            supplierName,
            contactName,
            AddressSuplier,
            phonecontact,
            emailcontact,
            ItemsSupplied,
            BranchId,
        }, 
        {new : true}
    );
    if(!SUPPLIER) { return next(new ApiError(`No Supplier for this id :  ${id}` , 404))};
    res.status(200).json({data : SUPPLIER});
})


// @desc   Delete   Categorey By Id
// @router Delete   api/v1/Categories/:id
// @access          Private

exports.DeleteSupplier = asyncHandler( async(req , res , next)=>{
    const {id} = req.params ; 
    const SUPPLIER = await Supplier.findByIdAndDelete(id);
    if(!SUPPLIER) { return next(new ApiError(`No Supplier for this id :  ${id}` , 404))};
    res.status(200).json({data : SUPPLIER});
})

// @desc     Create   Category
// @router   Post     api/v1/Categories
// @access            Private

exports.createSupplier = asyncHandler(async(req, res) => {
    const { supplierName , BranchId , contactName , AddressSuplier , phonecontact , emailcontact , ItemsSupplied } = req.body ;
    const SUPPLIER = await Supplier.create({
        supplierName,
        contactName,
        AddressSuplier,
        phonecontact,
        emailcontact,
        ItemsSupplied,
        BranchId,
    });
    res.status(201).json({data : SUPPLIER});  
});