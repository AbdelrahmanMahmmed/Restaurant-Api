const express = require('express');
const { 
    getComplierValiadtors , 
    updateComplierValiadtors ,
    createComplierValidators , 
    deleteComplierValiadtors
} = require('../utils/validators/ComplierVailators');

const router = express.Router({mergeParams : true});

const {
    getCompliers,
    createComplier,
    getComplier,
    UpdateComplier,
    DeleteComplier,
} = require('../services/ComplierServices');

router
    .route('/')
    .get(getCompliers)
    .post(createComplierValidators ,createComplier);

router
    .route('/:id')
    .get(getComplierValiadtors , getComplier)
    .put(updateComplierValiadtors , UpdateComplier)
    .delete(deleteComplierValiadtors , DeleteComplier);

module.exports = router;