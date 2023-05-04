//TODO get data from Static DB
const userDAO = require('../models/userModel');
const goalsDAO = require('../models/objectivesModel');
//new instance of guestbook db
const path = require('path'); //path dependency, __dirname
const db = new userDAO(path.join(__dirname, '..', 'databases', 'users.db'));
const goals_db = new goalsDAO(path.join(__dirname,'..','databases','goals.db'));
const companyName = "TrackFriend";
const pub = path.join(__dirname, 'public'); // public dir
const bodyParser = require('body-parser');
const { getUser } = require("../auth/auth");

var steps_entries;
var sleep_entries;
var health_entries;

function saveVariable(type,entries){
    if(type == "steps"){
        steps_entries = entries;
    }
    if(type == "sleep"){
        sleep_entries = entries;
    }
    if(type == "health"){
        health_entries = entries;
    }
}

exports.landing_page = function (req, res) {
    //db.init(); //Initiate DB as the first thing, not needed anymore
    //res.redirect("../public/index.html"); //TODO change to a better looking page, currently this doesn't work
    //res.sendFile(`C:\\Users\\39328\\Desktop\\WAD2\\CourseworkWAD2\\public\\index.html`);
    //res.sendFile(path.join(__dirname,"..","public","index.html"));
    res.render('welcome', {
        'title': 'Home',
        'company_name': companyName,
        'user': req.username
    });
}
exports.about_us = function (req, res) {
    res.render('aboutUs', {
        'title': 'About Us',
        'company_name': companyName
    })
}
exports.show_users = function (req, res) {
    db.getAllUsers();
    
}
//get for register page, gets here when trying to register a new account
exports.new_user = function (req, res) {
    res.render('user/register', {
        'title': 'Register',
        'company_name': companyName
    })
}

function containsNumber(str) {
    return /\d/.test(str);
}
function containsSpecial(str) {
    return /[!-_.]/.test(str);
}
exports.validate_fields = function (req, res) {
    let user_name = req.body.username;
    let password1 = req.body.password;
    let password2 = req.body.password2;
    if (password1 != password2) {
        return res.render('user/register', {
            'title': 'Register',
            'company_name': companyName,
            'password_error': "Passwords have to match!"
        })
    }
    // no numbers in string provided
    if (!containsNumber(password1) || !containsNumber(password2)) {
        return res.render('user/register', {
            'title': 'Register',
            'company_name': companyName,
            'password_error': "Passwords have to contain at least a number"
        })

    }
    // no special character provided
    if (!containsSpecial(password1) || !containsSpecial(password2)) {
        return res.render('user/register', {
            'title': 'Register',
            'company_name': companyName,
            'password_error': "Passwords have to contain at least 1 special character"
        })
    } else {

        if (String(password1) == String(password2)) {
            console.log("passwords match");

            db.lookup(user_name, function (err, u) { //was userDao
                if (u) {
                    return res.render('user/register', {
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
exports.post_register = function (req, res) {
    //register has succeeded
    console.log("post register");

    //might need to ask for further data (weight for instance)
    res.redirect("/dashboard");
}
//get for the login page , gets redirected here when not logged in
exports.existing_user = function (req, res) {
    res.render('user/login', {
        'title': 'Login',
        'company_name': companyName
    })
}
//post for login page, gets here when trying to login
exports.post_login = function (req, res) {
    //login has succeeded
    res.redirect("/dashboard");
}
//get the name of the day 
function getDayName(dateStr, locale) {
    var date = new Date(dateStr);
    return date.toLocaleDateString(locale, { weekday: 'long' });
}

//landing in dashboard after login POST 
exports.dashboard = function (req, res) {
    //goals_db.init(); //only once for testing
    console.log("username: ", req.username);

    // Date object
    const date = new Date();
    let currentDay = String(date.getDate()).padStart(2, '0');
    let currentMonth = String(date.getMonth() + 1).padStart(2, "0");
    let currentYear = date.getFullYear();
    // the date will be displayed as as DD-MM-YYYY 
    let currentDate = `${currentMonth}/${currentDay}/${currentYear}`;
    let dateuk = `${currentDay}/${currentMonth}/${currentYear}`
    var day = getDayName(currentDate, "en-gb"); //could be en-uk 
    let formattedDate = `${currentYear}-${currentMonth}-${currentDay}`;
    //calls database to get the current objectives for the day, then do something with it

    goals_db.getUserObjective(req.username,formattedDate)
    .then((list) => {
        //list == entries
        res.render("user/pages/dashboard", {
            'title': 'profile Dashboard',
            'company_name': companyName,
            'user': req.username,
            'user_name': req.username,
            'todays_date': formattedDate, // dateuk
            'day_name': day,
            'goals':list
        })
    })
    .catch((err) => {
        console.log("no objectives found",err);
        res.render("user/pages/dashboard", {
            'title': 'profile Dashboard',
            'company_name': companyName,
            'user': req.username,
            'user_name': req.username,
            'todays_date': formattedDate,
            'day_name': day
        })
    });


}

exports.goal_page = function (req, res) {
    console.log("username: ", req.username);
    // Date object
    const date = new Date();
    let currentDay = String(date.getDate()).padStart(2, '0');
    let currentMonth = String(date.getMonth() + 1).padStart(2, "0");
    let currentYear = date.getFullYear();
    // the date will be displayed as as DD-MM-YYYY 
    let currentDate = `${currentMonth}/${currentDay}/${currentYear}`;
    let dateuk = `${currentDay}/${currentMonth}/${currentYear}`
    let formattedDate = `${currentYear}-${currentMonth}-${currentDay}`;
    var day = getDayName(currentDate, "en-gb"); //could be en-uk , en-gb works

    res.render("user/pages/goals", {
        'title': 'profile goal page',
        'company_name': companyName,
        'user': req.username,
        'user_name': req.username,
        'todays_date': formattedDate,
        'day_name': day
    })
}

exports.modifySpecificGoal = function (req, res) {
    console.log('Username: ', req.username);
    let username = req.username;
    let date = req.params.date; //format that the database likes
    let type = req.params.type;
    specifiedType= "type_"+type;
    console.log("date: ",date,"type: ",type);
    console.log("specified type: ",specifiedType);
    //${currentYear}-${currentMonth}-${currentDay}`;
    let dateElements = date.split("-");
    //`${currentMonth}/${currentDay}/${currentYear}`
    let currentDate = `${dateElements[1]}/${dateElements[2]}/${dateElements[0]}`; //format that the function getDayName likes
    var day = getDayName(currentDate, "en-gb"); //accessibile for other category of users (could be an addition)
    goals_db.getUserObjectiveonType(username,date,type).then(
        (entries) => {
            if(type == "steps"){
                res.render('user/pages/modifyagoal', {
                    'title': 'profile goal page',
                    'company_name': companyName,
                    'user': req.username,
                    'user_name': req.username,
                    'todays_date': date,
                    'day_name': day,
                    'type_steps': true,
                    'steps_goals':entries
    
                });
            }
            
        }).catch((err) => {
            console.log('error handling goals entries', err);
        });
}
exports.newGoalLanding = function(req,res){
    console.log('Username: ', req.username);
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    //required allowed format year-month-day
    today = yyyy + '-' + mm + '-' + dd;
    res.render('user/pages/manualnewGoal',{
        'title':'manual new goal',
        'company_name':companyName,
        'user': req.username,
        'user_name':req.username,
        'todays_date':today
    });
}
exports.newGoalLandingSpecific = function(req,res){
    console.log('Username: ', req.username);
    let username = req.username;
    let date = req.params.date; //format that the database likes
    let type = req.params.type;
    let dateElements = date.split("-");
    //`${currentMonth}/${currentDay}/${currentYear}`
    let type_name;
    //types: Wellbeing, Health, Fitness
    if(type =="steps"){
        type_name ="fitness";
    }
    if(type =="sleep"){
        type_name ="wellbeing";
    }
    if(type =="health"){
        type_name ="health";
    }
    let currentDate = `${dateElements[1]}/${dateElements[2]}/${dateElements[0]}`; //format that the function getDayName likes
    var day = getDayName(currentDate, "en-gb"); 
    res.render('user/pages/newGoal',{
        'title':'new goal',
        'company_name':companyName,
        'user': username,
        'user_name':username,
        'day_name': day,
        'todays_date': date,
        'goal_type':type,
        'goal_type_name':type_name
    });
}
exports.achievements = function (req, res) {
    res.send("<h1>achievements page to be implemented</h1>");
}
exports.faq = function (req, res) {
    res.send("<h1>faq to be implemented</h1>");
}
exports.handle_logout = function (req, res) {
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
exports.updateAGoal = function (req,res){
    res.send("<h1>update goal to be implemented</h1>");
}
/*
//remove if it doesn't work
exports.ObjectiveLanding= function (req,res){
    res.send("<h1> to be implemented</h1>");
}
exports.ObjectiveByDateLanding = function(req,res){
    res.send("<h1> to be implemented</h1>");
}
*/