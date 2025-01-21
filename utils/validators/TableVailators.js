const { param, body } = require('express-validator');
const validatorsMiddleware = require('../../middleware/validatormiddleware');
const Customer = require('../../models/CustomerModel');
const Branch = require('../../models/BranchModel');
exports.getTableValiadtors = [
    param('id').isMongoId().withMessage('Invalid Table id'),
    validatorsMiddleware,
];


exports.createTableValidators = [
    body('tableNumber')
        .isNumeric()
        .withMessage('Invalid Table Number')
        .isLength({ min: 1 }),

    body('capacity')
        .isNumeric()
        .withMessage('Invalid Capacity')
        .isLength({ min: 1 })
        .isLength({ max: 5 }),

    body('status')
        .isIn(['Waiting','available', 'booked', 'occupied'])
        .withMessage('Invalid Status'),

    body('branchId')
    .isMongoId()
    .withMessage('Invalid Branch ID')
    .custom(async (branchId) => {
        const branchExists = await Branch.findById(branchId);
        if (!branchExists) {
            throw new Error(`Branch with ID ${branchId} does not exist`);
        }
        return true;
    }),
    validatorsMiddleware,
];


exports.updateTableValiadtors = [
    param('id').isMongoId().withMessage('Invalid Table id'),
    validatorsMiddleware,
];

exports.deleteTableValiadtors = [
    param('id').isMongoId().withMessage('Invalid Table id'),
    validatorsMiddleware,
];