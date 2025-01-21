const express = require('express');
const { 
    getTableValiadtors , 
    updateTableValiadtors ,
    createTableValidators , 
    deleteTableValiadtors
} = require('../utils/validators/TableVailators');

const router = express.Router({mergeParams : true});

const {
    getTables,
    createTable,
    getTable,
    UpdateTable,
    DeleteTable,
} = require('../services/TableServices');

router
    .route('/')
    .get(getTables)
    .post(createTableValidators ,createTable);

router
    .route('/:id')
    .get(getTableValiadtors , getTable)
    .put(updateTableValiadtors , UpdateTable)
    .delete(deleteTableValiadtors , DeleteTable);

module.exports = router;