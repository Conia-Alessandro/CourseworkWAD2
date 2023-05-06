const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');
const path = require('path'); //path dependency, __dirname
const userDb = new userModel(path.join(__dirname, '..', 'databases', 'users.db')); //for now commented
//console.log(path.join(__dirname,'..','databases','users.db'));
const jwt = require("jsonwebtoken");

exports.login = function (req, res, next) {
    console.log("performing authentication...");
    let username = req.body.username;
    let password = req.body.password;
    userDb.lookup(username, function (err, user) { //replace with userDb
        if (err) {
            //remove unauthorized error and instead render page with "user error"as a parameter
            console.log("error looking up user", err);
            return res.status(401).send();
        }
        if (!user) {
            //remove unauthorized error and instead render page with "user error" as a parameter
            console.log("user ", username, " not found");
            return res.status(401).send();
        }
        //compare provided password with stored password
        bcrypt.compare(password, user.password, function (err, result) {
            if (result) {
                console.log("user ", user.username, " exists, logging you in.");
                //if user exists we create the JWT
                let payload = { username: user.username };
                let accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET);
                res.cookie("jwt", accessToken);
                //and then pass onto the next middleware
                next();
            } else {
                //comparison fail
                 //remove comparison error and instead render page with "password error" as a parameter
                //return res.status(403).send();
                return res.redirect("/login");
            }
        });
    });
}

exports.verify = function (req, res, next) {
    let accessToken = req.cookies.jwt;

    if (!accessToken) {
        console.log("no access token, redirecting...");
        //return res.status(403).send();
        return res.redirect("/login");
    }
    let payload;
    try {
        payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
        console.log("username found in jwt: ", payload.username); //was req.body.username and userid
        req.username = payload.username;
        next();

    } catch (e) {
        //error caught
        console.log("redirecting...");
        return res.redirect("/login");
        //res.status(401).send();
    }
};