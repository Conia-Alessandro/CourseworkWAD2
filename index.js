const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json()); //might be removed
app.use(bodyParser.urlencoded({ extended: false }));
const port = process.env.port || 3001; //the environment port
const compileSass = require('compile-sass');
const favicon = require('serve-favicon');
const { compileSassAndSaveMultiple } = require('compile-sass'); // CommonJS
//TODO nedb requirement
const path = require('path'); //path dependency, __dirname
const node_modules_dir = path.join(__dirname,'node_modules');
const pub = path.join(__dirname,'public'); // public dir
//favicon issue
app.use(favicon(path.join(__dirname,'public','images','phone_icon.ico')));
//link to bootstrap
app.use('/css', express.static(path.join(node_modules_dir,'bootstrap','dist','css'))); 

app.use('/style',express.static(path.join(pub,"style")));
app.use('/images',express.static(path.join(pub,"images")));  //use this for images
app.use('/icons',express.static(path.join(pub,"images","icons")));
//modify the .env file
require('dotenv').config()
//cookie parser for security
const cookieParser = require('cookie-parser')
app.use(cookieParser())

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