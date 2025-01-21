
const { param, body } = require('express-validator');
const validatorsMiddleware = require('../../middleware/validatormiddleware');
const Order = require('../../models/ordersModel');
const mongoose = require('mongoose');

exports.getCustomerValiadtors = [
    param('id').isMongoId().withMessage('Invalid Customer id'),
    validatorsMiddleware,
];


exports.createCustomerValidators = [
    body('nameCustomer')
        .notEmpty()
        .withMessage('Name is required')
        .isLength({ min: 3 })
        .withMessage('Name must be at least 3 characters long')
        .isLength({ max: 32 })
        .withMessage('Name must be less than 50 characters long'),

    body('addressCustomer')
        .notEmpty()
        .withMessage('Address is required')
        .isLength({ min: 10 })
        .withMessage('Address must be at least 10 characters long')
        .isLength({ max: 500 })
        .withMessage('Address must be less than 500 characters long'),

    body('PhoneNumberCustomer')
        .notEmpty()
        .withMessage('Phone number is required'),

    // body('Order')
    //     .isArray({ min: 1 })
    //     .withMessage('Order must be an array with at least one item')
    //     .custom(async (orders) => {
    //         for (const orderId of orders) {
    //             if (!mongoose.Types.ObjectId.isValid(orderId)) {
    //                 throw new Error(`Invalid Order ID: ${orderId}`);
    //             }
    //             const orderExists = await Order.findById(orderId);
    //             if (!orderExists) {
    //                 throw new Error(`Order with ID ${orderId} does not exist`);
    //             }
    //         }
    //         return true;
    //     }),
    
    validatorsMiddleware,
];


exports.updateCustomerValiadtors = [
    param('id').isMongoId().withMessage('Invalid Customer id'),
    validatorsMiddleware,
];

exports.deleteCustomerValiadtors = [
    param('id').isMongoId().withMessage('Invalid Customer id'),
    validatorsMiddleware,
];