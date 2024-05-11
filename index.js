const express = require('express');
const router = require('./routes/route');
const env = require('dotenv').config();
const port = 8080;

const app = express();


// Middleware
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}))

// Routes
app.use('/api',router);

app.listen(port,(err)=>{
    if(err){
        console.error(err);
    }else{
        console.log(`Server is running on port ${port}`);
    }
})