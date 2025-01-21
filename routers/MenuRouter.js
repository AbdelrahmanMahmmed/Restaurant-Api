const express = require('express');
const { 
    getMenuValiadtors , 
    updateMenuValiadtors ,
    createMenuValidators , 
    deleteMenuValiadtors
} = require('../utils/validators/MenuVailators');

const router = express.Router({mergeParams : true});

const {
    getMenus,
    createMenu,
    getMenu,
    UpdateMenu,
    DeleteMenu,
    sendMenuToBody
} = require('../services/MenuServices');

router
    .route('/')
    .get(getMenus)
    .post(sendMenuToBody, createMenuValidators ,createMenu);

router
    .route('/:id')
    .get(getMenuValiadtors , getMenu)
    .put(updateMenuValiadtors , UpdateMenu)
    .delete(deleteMenuValiadtors , DeleteMenu);

module.exports = router;