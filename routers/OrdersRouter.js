const express = require('express');
const {
    getOrderValiadtors,
    updateOrderValiadtors,
    deleteOrderValiadtors,
    createOrderValidators
} = require('../utils/validators/ordersVailators');

const ReviewRouter = require('../routers/reviewRouter');

const router = express.Router({ mergeParams: true });

router.use('/:OrderId/reviews', ReviewRouter);

const {
    getOrder,
    getOrders,
    createOrder,
    UpdateOrder,
    DeleteOrder
} = require('../services/ordersServices');

router
    .route('/')
    .get(getOrders)
    .post(createOrderValidators, createOrder);

router
    .route('/:id')
    .get(getOrderValiadtors, getOrder)
    .put(updateOrderValiadtors, UpdateOrder)
    .delete(deleteOrderValiadtors, DeleteOrder);

module.exports = router;