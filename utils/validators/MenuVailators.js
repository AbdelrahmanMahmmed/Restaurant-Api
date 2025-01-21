
const { param, body } = require('express-validator');
const validatorsMiddleware = require('../../middleware/validatormiddleware');
const Item = require('../../models/ItemsModel')

exports.getMenuValiadtors = [
    param('id').isMongoId().withMessage('Invalid Menu id'),
    validatorsMiddleware,
];


exports.createMenuValidators = [
    body('nameMenu')
        .notEmpty()
        .withMessage("Menu Required")
        .isLength({ min: 3 })
        .withMessage("Too short Menu name")
        .isLength({ max: 32 })
        .withMessage("Too long Menu name"),

    body('descriptionMenu')
        .notEmpty()
        .withMessage("Menu Required")
        .isLength({ min: 10 })
        .withMessage("Too short Menu name")
        .isLength({ max: 500 })
        .withMessage("Too long Menu name"),

    body('priceMenu')
        .isNumeric()
        .withMessage("Price must be a number"),

    body('item')
        .isMongoId()
        .withMessage("Invalid Item id")
        .custom((ItemId) =>
            Item.findById(ItemId).then((ITEM) => {
                if (!ITEM) {
                    return Promise.reject(
                        new Error(`No Item for this id: ${ItemId}`)
                    );
                }
            })
        ),
    validatorsMiddleware,
];


exports.updateMenuValiadtors = [
    param('id').isMongoId().withMessage('Invalid Menu id'),
    validatorsMiddleware,
];

exports.deleteMenuValiadtors = [
    param('id').isMongoId().withMessage('Invalid Menu id'),
    validatorsMiddleware,
];