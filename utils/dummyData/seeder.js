const fs = require('fs');
require('colors');
const dotenv = require('dotenv');
const Items = require('../../models/ItemsModel');
const dbConnection = require('../../config/dbconnection');

dotenv.config({ path: '../../config.env' });

// connect to DB
dbConnection();

// Read data
const ITEMS = JSON.parse(fs.readFileSync('./items.json'));


// Insert data into DB
const insertData = async () => {
    try {
        await Items.create(ITEMS);

        console.log('Data Inserted'.green.inverse);
        process.exit();
    } catch (error) {
        console.log(error);
    }
};

// Delete data from DB
const destroyData = async () => {
    try {
        await Items.deleteMany();
        console.log('Data Destroyed'.red.inverse);
        process.exit();
    } catch (error) {
        console.log(error);
    }
};

// node seeder.js -d
if (process.argv[2] === '-i') {
    insertData();
} else if (process.argv[2] === '-d') {
    destroyData();
}
