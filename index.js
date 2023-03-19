const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
const port = process.env.port || 3001; //the enviroment port
//TODO nedb requirement
const path = require('path'); //path dependency, __dirname
const public = path.join(__dirname,'public'); // public dir
const fs = require('fs'); // File system dependency
//TODO mustache or handlebars requirement
const router = require('./routes/cwRoutes'); //router for the Routes
//direct / routes
app.use('/',router);
//starting the application
app.listen(port, ()=>{
    console.log(`started on port ${port}, press CTRL+C to close`);
})