const { json } = require('express');
const Staff = require('../models/StaffModel');
const ApiError = require('../utils/apiError');
const asyncHandler = require('express-async-handler')
const slugify = require('slugify');



// @desc   Find Staffes
// @router Get   api/v1/Staffes
// @access   Public

exports.getStaffs = asyncHandler(async(req, res) => {
    
    let filter = {};
    if(req.params.branchId) {
        filter = { Branch: req.params.branchId}
    }

    const STAFF = await Staff.find(filter).populate({
        path: 'Branch',
        select: 'namebranch -_id'
    });
    res.status(200).json( {results : STAFF.length , data : STAFF});
});


// @desc   Get Staff By Id
// @router Get   api/v1/Staffs/:id
// @access   Public

exports.getStaff = asyncHandler( async(req , res , next)=>{
    const {id} = req.params ;
    const STAFF = await Staff.findById(id).populate({
        path: 'Branch',
        select: 'namebranch -_id'
    });
    if(!STAFF) { return next(new ApiError(`No Staff for this id :  ${id}` , 404))};
    res.status(200).json({data : STAFF});
})


// @desc   Update   Staff By Id
// @router PUT      api/v1/Staff/:id
// @access          Private

exports.UpdateStaff = asyncHandler( async(req , res , next)=>{
    const {id} = req.params ; 
    const {namestaff , addressstaff ,PhoneNumberstaff , Salayingstaff , rolestaff , Branch} = req.body ;

    const STAFF = await Staff.findByIdAndUpdate(
        {_id : id} , 
        {
            namestaff,
            slugstaff : slugify(namestaff),
            addressstaff,
            PhoneNumberstaff,
            Salayingstaff,
            rolestaff,
            Branch
        }, 
        {new : true}
    );
    if(!STAFF) { return next(new ApiError(`No Staff for this id :  ${id}` , 404))};
    res.status(200).json({data : STAFF});
})


// @desc   Delete   Staff By Id
// @router Delete   api/v1/Staffes/:id
// @access          Private

exports.DeleteStaff = asyncHandler( async(req , res , next)=>{
    const {id} = req.params ; 
    const STAFF = await Staff.findByIdAndDelete(id);
    if(!STAFF) { return next(new ApiError(`No Staff for this id :  ${id}` , 404))};
    res.status(200).json({data : STAFF});
})

// @desc     Create   Staff
// @router   Post     api/v1/Staffes
// @access            Private

exports.createStaff = asyncHandler(async(req, res) => {
    const {
        namestaff,addressstaff,PhoneNumberstaff,Branch,rolestaff,Salayingstaff
    } = req.body;
    const STAFF = await Staff.create(
        {
            namestaff,
            slugstaff : slugify(namestaff),
            addressstaff,
            PhoneNumberstaff,
            Salayingstaff,
            rolestaff,
            Branch
        });
    res.status(201).json({data : STAFF});  
});