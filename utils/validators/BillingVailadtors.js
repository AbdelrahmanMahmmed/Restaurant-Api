
const { param, body } = require('express-validator');
const validatorsMiddleware = require('../../middleware/validatormiddleware');
const Customer = require('../../models/CustomerModel');
const Branch = require('../../models/BranchModel');
const Menu = require('../../models/MenuModel');
const Staff = require('../../models/StaffModel');
const mongoose = require('mongoose');
exports.getBillingValiadtors = [
    param('id').isMongoId().withMessage('Invalid Billing id'),
    validatorsMiddleware,
];


exports.createBillingValidators = [

    body('CustomerID')
        .notEmpty().withMessage('Customer ID is required')
        .isMongoId().withMessage('Invalid Customer ID')
        .custom(async (customerId) => {
            const customerExists = await Customer.findById(customerId);
            if (!customerExists) {
                throw new Error(`Customer with ID ${customerId} does not exist`);
            }
            return true;
        }),

    body('invoiceDate')
        .notEmpty().withMessage('Invoice Date is required')
        .isISO8601().withMessage('Invalid Invoice Date'),

    body('startDate')
        .notEmpty().withMessage('Start Date is required')
        .isISO8601().withMessage('Invalid Start Date'),

    body('Menus')
    .isArray()
    .custom(async (menus) => {
        for (const menu of menus) {
            if (!menu._id) {
                throw new Error('Each menu item must contain an id');
            }
            if (!mongoose.Types.ObjectId.isValid(menu._id)) {
                throw new Error(`Invalid Menu ID: ${menu._id}`);
            }
            const menuExists = await Menu.findById(menu._id);
            if (!menuExists) {
                throw new Error(`Menu with ID ${menu._id} does not exist`);
            }
        }
        return true;
    }),

    body('totalAmount')
        .notEmpty().withMessage('Total Amount is required')
        .isNumeric().withMessage('Total Amount must be a number'),

    body('branchId')
        .notEmpty().withMessage('Branch ID is required')
        .isMongoId().withMessage('Invalid Branch ID')
        .custom(async (branchId) => {
            const branchExists = await Branch.findById(branchId);
            if (!branchExists) {
                throw new Error(`Branch with ID ${branchId} does not exist`);
            }
            return true;
        }),

    body('createdBy')
        .notEmpty().withMessage('Created By is required')
        .isMongoId().withMessage('Invalid Created By ID')
        .custom(async (createdBy) => {
            const staffExists = await Staff.findById(createdBy);
            if (!staffExists) {
                throw new Error(`Staff with ID ${createdBy} does not exist`);
            }
            return true;
        }),

    body('notes')
        .optional()
        .isLength({ min: 5 })
        .withMessage('Notes should be at least 5 characters long')
        .isLength({ max: 2000 })
        .withMessage('Notes should be less than 2000 characters long'),

    body('paymentStatus')
        .notEmpty()
        .withMessage('Payment Status is required')
        .isIn(['Paid', 'Unpaid', 'Partially Paid']),

    body('discount')
        .optional()
        .isNumeric()
        .withMessage('Discount must be a number'),

    body('paymentMethod')
        .notEmpty()
        .withMessage('Payment Method is required')
        .isIn(['Card', 'Cash', 'Online']),


    validatorsMiddleware,
];


exports.updateBillingValiadtors = [
    param('id').isMongoId().withMessage('Invalid Billing id'),
    validatorsMiddleware,
];

exports.deleteBillingValiadtors = [
    param('id').isMongoId().withMessage('Invalid Billing id'),
    validatorsMiddleware,
];