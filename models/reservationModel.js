const mongoose = require("mongoose");
const ReservationSchema = new mongoose.Schema({
    tableId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Table',
        required: [true, "Table Required"]
    },
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: [true, "Customer Required"]
    },
    branchId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'branch',
        required: [true, "Branch Required"]
    },
    reservationTime :{
        type: Date,
        required: [true, "Reservation Time Required"]
    },
    status : {
        type: String,
        enum: ['Confirmed', 'Canceled', 'Pending'],
        default: 'Pending'
    },
    numberOfGuests : {
        type: Number,
        required: [true, "Number of Guests Required"],
        min: [1, "Number of Guests must be greater than 0"],
        max: [5, "Number of Guests must be less than 100"]
    }
}, { timestamps: true });

const Reservation = mongoose.model('Reservation', ReservationSchema);

module.exports = Reservation;