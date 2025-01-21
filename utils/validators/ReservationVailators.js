const { param, body } = require('express-validator');
const validatorsMiddleware = require('../../middleware/validatormiddleware');

const Customer = require('../../models/CustomerModel');
const Branch = require('../../models/BranchModel');
const Table = require('../../models/TableModel');

exports.getReservationValiadtors = [
    param('id').isMongoId().withMessage('Invalid Reservation id'),
    validatorsMiddleware,
];


exports.createReservationValidators = [

    body('tableId')
        .notEmpty()
        .withMessage('Table id is required')
        .isMongoId()
        .withMessage('Invalid Reservation')
        .custom(async (TableId) => {
            const tableExists = await Table.findById(TableId);
            if (!tableExists) {
                throw new Error(`Table with ID ${TableId} does not exist`);
            }
            return true;
        }),

    body('customerId')
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

    body('branchId')
        .notEmpty()
        .withMessage('Branch id is required')
        .isMongoId()
        .withMessage('Invalid Branch id')
        .custom(async (branchId) => {
            const branchExists = await Branch.findById(branchId);
            if (!branchExists) {
                throw new Error(`Branch with ID ${branchId} does not exist`);
            }
            return true;
        }),



    body('reservationTime')
        .notEmpty()
        .withMessage('Reservation time is required')
        .isISO8601()
        .withMessage('Invalid time format, should be HH:MM:SS'),

    body('numberOfGuests')
        .isNumeric()
        .withMessage('Number of guests must be a number')
        .isLength({ min: 0, max: 5 })
        .withMessage('Number of guests must between 0 and 5'),

    body('status')
        .notEmpty()
        .withMessage('Reservation date is required')
        .isIn(["Pending", "Canceled", "Confirmed"])
        .withMessage("Invalid Status"),
    
    validatorsMiddleware,
];


exports.updateReservationValiadtors = [
    param('id').isMongoId().withMessage('Invalid Reservation id'),
    validatorsMiddleware,
];

exports.deleteReservationValiadtors = [
    param('id').isMongoId().withMessage('Invalid Reservation id'),
    validatorsMiddleware,
];