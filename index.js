const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
const port = process.env.port || 3001; //the enviroment port
//TODO nedb requirement
const path = require('path'); //path dependency, __dirname
const node_modules_dir = path.join(__dirname,'node_modules');
const pub = path.join(__dirname,'public'); // public dir

//link to bootstrap
app.use('/css', express.static(path.join(node_modules_dir,'bootstrap','dist','css'))); 

const fs = require('fs'); // File system dependency
//Mustache dependency
const mustache = require('mustache-express');
app.engine('mustache', mustache());
app.set('view engine', 'mustache');

const router = require('./routes/cwRoutes'); //router for the Routes
//direct / routes
app.use('/',router);
//starting the application
app.listen(port, ()=>{
    console.log(`started on port ${port}, press CTRL+C to close`);
})