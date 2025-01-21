const express = require('express');
const { 
    getSupplierValiadtors , 
    updateSupplierValiadtors ,
    createSupplierValidators , 
    deleteSupplierValiadtors
} = require('../utils/validators/SuppliesVailators');

const router = express.Router({mergeParams : true});

const {
    getSuppliers,
    createSupplier,
    getSupplier,
    UpdateSupplier,
    DeleteSupplier,
} = require('../services/SupplierServices');

router
    .route('/')
    .get(getSuppliers)
    .post(createSupplierValidators ,createSupplier);

router
    .route('/:id')
    .get(getSupplierValiadtors , getSupplier)
    .put(updateSupplierValiadtors , UpdateSupplier)
    .delete(deleteSupplierValiadtors , DeleteSupplier);

module.exports = router;