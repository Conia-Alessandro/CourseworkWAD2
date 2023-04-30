const express = require('express');
const router = express.Router();
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
router.get("/achievements",verify,controller.achievements);
router.get("/logout",controller.handle_logout);
//extra pages
router.get("/FAQ",controller.faq);
router.get("/show",controller.show_users); //TODO, remove only for debugging

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