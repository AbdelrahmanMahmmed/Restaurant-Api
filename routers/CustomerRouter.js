const express = require('express');
const {
    getCustomerValiadtors,
    createCustomerValidators,
    updateCustomerValiadtors,
    deleteCustomerValiadtors,
} = require('../utils/validators/CustomerVailators');



const OrdersRoute = require('../routers/OrdersRouter');

const ComplierRouter = require('../routers/ComplierRouter');

const BillingRouter = require('../routers/BillingRouter');

const router = express.Router();


router.use('/:CustomerId/Orders' , OrdersRoute);

router.use('/:CustomerId/Compliers' , ComplierRouter);

router.use('/:CustomerID/Billing' , BillingRouter);


const {
    getCustomer,
    getCustomers,
    createCustomer,
    UpdateCustomer,
    DeleteCustomer,
} = require('../services/CustomerServices');

router
    .route('/')
    .get(getCustomers)
    .post(createCustomerValidators , createCustomer);

router
    .route('/:id')
    .get(getCustomerValiadtors , getCustomer)
    .put(updateCustomerValiadtors ,UpdateCustomer)
    .delete(deleteCustomerValiadtors , DeleteCustomer);

module.exports = router;