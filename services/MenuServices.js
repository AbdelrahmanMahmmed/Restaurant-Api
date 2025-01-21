const { json } = require('express');
const Menu = require('../models/MenuModel');
const ApiError = require('../utils/apiError');
const asyncHandler = require('express-async-handler')
const slugify = require('slugify');



// @desc   Find Menu in Only Item
// @router Get   api/v1/Item/:ItemId/menus
// @router Post   api/v1/Item/:ItemId/menus
// @access   Public

exports.sendMenuToBody = (req, res, next) => {
    if (!req.body.item) req.body.item = req.params.itemId;
    next();
}


// @desc   Find Menu
// @router Get   api/v1/Menu
// @access   Public

exports.getMenus = asyncHandler(async (req, res) => {

    let filter = {};
    if(req.params.itemId) {
        filter = { item: req.params.itemId }
    }

    const MENU = await Menu.find(filter).populate({
        path: 'item',
        select: 'nameItem -_id '
    });
    res.status(200).json({ results: MENU.length, data: MENU });
});

// @desc   Get Menu By Id
// @router Get   api/v1/Menu/:id
// @access   Public

exports.getMenu = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const MENU = await Menu.findById(id).populate({
        path: 'item',
        select: 'nameItem -_id'
    });
    if (!MENU) { return next(new ApiError(`No MENU for this id :  ${id}`, 404)) };
    res.status(200).json({ data: MENU });
})


// @desc   Update   Categorey By Id
// @router PUT      api/v1/Categories/:id
// @access          Private

exports.UpdateMenu = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { nameMenu, descriptionMenu, priceMenu, item } = req.body;

    const MENU = await Menu.findByIdAndUpdate(
        { _id: id },
        {
            nameMenu,
            slugMenu: slugify(nameMenu),
            descriptionMenu,
            priceMenu,
            item,
        },
        { new: true }
    );
    if (!MENU) { return next(new ApiError(`No MENU for this id :  ${id}`, 404)) };
    res.status(200).json({ data: MENU });
})



// @desc   Delete   Categorey By Id
// @router Delete   api/v1/Categories/:id
// @access          Private

exports.DeleteMenu = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const MENU = await Menu.findByIdAndDelete(id);
    if (!MENU) { return next(new ApiError(`No MENU for this id :  ${id}`, 404)) };
    res.status(200).json({ data: MENU });
})



// @desc     Create   Menu
// @router   Post     api/v1/Menu
// @access            Private

exports.createMenu = asyncHandler(async (req, res) => {
    const { nameMenu, descriptionMenu, priceMenu, item } = req.body;
    const MENU = await Menu.create({
        nameMenu,
        descriptionMenu,
        priceMenu,
        item,
        slugMenu: slugify(nameMenu)
    });
    res.status(201).json({ data: MENU });
});