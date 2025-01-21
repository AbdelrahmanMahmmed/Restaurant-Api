
const { param, body } = require('express-validator');
const validatorsMiddleware = require('../../middleware/validatormiddleware');
const Menu = require('../../models/MenuModel');


exports.getOfferValiadtors = [
    param('id').isMongoId().withMessage('Invalid Offer id'),
    validatorsMiddleware,
];


exports.createOfferValidators = [
    body('MenuID')
        .notEmpty()
        .withMessage('Menu ID is required')
        .isMongoId()
        .withMessage('Menu ID is required')
        .custom(async (value, { req }) => {
            const menuExists = await Menu.findById(value);
            if (!menuExists) {
                throw new Error('Menu with this id does not exist');
            }
            return true;
        }),

    body('Discountpercentage')
        .notEmpty()
        .withMessage('Discount percentage is required')
        .isNumeric()
        .withMessage('Discount percentage must be a number')
        .isFloat({ gt: 0, lt: 100 })
        .withMessage('Discount percentage must be between 1 and 99'),


    body('startDate')
        .notEmpty()
        .withMessage('Start Date is required')
        .isISO8601()
        .withMessage('Invalid Start Date')
        .custom((value) => {
            const currentDate = new Date();
            const startDate = new Date(value);
            return currentDate - startDate >= 0;
        }),

    body('StatusOffer')
        .notEmpty()
        .withMessage('StatusOffer is required')
        .isIn(['Active', 'Inactive'])
        .withMessage('Invalid StatusOffer'),
    validatorsMiddleware,
];


exports.updateOfferValiadtors = [
    param('id').isMongoId().withMessage('Invalid Offer id'),
    validatorsMiddleware,
];

exports.deleteOfferValiadtors = [
    param('id').isMongoId().withMessage('Invalid Offer id'),
    validatorsMiddleware,
];