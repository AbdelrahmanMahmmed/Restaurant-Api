const express = require('express');
const {
    getReservationValiadtors,
    createReservationValidators,
    updateReservationValiadtors,
    deleteReservationValiadtors,
} = require('../utils/validators/ReservationVailators');



// const OrdersRoute = require('../routers/OrdersRouter');

const router = express.Router({mergeParams : true});


// router.use('/:ReservationId/Orders' , OrdersRoute);


const {
    getReservation,
    getReservations,
    createReservation,
    UpdateReservation,
    DeleteReservation,
} = require('../services/reservationServices');

router
    .route('/')
    .get(getReservations)
    .post(createReservationValidators , createReservation);

router
    .route('/:id')
    .get(getReservationValiadtors , getReservation)
    .put(updateReservationValiadtors ,UpdateReservation)
    .delete(deleteReservationValiadtors , DeleteReservation);

module.exports = router;