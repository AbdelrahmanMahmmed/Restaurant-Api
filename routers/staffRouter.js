const express = require('express');

const {
    getStaffValiadtors,
    createStaffValidators,
    updateStaffValiadtors,
    deleteStaffValiadtors
} = require('../utils/validators/StaffVailators');

const router = express.Router({mergeParams : true});

const {
    getStaff,
    getStaffs,
    UpdateStaff,
    DeleteStaff,
    createStaff
} = require('../services/staffServicers');

router
    .route('/')
    .get(getStaffs)
    .post(createStaffValidators ,createStaff);

router
    .route('/:id')
    .get(getStaffValiadtors , getStaff)
    .put(updateStaffValiadtors , UpdateStaff)
    .delete(deleteStaffValiadtors, DeleteStaff);

module.exports = router;