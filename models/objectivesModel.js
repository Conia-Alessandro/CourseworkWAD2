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
            this.db.find({username : username,date:date,completed:false}, function(err,entries){
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
            this.db.find({username : username,date:date,type:type,completed:false}, function(err,entries){
                if(err){
                    reject(err);
                }else{
                    resolve(entries);
                    console.log("get user Objectives on date and type returns ",entries);
                }
            })
        })
    }
    // get achivements
    getAllUserAchievements(username){
        return new Promise((resolve,reject)=>{
            this.db.find({username : username,completed:true}, function(err,entries){
                if(err){
                    reject(err);
                }else{
                    resolve(entries);
                    console.log("get all achievements returns ",entries);
                }
            })
        })
    }

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
    updateGoal(goalId,newValue,newDescription){
        this.db.update({ _id: goalId }, { $set: { currentValue: newValue ,description: newDescription}},{}, function(err){
            if(err) {
                console.log("error while updating" ,err);
            }else{
                console.log("Goal updated");
            }
        })
        this.db.persistence.compactDatafile(); //compact to remove the old one
        console.log("DB compacted");
    }   
    //goal becomes achievement
    upgradeGoalToAchievement(goalId,newValue,newDescription,completion,dateCompleted){
        this.db.update({ _id: goalId }, { $set: { currentValue: newValue ,description: newDescription, completed:completion, completedOn:dateCompleted}},{}, function(err){
            if(err) {
                console.log("error while making goal into achievement" ,err);
            }else{
                console.log("Goal upgraded to achievement");
            }
        })
        this.db.persistence.compactDatafile(); //compact to remove the old one
        console.log("DB compacted");
    }
    deleteAGoal(goalId){
        this.db.remove({ _id: goalId },{}, function(err, numRemoved){
            if(err){
                console.log("error while deleting, ",err);
            }else{
                console.log(numRemoved, " Goal Deleted");
            }
        })
        this.db.persistence.compactDatafile(); //compact to remove both of them
        console.log("DB compacted");
    }
    findGoalsCompletionNumber(username,completed){
        return new Promise((resolve,reject)=>{
            this.db.count({username: username, completed:completed},function(err,number){
                if(err){
                    reject(err);
                }else{
                    resolve(number);
                }
            })
        })
    }
    addObjective(username , type , subcategory, endValue, description, length , repetitive , repetition , date, endDate){
       
        var entry = {
            username: username,
            type: type,
            subcategory:subcategory,
            startValue: 0,
            currentValue: 0,
            endValue: endValue,
            description:description,
            length:length,
            repetitive:repetitive,
            repetition:repetition,
            date: date,
            endDate: endDate ,
            completed : false,  //by default false
            completedOn: ""
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