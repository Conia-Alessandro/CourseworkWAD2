const express = require('express');
const app = express();
const port = process.env.port || 3001; //the enviroment port
//TODO nedb requirement
//TODO path requirement
//TODO mustache or handlebars requirement
//TODO Router with path
var n_achievements_mock = 6; //TODO replace with nedb field counting the number of achievements
app.get("/", function(req,res){
    res.status(200);//good code
    res.send("<h1>landing page mock</h1>");
    console.log("you are in the yet to implement, landing page.");
})
app.get("/about",function(req,res){
    res.send("<h1>about page mock</h1>");
    console.log("you are in the about page, yet to implement");
})
app.get("/register",function(req,res){
    res.send("<h1>register page mock</h1>");
    //TODO form gets rendered in a page here
    console.log("you are in the register page, yet to implement");
})
app.get("/login",function(req,res){
    res.send("<h1>login page mock</h1>");
    //TODO login form gets rendered in a page here
    console.log("you are in the login page, yet to implement");
})
app.get("/goals",function(req,res){
    res.send("<h1>Goals page mock</h1>");
    //TODO requires to be logged in, aka check if the user has been created.
})
app.get("/achievements",function(req,res){
    res.write("<h1>Here's your achievements</h1>");
    //TODO requires being logged in
    //displays Achievements
    for(let i= 0; i<n_achievements_mock ; i++){
        res.write(`<h2>achievement ${i}</h2>`);
    }
    res.end();
   
})
//wrong routes
app.get('*', function(req, res){
    //res.render('/public/404.html'); Implemented after PATH
    res.send('error bad route', 404);
});
//starting the application
app.listen(port, ()=>{
    console.log(`started on port ${port}, press CTRL+C to close`);
})