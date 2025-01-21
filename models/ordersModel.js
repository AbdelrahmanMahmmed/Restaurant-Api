const mongoose = require("mongoose");

const OrdersSchema = new mongoose.Schema({
    CustomerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },
    Menus : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Menu',
        required: true,
        quantity : Number,
    }],
    totalPrice: {
        type: Number,
        default: 0
    },
    orderStatus: {
        type: String,
        enum: ["Pending", "Confirmed", "Cancelled", "Completed"],
        default: "Pending"
    }

}, { timestamps: true });


const Order = mongoose.model('Order', OrdersSchema);

module.exports = Order;