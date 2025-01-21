const mongoose = require("mongoose");
const branch = require('./BranchModel');

const staffSchema = new mongoose.Schema({
    namestaff: {
        type: String,
        required: [true, "staff Required"],
        unique: [true, "staff must be Unique"],
        minlength: [3, "Too short staff name"],
        maxlength: [32, "Too long staff name"],
    },
    addressstaff: {
        type: String,
        required: [true, "Description Required"],
        minlength: [10, "Too short Description"],
        maxlength: [500, "Too long Description"],
    },
    slugstaff: {
        type: String,
        lowercase: true,
    },
    PhoneNumberstaff: {
        type: String,
    },
    Salayingstaff: {
        type: Number,
        required: [true, "Price Required"],
        min: [500, "Price must be greater than 0"],
        max: [3500, "Price must be less than 1000"]
    },
    rolestaff: {
        type: String,
        required: [true, "Role Required"],
        enum: ["Manager", "Waiter", "Chef", "Kitchen", "Bartender"],
    },
    Branch :{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'branch'
    },
    imagestaff: String,

}, { timestamps: true });
const staff = mongoose.model('staff', staffSchema);

module.exports = staff;