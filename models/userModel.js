const nedb = require('nedb'); //nedb requirement
class User {
    constructor(dbFilePath) {
        if (dbFilePath) {
            this.db = new nedb({ filename: dbFilePath, autoload: true });
            console.log('DB connected to ' + dbFilePath);
        } else {
            this.db = new nedb();
        }
    }
    //methods , initiation
    init() {
        this.db.insert({
            email: 'mockemail@gmail.com',
            password: '4VerySecurePSSW',
            DOB: '2001-09-13',
            name: 'Alessandro',
            surname: 'Conia',
            gender: 'Male',
            weight: '74',
            unit:'kg'

        });
        this.db.insert({
            email: 'anothermail@gmail.com',
            password: 'cat4life003',
            DOB: '2002-08-12',
            name: 'Andrea',
            surname: 'Stewart',
            gender: 'Male',
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
                    console.log("function allUsers() returns ", entries);
                }
            })
        })
    }
    lookup(email, cb) {
        this.db.find({ 'email': email }, function (err, entries) {
            if (err) {
                return cb(null, null);
            } else {
                if (entries.length == 0) {
                    return cb(null, null);
                }
                return cb(null, entries[0]);
            }
        });
    }
}
//module visible outside:
module.exports = User;