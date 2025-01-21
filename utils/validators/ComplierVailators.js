
const { param, body } = require('express-validator');
const validatorsMiddleware = require('../../middleware/validatormiddleware');
const Customer = require('../../models/CustomerModel');
const Branch = require('../../models/BranchModel');

exports.getComplierValiadtors = [
    param('id').isMongoId().withMessage('Invalid Complier id'),
    validatorsMiddleware,
];


exports.createComplierValidators = [

    body('customerId')
        .notEmpty()
        .withMessage('Customer ID is required')
        .isMongoId()
        .withMessage('Invalid Customer id')
        .custom(async (customerId) => {
            const customerExists = await Customer.findById(customerId);
            if (!customerExists) {
                throw new Error(`Customer with ID ${customerId} does not exist`);
            }
            return true;
        }),

    body('branchId')
        .notEmpty()
        .withMessage('Branch ID is required')
        .isMongoId()
        .withMessage('Invalid Branch id')
        .custom(async (branchId) => {
            const branchExists = await Branch.findById(branchId);
            if (!branchExists) {
                throw new Error(`Branch with ID ${branchId} does not exist`);
            }
            return true;

        }),

    body('BodyOfComplier')
        .notEmpty()
        .withMessage('Body of Complier is required'),

    validatorsMiddleware,
];


exports.updateComplierValiadtors = [
    param('id').isMongoId().withMessage('Invalid Complier id'),
    validatorsMiddleware,
];

exports.deleteComplierValiadtors = [
    param('id').isMongoId().withMessage('Invalid Complier id'),
    validatorsMiddleware,
];