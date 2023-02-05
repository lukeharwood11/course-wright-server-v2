const mongoose = require('mongoose');
require("dotenv").config();

const HOST = "localhost:27017";
const USER = "root";
const DATABASE = 'course-wright';

// TODO: account for testing/integration/production
const getUrl = () => {
    return 
}

const init = async () => {
    await mongoose.connect(`mongodb://${HOST}/${DATABASE}`);
    console.log("Mongoose listening...");
}

init().catch(err => console.log(err));