
const { param, body } = require('express-validator');
const validatorsMiddleware = require('../../middleware/validatormiddleware');
const Customer = require('../../models/CustomerModel')
const Order = require('../../models/ordersModel')

exports.getReviewValiadtors = [
    param('id').isMongoId().withMessage('Invalid Review id'),
    validatorsMiddleware,
];


exports.createReviewValidators = [

    body('Rating')
        .isNumeric()
        .withMessage('Rating must be a number between 1 and 5')
        .toInt({ gt: 0, lt: 6 })
        .withMessage('Rating must be a number between'),


    body('ReviewText')
        .notEmpty()
        .withMessage('Review text is required')
        .isLength({ min: 5 })
        .withMessage('Review must be at least 5 characters long')
        .isLength({ max: 500 })
        .withMessage('Review must be less than 500 characters long'),


    body('CustomerID')
        .notEmpty()
        .withMessage('Reviewer ID is required')
        .isMongoId()
        .withMessage('Invalid Reviewer id')
        .custom((ReviewerID) =>
            Customer.findById(ReviewerID).then((review) => {
                if (!review) {
                    return Promise.reject(
                        new Error(`No Review for this id: ${ReviewerID}`)
                    );
                }
            })),

    body('Date')
        .notEmpty()
        .withMessage('Date is required')
        .isISO8601()
        .withMessage('Invalid Date')
        .custom((value) => {
            const currentDate = new Date();
            const reviewDate = new Date(value);
            return currentDate - reviewDate >= 0;
        })
        .withMessage('Date cannot be in the future'),

    body('OrderID')
        .notEmpty()
        .withMessage('Order ID is required')
        .isMongoId()
        .withMessage('Invalid Order id')
        .custom((OrderID) =>
            Order.findById(OrderID).then((order) => {
                if (!order) {
                    return Promise.reject(
                        new Error(`No Order for this id: ${OrderID}`)
                    );
                }
            }))
            ,

    validatorsMiddleware,
];


exports.updateReviewValiadtors = [
    param('id').isMongoId().withMessage('Invalid Review id'),
    validatorsMiddleware,
];

exports.deleteReviewValiadtors = [
    param('id').isMongoId().withMessage('Invalid Review id'),
    validatorsMiddleware,
];