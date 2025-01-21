const express = require('express');
const {
    getBillingValiadtors,
    createBillingValidators,
    updateBillingValiadtors,
    deleteBillingValiadtors,
} = require('../utils/validators/BillingVailadtors');


const router = express.Router({ mergeParams: true });

const {
    getBilling,
    getBillings,
    createBillings,
    UpdateBilling,
    DeleteBilling,
} = require('../services/BillingServices');

router
    .route('/')
    .get(getBillings)
    .post(createBillingValidators , createBillings);

router
    .route('/:id')
    .get(getBillingValiadtors , getBilling)
    .put(updateBillingValiadtors ,UpdateBilling)
    .delete(deleteBillingValiadtors , DeleteBilling);

module.exports = router;