const mongoose = require("mongoose");

const CustomerSchema = new mongoose.Schema({
    nameCustomer: {
        type: String,
        required: [true, "Customer Required"],
        unique: [true, "Customer must be Unique"],
        minlength: [3, "Too short Customer name"],
        maxlength: [32, "Too long Customer name"],
    },
    addressCustomer: {
        type: String,
        required: [true, "Description Required"],
        minlength: [10, "Too short Description"],
        maxlength: [500, "Too long Description"],
    },
    slugCustomer: {
        type: String,
        lowercase: true,
    },
    PhoneNumberCustomer: {
        type: String,
    },
    // Order: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Order',
    // }],

}, { timestamps: true });
const Customer = mongoose.model('Customer', CustomerSchema);

module.exports = Customer;