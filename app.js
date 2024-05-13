const express = require('express');
const router = require('./routes/route');


const app = express();

//Middleware
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}))
//Routing
app.use(router);

module.exports = app;