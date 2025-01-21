const { json } = require('express');
const Complier = require('../models/ComplierModel');
const ApiError = require('../utils/apiError');
const asyncHandler = require('express-async-handler')
const slugify = require('slugify');


// @desc   Find Complier
// @router Get   api/v1/Complier
// @access   Public

exports.getCompliers = asyncHandler(async (req, res) => {

    let filter = {};
    if (req.query.customerId) {
        filter = { customerId: req.query.customerId }
    }

    if(req.query.branchId) {
        filter = { branchId: req.query.branchId }
    }
    
    const COMPLIER = await Complier.find(filter);
    res.status(200).json({ results: COMPLIER.length, data: COMPLIER });
});

// @desc   Get Complier By Id
// @router Get   api/v1/Complier/:id
// @access   Public

exports.getComplier = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const COMPLIER = await Complier.findById(id);
    if (!COMPLIER) { return next(new ApiError(`No Complier for this id :  ${id}`, 404)) };
    res.status(200).json({ data: COMPLIER });
})


// @desc   Update   Categorey By Id
// @router PUT      api/v1/Categories/:id
// @access          Private

exports.UpdateComplier = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { customerId , branchId , BodyOfComplier } = req.body;

    const COMPLIER = await Complier.findByIdAndUpdate(
        { _id: id },
        {
            customerId,
            BodyOfComplier,
            branchId,
        },
        { new: true }
    );
    if (!COMPLIER) { return next(new ApiError(`No Complier for this id :  ${id}`, 404)) };
    res.status(200).json({ data: COMPLIER });
})



// @desc   Delete   Categorey By Id
// @router Delete   api/v1/Categories/:id
// @access          Private

exports.DeleteComplier = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const COMPLIER = await Complier.findByIdAndDelete(id);
    if (!COMPLIER) { return next(new ApiError(`No Complier for this id :  ${id}`, 404)) };
    res.status(200).json({ data: COMPLIER });
})



// @desc     Create   Complier
// @router   Post     api/v1/Complier
// @access            Private

exports.createComplier = asyncHandler(async (req, res) => {
    const { customerId ,branchId, BodyOfComplier } = req.body;
    const COMPLIER = await Complier.create({
        customerId,
        BodyOfComplier,
        branchId
    });
    res.status(201).json({ data: COMPLIER });
});