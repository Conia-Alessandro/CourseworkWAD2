const nedb = require('nedb'); //nedb requirement
const path = require('path'); //path dependency, __dirname
const public = path.join(__dirname,'public'); // public dir
const fs = require('fs'); // File system dependency
class Objectives{ 
    
     constructor(dbFilePath) {
        if (dbFilePath) {
            console.log("creating the db in path specified.");
            this.db = new nedb({ filename: dbFilePath, autoload: true });
            console.log('Objectives DB connected to ' + dbFilePath);
        } else {
            console.log("skipping the DB and creating a virtual one");
            this.db = new nedb();
        }
    }
    //methods , initiation
    init() {
        this.db.insert({
            username: "Hermes",
            type: "steps",
            startValue: 0,
            currentValue: 3000,
            endValue:  10000,
            length: 0,
            date: "2023-05-01",//new Date().toISOString().split('T')[0]
        });
        //debugging
        console.log('Objective entry for hermes inserted');
    }
    //methods, cont.
    getAllEntries(){
        //return a promise object that can be resolved
        return new Promise((resolve,reject) =>{
            this.db.find({},function(err,entries){
                //if an error occurs
                if(err){
                    reject(err);
                }else{
                    resolve(entries);
                    console.log("function all() returns ", entries);
                }
            })
        })
    }
    //view objectives on a date
    getUserObjective(username,date){
        return new Promise((resolve,reject)=>{
            this.db.find({username : username,date:date}, function(err,entries){
                if(err){
                    reject(err);
                }else{
                    resolve(entries);
                    console.log("get user Objectives on date returns ",entries);
                }
            })
        })
    }
    //view a specific objective on date and type
    getUserObjectiveonType(username,date,type){
        return new Promise((resolve,reject)=>{
            this.db.find({username : username,date:date,type:type}, function(err,entries){
                if(err){
                    reject(err);
                }else{
                    resolve(entries);
                    console.log("get user Objectives on date and type returns ",entries);
                }
            })
        })
    }
    // check if length >= current 

    //get all objectives by user
    getAllEntriesbyUser(username){
        return new Promise((resolve,reject)=>{
            this.db.find({username: username},function(err,entries){
                if(err){
                    reject(err);
                }else{
                    resolve(entries);
                    console.log("found Objectives of user: ",username," : ",entries);
                }
            })
        })
    }

    addObjective(username,type,length,endValue,date){
       
        var entry = {
            username: username,
            type: type,
            startValue: 0,
            currentValue: 0,
            endValue: endValue,
            length:length,
            date: date,//new Date().toISOString().split('T')[0]
        }
        console.log('Objective added: ',entry);
        this.db.insert(entry, function(err,doc){
            if(err){
                console.log('Error inserting the document',err);
            }else{
                console.log('document added, ',doc)
            }
        })
    }
}
//module visible outside:
module.exports = Objectives;