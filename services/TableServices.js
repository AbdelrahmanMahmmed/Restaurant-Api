const { json } = require('express');
const Table = require('../models/TableModel');
const ApiError = require('../utils/apiError');
const asyncHandler = require('express-async-handler')


// @desc   Find Table
// @router Get   api/v1/Table
// @access   Public

exports.getTables = asyncHandler(async (req, res) => {

    let filter = {};
    if (req.query.branchId) {
        filter = { branchId: req.query.branchId }
    }

    const TABLE = await Table.find(filter);
    res.status(200).json({ results: TABLE.length, data: TABLE });
});

// @desc   Get Table By Id
// @router Get   api/v1/Table/:id
// @access   Public

exports.getTable = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const TABLE = await Table.findById(id)
        .populate({
            path: 'branchId',
            select: 'namebranch'
        });
    if (!TABLE) { return next(new ApiError(`No Table for this id :  ${id}`, 404)) };
    res.status(200).json({ data: TABLE });
})


// @desc   Update   Categorey By Id
// @router PUT      api/v1/Categories/:id
// @access          Private

exports.UpdateTable = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { tableNumber, capacity, status, branchId } = req.body;
    const TABLE = await Table.findByIdAndUpdate(
        { _id: id },
        {
            tableNumber,
            capacity,
            status,
            branchId
        },
        { new: true }
    )
        .populate({
            path: 'branchId',
            select: 'namebranch'
        });
    if (!TABLE) { return next(new ApiError(`No Table for this id :  ${id}`, 404)) };
    res.status(200).json({ data: TABLE });
})



// @desc   Delete   Categorey By Id
// @router Delete   api/v1/Categories/:id
// @access          Private

exports.DeleteTable = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const TABLE = await Table.findByIdAndDelete(id);
    if (!TABLE) { return next(new ApiError(`No Table for this id :  ${id}`, 404)) };
    res.status(200).json({ data: TABLE });
})



// @desc     Create   Table
// @router   Post     api/v1/Table
// @access            Private

exports.createTable = asyncHandler(async (req, res) => {
    const { tableNumber, capacity, status, branchId } = req.body;
    const TABLE = await Table.create({
        tableNumber,
        capacity,
        status,
        branchId,
    });
    res.status(201).json({ data: TABLE });
});