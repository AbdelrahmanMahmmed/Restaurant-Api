const mongoose = require("mongoose");
const OfferSchema = new mongoose.Schema({
    MenuID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Menu',
        required: true,
        unique: true
    },
    Discountpercentage: {
        type: Number,
        required: [true, "Discount Percentage Required"],
        min: [1, "Discount Percentage must be greater than 0"],
        max: [100, "Discount Percentage must be less than 100"]
    },
    startDate: {
        type: Date,
        required: [true, "Start Date Required"],
        default: Date.now
    },
    StatusOffer :{
        type: String,
        enum: ["Active", "Inactive"],
        default: "Active"
    }
}, { timestamps: true });

const Offer = mongoose.model('Offer', OfferSchema);

module.exports = Offer;