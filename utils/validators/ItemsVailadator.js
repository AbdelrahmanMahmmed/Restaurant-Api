
const { param , body } = require('express-validator');
const validatorsMiddleware = require('../../middleware/validatormiddleware');

exports.getItemValiadtors = [
    param('id').isMongoId().withMessage('Invalid Item id'),
    validatorsMiddleware,
];


exports.createItemValidators = [
    body('nameItem')
        .notEmpty()
        .withMessage("Item Required")
        .isLength({ min: 3 })
        .withMessage("Too short Item name")
        .isLength({ max: 32 })
        .withMessage("Too long Item name"),
    
    body('descriptionItem')
        .notEmpty()
        .withMessage("Item Required")
        .isLength({ min: 10 })
        .withMessage("Too short Item name")
        .isLength({ max: 500 })
        .withMessage("Too long Item name"),
    validatorsMiddleware,
];


exports.updateItemValiadtors = [
    param('id').isMongoId().withMessage('Invalid Item id'),
    validatorsMiddleware,
];

exports.deleteItemValiadtors = [
    param('id').isMongoId().withMessage('Invalid Item id'),
    validatorsMiddleware,
];