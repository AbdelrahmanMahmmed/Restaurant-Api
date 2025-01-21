const express = require('express');
const {
    getReviewValiadtors,
    updateReviewValiadtors,
    deleteReviewValiadtors,
    createReviewValidators
} = require('../utils/validators/reviewVailators');

const router = express.Router({mergeParams : true});


const {
    getReview,
    getReviews,
    createReview,
    UpdateReview,
    DeleteReview,
} = require('../services/reviewServices');

router
    .route('/')
    .get(getReviews)
    .post(createReviewValidators , createReview);

router
    .route('/:id')
    .get(getReviewValiadtors , getReview)
    .put(updateReviewValiadtors , UpdateReview)
    .delete(deleteReviewValiadtors , DeleteReview);

module.exports = router;