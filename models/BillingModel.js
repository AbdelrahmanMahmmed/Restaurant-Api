
const mongoose = require("mongoose");
const BillingSchema = new mongoose.Schema({
    CustomerID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: [true, "Customer ID Required"]
    },
    invoiceDate : {
        type: Date,
        required: [true, "Invoice Date Required"],
        default: Date.now
    },
    startDate: {
        type: Date,
        required: [true, "Start Date Required"],
        default: Date.now
    },
    Menus :[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Menu',
        required: [true, "Menu Required"],
        quantity : Number,
        price : Number
    }],
    totalAmount :{
        type: Number,
        required: [true, "Total Amount Required"]
    },
    branchId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'branch',
        required: [true, "Branch ID Required"]
    },
    createdBy :{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'staff',
        required: [true, "Created By Required"]
    },
    notes :{
        type: String,
        required: false,
        minlength: 5,
        maxlength: 2000
    },
    paymentStatus :{
        type: String,
        required: [true, "Payment Status Required"],
        enum: ["Unpaid", "Partially Paid", "Paid", "Cancelled"]
    },
    discount :{
        type: Number,
        required: false,
        min: 0,
        max: 100
    },
    paymentMethod : {
        type: String,
        required: [true, "Payment Method Required"],
        enum: ["Cash", "Card", "Online"]
    }
}, { timestamps: true });

const Billing = mongoose.model('Billing', BillingSchema);

module.exports = Billing;