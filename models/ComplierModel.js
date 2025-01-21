const mongoose = require("mongoose");
const ComplierSchema = new mongoose.Schema({
    customerId :{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },
    branchId :{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'branch',
        required: true
    },
    BodyOfComplier: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 1000
    }
}, { timestamps: true });

const Complier = mongoose.model('Complier', ComplierSchema);

module.exports = Complier;