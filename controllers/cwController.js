//TODO get data from Static DB
const userDAO = require('../models/userModel');
//new instance of guestbook db
const path = require('path'); //path dependency, __dirname
const db = new userDAO (path.join(__dirname,'..','databases','users.db'));
const companyName = "TrackFriend";
const pub = path.join(__dirname,'public'); // public dir
const bodyParser = require('body-parser');
const {getUser} = require("../auth/auth");

exports.landing_page = function(req,res){
    //db.init(); //Initiate DB as the first thing, not needed anymore
    //res.redirect("../public/index.html"); //TODO change to a better looking page, currently this doesn't work
    //res.sendFile(`C:\\Users\\39328\\Desktop\\WAD2\\CourseworkWAD2\\public\\index.html`);
    //res.sendFile(path.join(__dirname,"..","public","index.html"));
    res.render('welcome', {
        'title': 'Home',
        'company_name': companyName,
        'user':req.username
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
//get for register page, gets here when trying to register a new account
exports.new_user = function(req,res){
    res.render('user/register',{
        'title': 'Register',
        'company_name': companyName 
    })
}

function containsNumber(str){
    return /\d/.test(str);
}
function containsSpecial(str){
    return /[!-_.]/.test(str);
}
exports.validate_fields = function(req,res){
    let user_name = req.body.username;
    let password1 = req.body.password;
    let password2 = req.body.password2;
    if (password1 != password2){
        return res.render('user/register',{
            'title': 'Register',
            'company_name': companyName,
            'password_error': "Passwords have to match!"
        })
    }
    // no numbers in string provided
    if(!containsNumber(password1)|| !containsNumber(password2)){
        return res.render('user/register',{
            'title': 'Register',
            'company_name': companyName,
            'password_error': "Passwords have to contain at least a number"
        })

    }
    // no special character provided
    if(!containsSpecial(password1) ||!containsSpecial(password2)){
        return res.render('user/register',{
            'title': 'Register',
            'company_name': companyName,
            'password_error': "Passwords have to contain at least 1 special character"
        })
    }else{
        
        if(String(password1) == String(password2)){
            console.log("passwords match");
          
            db.lookup(user_name, function (err, u) { //was userDao
            if (u) {
                return res.render('user/register',{
                    'title': 'Register',
                    'company_name': companyName,
                    'user_name_error': "Username already exists, please log in instead"
                })
            } else {
                console.log("creating user: ");
                db.create(user_name, password1); //was userDao
                console.log("registered", user_name, "with password", password1);
                res.redirect("/registered");
                //next(); // this implies ->user created -> verify -> dashboard
            }
            })
            
        }
    }
  
    

}
//post for the register page, after validation off fields
exports.post_register = function (req,res){
    //register has succeeded
    console.log("post register");

    //might need to ask for further data (weight for instance)
    res.redirect("/dashboard");
}
//get for the login page , gets redirected here when not logged in
exports.existing_user = function(req,res){
    res.render('user/login',{
        'title': 'Login',
        'company_name': companyName 
    })
}
//post for login page, gets here when trying to login
exports.post_login = function(req,res){
    //login has succeeded
    res.redirect("/dashboard");
}
//landing in dashboard after login POST 
exports.dashboard = function (req,res){
console.log("username: ",req.username);

res.render("user/pages/dashboard",{
                'title':'profile Dashboard',
                'company_name': companyName,
                'user': req.username,
                'user_name':req.username
})
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
exports.handle_logout = function(req,res){
    /*
    req.logout(function(err) {
        if (err) { res.send(401, 'Error found in logging out'); }
        res.redirect('/');
      });
    */
    res.clearCookie("jwt")
      .status(200)
      .redirect("/");
}