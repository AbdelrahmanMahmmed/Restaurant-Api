const express = require('express');
const { 
    getbranchValiadtors,
    updatebranchValiadtors,
    createbranchValidators,
    deletebranchValiadtors
} = require('../utils/validators/BranchVailators');


const OrdersRoute = require('../routers/OrdersRouter');
const staffRoute = require('../routers/staffRouter');
const tableRoute = require('../routers/TableRouter');
const ComplierRouter = require('../routers/ComplierRouter');
const reservationRouter = require('../routers/reservationRouter');
const BillingRouter = require('../routers/BillingRouter');
const suppliersRouter= require('../routers/SuppliesRouter.js');
const router = express.Router();


router.use('/:branchId/Orders' , OrdersRoute);

router.use('/:branchId/staffs' , staffRoute);

router.use('/:branchId/Tables' , tableRoute);

router.use('/:branchId/Compliers' , ComplierRouter);

router.use('/:branchId/reservations' , reservationRouter);

router.use('/:branchId/billing' , BillingRouter);

router.use('/:branchId/suppliers' , suppliersRouter);


const {
    getBranch,
    getBranchs,
    UpdateBranch,
    DeleteBranch,
    createBranch
} = require('../services/BranchServices');

router
    .route('/')
    .get(getBranchs)
    .post(createbranchValidators , createBranch);

router
    .route('/:id')
    .get(getbranchValiadtors , getBranch)
    .put(updatebranchValiadtors ,UpdateBranch)
    .delete(deletebranchValiadtors , DeleteBranch);

module.exports = router;