const nedb = require('nedb'); //nedb requirement
const bcrypt = require('bcrypt'); //bcrypt requirement
const saltRounds = 10;
class User {
    constructor(dbFilePath) {
        if (dbFilePath) {
            this.db = new nedb({ filename: dbFilePath, autoload: true });
            console.log('DB connected to ' + dbFilePath);
        } else {
            this.db = new nedb();
        }
    }
    //methods , initiation , passwords will be hashed accordingly.
    init() {
        this.db.insert({
            email: 'mockemail@gmail.com',
            username: 'Alessa1',
            password: '4VerySecurePSSW', 
            weight: '74',
            unit:'kg'

        });
        this.db.insert({
            email: 'anothermail@gmail.com',
            username: 'Andrea22',
            password: 'cats4life003',
            weight: '81',
            unit:'kg'
        });
    }
    //methods, cont.
    getAllUsers() {
        //return a promise object that can be resolved
        return new Promise((resolve, reject) => {
            this.db.find({}, function (err, entries) {
                //if an error occurs
                if (err) {
                    reject(err);
                } else {
                    resolve(entries);
                    console.log("function getAllUsers() returns ", entries);
                }
            })
        })
    }
    create(username, password) {
        const that = this;
        bcrypt.hash(password, saltRounds).then(function (hash) {
            var entry = {
                username: username,
                password: hash,
            };
            that.db.insert(entry, function (err) {
                if (err) {
                    console.log("Can't insert user: ", username);
                }
            });
        });
    }
    lookup(username, cb) { //cb stands for callback
        this.db.find({ 'username': username }, function (err, entries) {
            if (err) {
                return cb(null, null);
            } else {
                if (entries.length == 0) {
                    return cb(null, null);
                }
                console.log("FOUND ",entries[0]);
                return cb(null, entries[0]); // no error, return 1 entry, the first.
            }
        });
    }
}
//module visible outside:
module.exports = User;