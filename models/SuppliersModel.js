const mongoose = require("mongoose");

const SuppliersSchema = new mongoose.Schema({
    supplierName :{
        type: String,
        required: true,
        unique: false,
        minlength: 3,
        maxlength: 32
    },
    contactName :{
        type: String,
        required: true,
        minlength: 3,
        maxlength: 32
    },
    AddressSuplier :{
        type: String,
        required: true,
        minlength: 10,
        maxlength: 500
    },
    phonecontact :{
        type: String,
        required: true,
        minlength: 10,
        maxlength: 15
    },
    emailcontact :{
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
        unique: true
    },
    ItemsSupplied :{
        type: Array,
        required: true,
        default: []
    },
    BranchId :{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'branch'
    }

}, { timestamps: true });
const Supplier = mongoose.model('supplier', SuppliersSchema);

module.exports = Supplier;