
const { param, body } = require('express-validator');
const validatorsMiddleware = require('../../middleware/validatormiddleware');
const Menu = require('../../models/MenuModel');
const Review = require('../../models/reviewModel');
const Customer = require('../../models/CustomerModel');
const mongoose = require('mongoose');

exports.getOrderValiadtors = [
    param('id').isMongoId().withMessage('Invalid Order id'),
    validatorsMiddleware,
];


exports.createOrderValidators = [
    body('CustomerId')
        .notEmpty()
        .withMessage('Customer id is required')
        .isMongoId()
        .withMessage('Invalid Customer id')
        .custom(async (customerId) => {
            const customerExists = await Customer.findById(customerId);
            if (!customerExists) {
                throw new Error(`Customer with ID ${customerId} does not exist`);
            }
            return true;
        }),

    body('totalPrice')
        .isNumeric()
        .withMessage('Total price must be a number'),

    body('orderStatus')
        .notEmpty()
        .withMessage('Order status is required')
        .isIn(['Pending', 'Confirmed', 'Completed', 'Canceled'])
        .withMessage('Invalid order status'),

    body('Menus')
        .isArray({ min: 1 })
        .withMessage('Menus must be an array with at least one item')
        .custom(async (Menus) => {
            for (const menu of Menus) {
                if (!menu._id || !menu.quantity) {
                    throw new Error('Each menu item must contain an id and quantity');
                }
                if (!mongoose.Types.ObjectId.isValid(menu._id)) {
                    throw new Error(`Invalid Menu ID: ${menu._id}`);
                }
                const menuExists = await Menu.findById(menu._id);
                if (!menuExists) {
                    throw new Error(`Menu with ID ${menu._id} does not exist`);
                }
                if (menu.quantity <= 0) {
                    throw new Error(`Quantity for Menu ID ${menu._id} must be greater than 0`);
                }
            }
            return true;
        }),

    // body('ReviewId')
    //     .notEmpty()
    //     .withMessage('Review id is required')
    //     .isArray()
    //     .withMessage('Review')
    //     .isMongoId()
    //     .withMessage('Invalid Review id')
    //     .custom(async (Reviews) => {
    //         for (const review of Reviews) {
    //             if (!review._id) {
    //                 throw new Error('Each review item must contain an id');
    //             }
    //             if (!mongoose.Types.ObjectId.isValid(review._id)) {
    //                 throw new Error(`Invalid Review ID: ${review._id}`);
    //             }
    //             const reviewExists = await Review.findById(review._id);
    //             if (!reviewExists) {
    //                 throw new Error(`Review with ID ${review._id} does not exist`);
    //             }
    //         }
    //         return true;
    //     }),

    validatorsMiddleware,
];


exports.updateOrderValiadtors = [
    param('id').isMongoId().withMessage('Invalid Order id'),
    validatorsMiddleware,
];

exports.deleteOrderValiadtors = [
    param('id').isMongoId().withMessage('Invalid Order id'),
    validatorsMiddleware,
];