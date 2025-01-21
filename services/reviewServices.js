const { json } = require('express');
const Review = require('../models/reviewModel');
const ApiError = require('../utils/apiError');
const asyncHandler = require('express-async-handler')
const slugify = require('slugify');

// @desc   Find Review
// @router Get   api/v1/Review
// @access   Public

exports.getReviews = asyncHandler(async(req, res) => {
    
    // let filter = {};
    // if(req.params.BranchId) {
    //     filter = { item: req.params.BranchId }
    // }
    
    const REVIEW = await Review.find({});
    res.status(200).json( {results : REVIEW.length , data : REVIEW});
});

// @desc   Get Review By Id
// @router Get   api/v1/Reviews/:id
// @access   Public

exports.getReview = asyncHandler( async(req , res , next)=>{
    const {id} = req.params ;
    const REVIEW = await Review.findById(id);
    if(!REVIEW) { return next(new ApiError(`No Review for this id :  ${id}` , 404))};
    res.status(200).json({data : REVIEW});
})


// @desc   Update   Review By Id
// @router PUT      api/v1/Reviews/:id
// @access          Private

exports.UpdateReview = asyncHandler( async(req , res , next)=>{
    const {id} = req.params ; 
    const {Rating , ReviewText , CustomerID , Date , OrderID} = req.body ;

    const REVIEW = await Review.findByIdAndUpdate(
        {_id : id} , 
        {
            Rating,
            ReviewText,
            CustomerID,
            Date,
            OrderID,
        }, 
        {new : true}
    );
    if(!REVIEW) { return next(new ApiError(`No Review for this id :  ${id}` , 404))};
    res.status(200).json({data : REVIEW});
})


// @desc   Delete   Review By Id
// @router Delete   api/v1/Reviews/:id
// @access          Private

exports.DeleteReview = asyncHandler( async(req , res , next)=>{
    const {id} = req.params ; 
    const REVIEW = await Review.findByIdAndDelete(id);
    if(!REVIEW) { return next(new ApiError(`No Review for this id :  ${id}` , 404))};
    res.status(200).json({data : REVIEW});
})

// @desc     Create   Review
// @router   Post     api/v1/Reviews
// @access            Private

exports.createReview = asyncHandler(async(req, res) => {
    const {Rating , ReviewText , CustomerID , Date , OrderID} = req.body ;
    const REVIEW = await Review.create(
        {
            Rating,
            ReviewText,
            CustomerID,
            Date,
            OrderID,
        });
    res.status(201).json({data : REVIEW});  
});