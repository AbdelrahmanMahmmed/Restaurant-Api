const { json } = require('express');
const Offer = require('../models/OffersModels');
const ApiError = require('../utils/apiError');
const asyncHandler = require('express-async-handler')


// @desc   Find Offer
// @router Get   api/v1/Offer
// @access   Public

exports.getOffers = asyncHandler(async (req, res) => {
    const OFFER = await Offer.find({}).populate({
        path: 'MenuID',
        select: 'nameMenu priceMenu'
    });
    res.status(200).json({ results: OFFER.length, data: OFFER });
});

// @desc   Get Offer By Id
// @router Get   api/v1/Offer/:id
// @access   Public

exports.getOffer = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const OFFER = await Offer.findById(id).populate({
        path: 'MenuID',
        select: 'nameMenu priceMenu'
    });
    if (!OFFER) { return next(new ApiError(`No Offer for this id :  ${id}`, 404)) };
    res.status(200).json({ data: OFFER });
})


// @desc   Update   Categorey By Id
// @router PUT      api/v1/Categories/:id
// @access          Private

exports.UpdateOffer = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { MenuID , Discountpercentage, startDate, StatusOffer } = req.body;
    const OFFER = await Offer.findByIdAndUpdate(
        { _id: id },
        {
            MenuID,
            Discountpercentage,
            startDate,
            StatusOffer,
        },
        { new: true }
    );
    if (!OFFER) { return next(new ApiError(`No Offer for this id :  ${id}`, 404)) };
    res.status(200).json({ data: OFFER });
})



// @desc   Delete   Categorey By Id
// @router Delete   api/v1/Categories/:id
// @access          Private

exports.DeleteOffer = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const OFFER = await Offer.findByIdAndDelete(id);
    if (!OFFER) { return next(new ApiError(`No Offer for this id :  ${id}`, 404)) };
    res.status(200).json({ data: OFFER });
})



// @desc     Create   Offer
// @router   Post     api/v1/Offer
// @access            Private

exports.createOffer = asyncHandler(async (req, res) => {
    const { MenuID, Discountpercentage, startDate, StatusOffer } = req.body;
    const OFFER = await Offer.create({
        MenuID,
        Discountpercentage,
        startDate,
        StatusOffer,
    });
    res.status(201).json({ data: OFFER });
});