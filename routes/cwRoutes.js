const express = require('express');
const router = express.Router(); //the app router
const controller = require('../controllers/cwController.js');
const {verify} = require("../auth/auth.js");
const {login} = require ("../auth/auth.js");

//basic functionality pages
router.get("/",controller.landing_page);
router.get("/about",controller.about_us);

//pages that handle register
router.get("/register",controller.new_user);
router.post("/register",controller.validate_fields);
router.get("/registered",controller.post_register);

//pages that handle login
router.get("/login",controller.existing_user);
router.post("/login",login,controller.post_login)

//login blocked pages:
router.get("/dashboard",verify,controller.dashboard);
router.get("/goals",verify,controller.goal_page);
router.get("/goals/:date/:type",verify,controller.modifySpecificGoal);
//handle new goals
router.get("/newGoal",verify,controller.newGoalLanding);
router.post("/newGoal",verify,controller.createNewGoal);
router.get("/newGoal/:date/:type",verify,controller.newGoalLandingSpecific);
//post newGoal
router.get("/achievements",verify,controller.achievements);
//router.get("/modifyGoal/:date/:type",verify,controller.modifySpecificGoal); //uncomment if routers don't work
router.post("/updateGoal",verify,controller.updateAGoal); 
router.get("/logout",controller.handle_logout);
//extra pages
router.get("/FAQ",controller.faq);
router.get("/show",controller.show_users); //TODO, remove only for debugging
//extra functionality

//const ObjectiveRouter = express.Router();
//const ObjectiveTypeRouter = express.Router({mergeParams:true});
// Replace this piece of code with /goals page 
//ObjectiveRouter.get('/',verify,controller.ObjectiveLanding); //trying to modify goal
//ObjectiveRouter.get('/:date',verify,controller.ObjectiveByDateLanding); //trying to modify goal with date
//ObjectiveTypeRouter.get('/',verify,controller.modifySpecificGoal); // trying to modify a goal with date and goal type

//router.use('/modifyGoal' , ObjectiveRouter); //for everything modifyGoal related use first router, otherwise use the other one
//router.use('/modifyGoal/:date/:type', ObjectiveTypeRouter);

//router.get('/modifyGoal/:date/:type',verify,controller.modifySpecificGoal);
router.use(function(req, res) {
    res.status(404);
    res.render("/public/404.html");
})

router.use(function(err, req, res, next) {
    res.status(500);
    res.type('text/plain');
    res.send('Internal Server Error.');
})
module.exports = router;