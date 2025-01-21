const express = require('express');
const { 
    getOfferValiadtors , 
    updateOfferValiadtors ,
    createOfferValidators , 
    deleteOfferValiadtors
} = require('../utils/validators/OfferVailators');

const router = express.Router();

const {
    getOffer,
    getOffers,
    UpdateOffer,
    createOffer,
    DeleteOffer
} = require('../services/OfferServices');

router
    .route('/')
    .get(getOffers)
    .post(createOfferValidators , createOffer);

router
    .route('/:id')
    .get(getOfferValiadtors , getOffer)
    .put(updateOfferValiadtors , UpdateOffer)
    .delete(deleteOfferValiadtors , DeleteOffer);

module.exports = router;