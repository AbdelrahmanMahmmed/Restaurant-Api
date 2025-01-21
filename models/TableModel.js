const mongoose = require("mongoose");
const TableSchema = new mongoose.Schema({
    tableNumber: {
        type: Number,
        required: [true, "Table Number Required"],
        unique: [true, "Table Number must be Unique"],
        min: [1, "Table Number must be greater than 0"]
    },
    capacity: {
        type: Number,
        required: [true, "Capacity Required"],
        min: [1, "Capacity must be greater than 0"],
        max: [5, "Capacity must be less than or equal to 5"]
    },
    status: {
        type: String,
        enum: ["Booked", "Waiting", "Served"],
        default: "Waiting"
    },
    branchId :{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'branch'
    }
}, { timestamps: true });

const Table = mongoose.model('Table', TableSchema);

module.exports = Table;