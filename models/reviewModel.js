const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
    Rating: {
        type: String,
        required: [true, "Rating Required"],
        enum: ["1", "2", "3", "4", "5"],
    },
    ReviewText: {
        type: String,
        required: [true, "Review Text Required"],
        minlength: [10, "Too short Review Text"],
        maxlength: [500, "Too long Review Text"],
    },
    CustomerID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
    },
    Date: {
        type: Date,
        default: Date.now,
    },
    OrderID: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
    }],

}, { timestamps: true });

const Review = mongoose.model('Review', ReviewSchema);

module.exports = Review;