const mongoose = require("mongoose");

const ItemsSchema = new mongoose.Schema({
    nameItem: {
        type: String,
        required: [true, "Item Required"],
        unique: [true, "Item must be Unique"],
        minlength: [3, "Too short Item name"],
        maxlength: [32, "Too long Item name"],
    },
    descriptionItem: {
        type: String,
        required: [true, "Description Required"],
        minlength: [10, "Too short Description"],
        maxlength: [500, "Too long Description"],
    },
    slugItem: {
        type: String,
        lowercase: true,
    },
    NumberOfItems: {
        type: Number,
        default: 0
    },
    imageItem: String,

}, { timestamps: true });
const ITEM = mongoose.model('Item', ItemsSchema);

module.exports = ITEM;