
const { param, body } = require('express-validator');
const validatorsMiddleware = require('../../middleware/validatormiddleware');

exports.getStaffValiadtors = [
    param('id').isMongoId().withMessage('Invalid Staff id'),
    validatorsMiddleware,
];


exports.createStaffValidators = [

    body('namestaff')
        .notEmpty()
        .withMessage("Staff Required")
        .isLength({ min: 3 })
        .withMessage("Too short Staff name")
        .isLength({ max: 32 })
        .withMessage("Too long Staff name"),

    body('addressstaff')
        .notEmpty()
        .withMessage("Staff Required")
        .isLength({ min: 10 })
        .withMessage("Too short Staff name")
        .isLength({ max: 500 })
        .withMessage("Too long Staff name"),

    body('PhoneNumberstaff')
        .notEmpty()
        .withMessage("Staff Required")
        .isLength({ min: 10 })
        .withMessage("Too short Phone number")
        .isLength({ max: 15 })
        .withMessage("Too long Phone number"),
        
    body('Salayingstaff')
        .isNumeric()
        .withMessage("Invalid Salary")
        .custom((value) => {
            if (value < 500) {
                throw new Error("Salary must be greater than 500");
            }
            if (value > 3500) {
                throw new Error("Salary must be less than 3500");
            }
            return true;
        })
        .withMessage("Salary must be between 500 and 3500"),

    body('rolestaff')
        .notEmpty()
        .withMessage("Staff Required")
        .isIn(["Manager", "Waiter", "Chef", "Kitchen", "Bartender"])
        .withMessage("Invalid role"),

    body('Branch')
        .isMongoId()
        .withMessage("Invalid Branch id"),

    validatorsMiddleware,
];


exports.updateStaffValiadtors = [
    param('id').isMongoId().withMessage('Invalid Staff id'),
    validatorsMiddleware,
];

exports.deleteStaffValiadtors = [
    param('id').isMongoId().withMessage('Invalid Staff id'),
    validatorsMiddleware,
];