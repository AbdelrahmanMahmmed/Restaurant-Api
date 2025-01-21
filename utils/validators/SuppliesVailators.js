
const { param, body } = require('express-validator');
const validatorsMiddleware = require('../../middleware/validatormiddleware');
const Branch = require('../../models/BranchModel');

exports.getSupplierValiadtors = [
    param('id').isMongoId().withMessage('Invalid Supplier id'),
    validatorsMiddleware,
];


exports.createSupplierValidators = [
    
    body('supplierName')
    .notEmpty().withMessage('Supplier name is required')
    .isLength({ min: 3 }).withMessage('Supplier name should be at least 3 characters long')
    .isLength({ max: 32 }).withMessage('Supplier name should not exceed 32 characters long'),

    body('contactName')
    .notEmpty().withMessage('Contact name is required')
    .isLength({ min: 3 }).withMessage('Contact name should be at least 3 characters long')
    .isLength({ max: 32 }).withMessage('Contact name should not exceed 32 characters long'),   

    body('AddressSuplier')
    .notEmpty().withMessage('Supplier address is required')
    .isLength({ min: 10 }).withMessage('Supplier address should be at least 10 characters long')
    .isLength({ max: 500 }).withMessage('Supplier address should not exceed 500 characters long'),

    body('phonecontact')
    .notEmpty().withMessage('Phone contact is required')
    .isLength({ min: 10 }).withMessage('Phone contact should be at least 10 characters long')
    .isLength({ max: 15 }).withMessage('Phone contact should not exceed 15 characters long'),

    body('emailcontact')
    .notEmpty().withMessage('Email contact is required')
    .isEmail().withMessage('Invalid Email')
    .isLength({ max: 50 }).withMessage('Email contact should not exceed 50 characters long'),

    body('ItemsSupplied')
    .isArray()
    .withMessage('Items supplied should be an array'),

    body('BranchId')
    .notEmpty().withMessage('Branch id is required')
    .isMongoId().withMessage('Invalid Branch id')
    .custom(async (branchId) => {
        const branchExists = await Branch.findById(branchId);
        if (!branchExists) {
            throw new Error(`Branch with ID ${branchId} does not exist`);
        }
        return true;
    }),
    validatorsMiddleware,
];


exports.updateSupplierValiadtors = [
    param('id').isMongoId().withMessage('Invalid Supplier id'),
    validatorsMiddleware,
];

exports.deleteSupplierValiadtors = [
    param('id').isMongoId().withMessage('Invalid Supplier id'),
    validatorsMiddleware,
];