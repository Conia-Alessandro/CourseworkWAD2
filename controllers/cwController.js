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
    // no special character
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
async function getGoals(user,completion){
    const count = await goals_db.findGoalsCompletionNumber(user, completion);
    completedGoals = count;
    return completedGoals;
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
    let completedGoals;
    let uncompletedGoals;
    completedGoals = getGoals(req.username,true);
    uncompletedGoals = getGoals(req.username,false);
    completedGoals.then(function(result){
        console.log("completed goals: ",result);
        completedGoals = result;
    })
    uncompletedGoals.then(function(result){
        console.log("uncompleted goals: ",result);
        uncompletedGoals = result;
    })
    
    goals_db.getUserObjective(req.username,formattedDate)
    .then((list) => {
        //list == entries
        res.render("user/pages/dashboard", {
            'title': 'profile Dashboard',
            'company_name': companyName,
            'user': req.username,
            'user_name': req.username,
            'todays_date': formattedDate, // although replacable with dateuk, this works with the current database
            'day_name': day,
            'goals':list,
            'completed_goals': completedGoals,
            'uncompleted_goals': uncompletedGoals
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
            if(type == "health"){
                res.render('user/pages/modifyagoal', {
                    'title': 'profile goal page',
                    'company_name': companyName,
                    'user': req.username,
                    'user_name': req.username,
                    'todays_date': date,
                    'day_name': day,
                    'type_health': true,
                    'health_goals':entries
    
                });
            }
            if(type == "sleep"){
                res.render('user/pages/modifyagoal', {
                    'title': 'profile goal page',
                    'company_name': companyName,
                    'user': req.username,
                    'user_name': req.username,
                    'todays_date': date,
                    'day_name': day,
                    'type_sleep': true,
                    'sleeping_goals':entries
    
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

    let date = req.params.date; //format that the database likes
    let type = req.params.type;
    //required allowed format year-month-day
    today = yyyy + '-' + mm + '-' + dd;
    res.render('user/pages/manualnewGoal',{
        'title':'manual new goal',
        'company_name':companyName,
        'user': req.username,
        'user_name':req.username,
        'todays_date':today,
        'date_value':date,
        'chosenGoalType':type
    });
}
exports.createNewGoal = function(req,res){
   
    //formatting dates:
    let startDate =req.body.begin;
    let endDate = req.body.end;
    let start = new Date(startDate);
    let end = new Date(endDate);
    let diffTime = Math.abs(end.getTime() - start.getTime());
    let diffDays = diffTime / (1000 * 3600 * 24); 
    //console.log("difference in days: ",diffDays);
    let repetitive = "no";
    let repetition_option = "no";
    if(typeof req.body.repetition_option != undefined || req.body.repetition_option !="" ){
        repetitive = "yes";
        repetition_option = req.body.repetition_option;
    }
   
    if(typeof req.body.repetition_option === 'undefined' || typeof req.body.repetition_option == undefined){
        repetitive = "no";
        repetition_option = "no";
    }
   // console.log("repetitive: ",repetitive, " repetition associated: ",repetition_option);
   //create new goal!
   goals_db.addObjective(req.username,req.body.type_option,req.body.subcategory,req.body.endValueNumber,req.body.description_area,diffDays,repetitive,repetition_option,startDate,endDate);
   //res.redirect(`/goals/${startDate}/${type}`);
   res.redirect("/dashboard");
}
exports.achievements = function (req, res) {
    //goals_db.init(); //only once for testing
    console.log("achievements page username: ", req.username);
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
    //goals_db.getCompletedGoals(username: req.username, completed: true)
        res.render("user/pages/achievements", {
            'title': 'user achievements page',
            'company_name': companyName,
            'user': req.username,
            'user_name': req.username,
            'todays_date': formattedDate,
            'day_name': day
        })

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
//once the user updates a goal
exports.updateAGoal = function (req,res){
    //required to update:
    // category 
    // currentValue  
    // description
    // completed 
    let categoryName = req.body.form_category_name;
    let goalId =req.body.goalId;
    console.log("goal id: ",goalId);
    const date = new Date();
    let currentDay = String(date.getDate()).padStart(2, '0');
    let currentMonth = String(date.getMonth() + 1).padStart(2, "0");
    let currentYear = date.getFullYear();
    // the date will be displayed as as DD-MM-YYYY 
    let formattedTodaysDate = `${currentYear}-${currentMonth}-${currentDay}`;

    let checkedCompleted = req.body.completedCheck; //should give true or false
    if(checkedCompleted === 'undefined'|| checkedCompleted == undefined){
        checkedCompleted = false;
    }else{
        checkedCompleted = true;
    }
    if(categoryName == "Fitness"){
        //do fitness related update
        let newValue = req.body.currentSteps;
        console.log("modified value is ",newValue);
        let newDescription =req.body.description_area;
        console.log("other modified value is: ",newDescription);
    try{
        if(checkedCompleted == false){
            //if not completed
            goals_db.updateGoal(goalId,newValue,newDescription);
            res.redirect("/dashboard"); //if successful
        }else{
            goals_db.upgradeGoalToAchievement(goalId,newValue,newDescription,checkedCompleted,formattedTodaysDate);
            res.redirect("/dashboard"); //if successful
        }
       
       
    }catch(error){
        console.log("error while updating: ",error);
    }
        
    }
    if(categoryName == "Wellbeing"){
        //do wellbeing related update
        let newValue = req.body.currentSleep;
        let newDescription =req.body.description_area;
        try{
            if(checkedCompleted == false){
                //if not completed
                goals_db.updateGoal(goalId,newValue,newDescription);
                res.redirect("/dashboard"); //if successful
            }else{
                goals_db.upgradeGoalToAchievement(goalId,newValue,newDescription,checkedCompleted,formattedTodaysDate);
                res.redirect("/dashboard"); //if successful
            }
           
        }catch(error){
            console.log("error while updating: ",error);
        }
    }
    if(categoryName == "Nutrition"){
        // do health related update
        let newValue = req.body.currentDiet;
        let newDescription = req.body.description_area;
        try{
            if(checkedCompleted == false){
                //if not completed
                goals_db.updateGoal(goalId,newValue,newDescription);
                res.redirect("/dashboard"); //if successful
            }else{
                goals_db.upgradeGoalToAchievement(goalId,newValue,newDescription,checkedCompleted,formattedTodaysDate);
                res.redirect("/dashboard"); //if successful
            } 
           
        }catch(error){
            console.log("error while updating: ",error);
        }
    }
   
}
exports.deleteSpecificGoal = function (req,res){
    //required to delete
    // _id

    let goalId =req.body.goal_to_delete;
    console.log("goal id: ",goalId);
    //required checks: 
    //goal exist, but that's done by the db
    goals_db.deleteAGoal(goalId);
    res.redirect('/dashboard');
}