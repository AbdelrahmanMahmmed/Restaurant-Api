const express = require('express');
const app = express();
const dotenv = require("dotenv");
const morgan = require('morgan');
const PORT = process.env.PORT || 8000 ;

// Load env variables
dotenv.config({ path: 'config.env' })

// Error Handler
const ApiError = require('./utils/APIError.js');
const globalError = require('./middleware/errormiddleware.js');


// Middleware
app.use(express.json());
if (process.env.NODE_ENV == "development") {
    app.use(morgan("dev"));
    console.log(process.env.NODE_ENV);
}


// Import Routes
const ItemsRouter = require('./routers/ItemsRouter');
const MenuRouter = require('./routers/MenuRouter.js');
const BranchRouter = require('./routers/BranchRouter.js');
const StaffRouter = require('./routers/staffRouter.js');
const orderRouter = require('./routers/OrdersRouter.js');
const CustomerRouter = require('./routers/CustomerRouter.js');
const ReviewRouter = require('./routers/reviewRouter.js');
const OfferRouter = require('./routers/OfferRouter.js');
const TableRouter = require('./routers/TableRouter.js');
const reservationRouter = require('./routers/reservationRouter.js');
const complierRouter = require('./routers/ComplierRouter.js');
const BillingRouter = require('./routers/BillingRouter.js');
const SuppliesRouter = require('./routers/SuppliesRouter.js');


// Connection to DataBase
const DBconnection = require('./config/dbconnection');
DBconnection();


// Router
app.use('/api/v1/Items', ItemsRouter);
app.use('/api/v1/Menus', MenuRouter);
app.use('/api/v1/Branchs', BranchRouter);
app.use('/api/v1/Staffs', StaffRouter);
app.use('/api/v1/Orders', orderRouter);
app.use('/api/v1/Customers', CustomerRouter);
app.use('/api/v1/Reviews', ReviewRouter);
app.use('/api/v1/Offers', OfferRouter);
app.use('/api/v1/Tables', TableRouter);
app.use('/api/v1/Reservation', reservationRouter);
app.use('/api/v1/Compliers', complierRouter);
app.use('/api/v1/Billing', BillingRouter);
app.use('/api/v1/Supplies', SuppliesRouter);

// Error handling middleware on Express
app.all('*' , (req , res, next) =>{
    next(new ApiError(`This is the err No route ${req.originalUrl}` , 400));
});

// Error handling middleware globally  (it will be called in case of any error)
app.use(globalError);

// Start server  (app.listen)
app.listen(PORT , (req, res) => {
    console.log(`Server is running on port ${PORT}`);
});

// Unhandled rejections
process.on('unhandledRejection' , (err) =>{
    console.error(`unhandledRejection ${err.name} | ${err.message}`);
    server(()=>{
        process.exit(1);
    })
});