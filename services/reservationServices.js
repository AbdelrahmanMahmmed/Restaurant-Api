const { json } = require('express');
const Reservation = require('../models/reservationModel');
const ApiError = require('../utils/apiError');
const asyncHandler = require('express-async-handler')


// @desc   Find Reservation
// @router Get   api/v1/Reservation
// @access   Public

exports.getReservations = asyncHandler(async (req, res) => {

    let filter = {};
    if (req.query.branchId) {
        filter = { branchId: req.query.branchId }
    }

    const RESERVATION = await Reservation.find(filter);
    res.status(200).json({ results: RESERVATION.length, data: RESERVATION });
});

// @desc   Get Reservation By Id
// @router Get   api/v1/Reservation/:id
// @access   Public

exports.getReservation = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const RESERVATION = await Reservation.findById(id);
    if (!RESERVATION) { return next(new ApiError(`No Reservation for this id :  ${id}`, 404)) };
    res.status(200).json({ data: RESERVATION });
})


// @desc   Update   Categorey By Id
// @router PUT      api/v1/Categories/:id
// @access          Private

exports.UpdateReservation = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { tableId , customerId , status , branchId , reservationTime , numberOfGuests} = req.body;
    const RESERVATION = await Reservation.findByIdAndUpdate(
        { _id: id },
        {
            tableId,
            customerId,
            branchId,
            reservationTime,
            numberOfGuests,
            status
        },
        { new: true }
    );
    if (!RESERVATION) { return next(new ApiError(`No Reservation for this id :  ${id}`, 404)) };
    res.status(200).json({ data: RESERVATION });
})



// @desc   Delete   Categorey By Id
// @router Delete   api/v1/Categories/:id
// @access          Private

exports.DeleteReservation = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const RESERVATION = await Reservation.findByIdAndDelete(id);
    if (!RESERVATION) { return next(new ApiError(`No Reservation for this id :  ${id}`, 404)) };
    res.status(200).json({ data: RESERVATION });
})



// @desc     Create   Reservation
// @router   Post     api/v1/Reservation
// @access            Private

exports.createReservation = asyncHandler(async (req, res) => {
    const { tableId , customerId , status , branchId , reservationTime , numberOfGuests} = req.body;
    const RESERVATION = await Reservation.create({
        tableId,
        customerId,
        branchId,
        reservationTime,
        numberOfGuests,
        status
    });
    res.status(201).json({ data: RESERVATION });
});