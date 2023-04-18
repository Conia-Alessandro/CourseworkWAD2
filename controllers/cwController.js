//TODO get data from Static DB
const userDAO = require('../models/userModel');
//new instance of guestbook db
const db = new userDAO();
const path = require('path'); //path dependency, __dirname
const companyName = "TrackFriend";
const pub = path.join(__dirname,'public'); // public dir

exports.landing_page = function(req,res){
    db.init(); //Initiate DB as the first thing
    //res.redirect("../public/index.html"); //TODO change to a better looking page, currently this doesn't work
    //res.sendFile(`C:\\Users\\39328\\Desktop\\WAD2\\CourseworkWAD2\\public\\index.html`);
    //res.sendFile(path.join(__dirname,"..","public","index.html"));
    res.render('welcome', {
        'title': 'Home',
        'company_name': companyName 
    });
}
exports.about_us = function(req,res){
    res.render('aboutUs',{
        'title': 'About Us',
        'company_name':companyName
    })
}
exports.show_users = function(req,res){
    db.getAllUsers();
    /*
    TODO implement mustache or Handlebars
    .then((list) =>{
        res.render('users' , {
            'title': 'All System Users',
            'users': list
        });
    })
    .catch((err) =>{
        console.log("promise rejected",err);
    });
    */
}
exports.new_user = function(req,res){
    res.render('user/register',{
        'title': 'Register',
        'company_name': companyName 
    })
}
exports.existing_user = function(req,res){
    res.render('user/login',{
        'title': 'Login',
        'company_name': companyName 
    })
}
exports.dashboard = function (req,res){
    res.send("<h1>dashboard for logged in user, to be implemented</h1>");
}
exports.goal_page = function(req,res){
    res.send("<h1>goals page to be implemented</h1>");
}
exports.achievements = function(req,res){
    res.send("<h1>goals page to be implemented</h1>");
}
exports.faq = function(req,res){
    res.send("<h1>faq to be implemented</h1>");
}
