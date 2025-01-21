const mongoose = require("mongoose");
const Item = require('./ItemsModel');
const MenuSchema = new mongoose.Schema({
    nameMenu: {
        type: String,
        required: [true, "Menu Required"],
        unique: [true, "Menu must be Unique"],
        minlength: [3, "Too short Menu name"],
        maxlength: [32, "Too long Menu name"],
    },
    descriptionMenu: {
        type: String,
        required: [true, "Description Required"],
        minlength: [10, "Too short Description"],
        maxlength: [500, "Too long Description"],
    },
    slugMenu: {
        type: String,
        lowercase: true,
    },
    priceMenu: {
        type: Number,
        required: [true, "Price Required"],
        min: [1, "Price must be greater than 0"],
        max: [1000, "Price must be less than 1000"]
    },
    item: [{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item'
    }],
    imageMenu: String,

}, { timestamps: true });

const MENU = mongoose.model('Menu', MenuSchema);

module.exports = MENU;