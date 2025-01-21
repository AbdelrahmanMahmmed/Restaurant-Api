const express = require('express');
const { 
    getItemValiadtors , 
    updateItemValiadtors ,
    createItemValidators , 
    deleteItemValiadtors
} = require('../utils/validators/ItemsVailadator');

const MenuRoute = require('../routers/MenuRouter');

const router = express.Router();


router.use('/:itemId/menus' , MenuRoute);


const {
    createItems,
    getItems,
    getItem,
    Deleteitem,
    UpdateItem,
} = require('../services/ItemsServices');

router
    .route('/')
    .get(getItems)
    .post(createItemValidators , createItems);

router
    .route('/:id')
    .get(getItemValiadtors ,getItem)
    .put(updateItemValiadtors , UpdateItem)
    .delete(deleteItemValiadtors , Deleteitem);

module.exports = router;