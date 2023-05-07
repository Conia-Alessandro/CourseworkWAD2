let editableSubclasses = document.getElementsByClassName("sub_category_text")[0];
   editableSubclasses.setAttribute("size",editableSubclasses.value.length);

   let checkComplete = document.getElementById("completeGoalCheck");
   let goalcategory = document.getElementById("goal_category");
   let formGoalCategory = document.getElementById("form_category_name");
   formGoalCategory.setAttribute("value",goalcategory.innerText);
   checkComplete.addEventListener("click", ()=>{
    if(checkComplete.checked){
        alert("WARNING! Checking this completes the goal automatically after clicking update");
        let goal_category = document.getElementById("goal_category");
        let goal;
        if(goal_category.innerText =="Wellbeing"){
            //wellbeing goals
            goal = document.getElementById("current_sleep_number");
            checkComplete.value =true;
            goal.value=goal.getAttribute("max");
        }
        if(goal_category.innerText =="Health"){
            //wellbeing goals
            goal = document.getElementById("current_Diet_number");
            checkComplete.value =true;
            goal.value=goal.getAttribute("max");
        }
        if(goal_category.innerText =="Fitness"){
            //wellbeing goals
            goal = document.getElementById("current_steps_number");
            checkComplete.value =true;
            goal.value=goal.getAttribute("max")
            //goal.setAttribute("value",goal.getAttribute("max"));
        }

    }else{
        if(goal_category.innerText =="Wellbeing"){
            //wellbeing goals
            goal = document.getElementById("current_sleep_number");
            checkComplete.value =false;
            goal.value=goal.getAttribute("min");
        }
         if(goal_category.innerText =="Health"){
            //wellbeing goals
            goal = document.getElementById("current_Diet_number");
            checkComplete.value =false;
            goal.value=goal.getAttribute("min");
        }
        if(goal_category.innerText =="Fitness"){
            //wellbeing goals
            goal = document.getElementById("current_steps_number");
            checkComplete.value =false;
            goal.value=goal.getAttribute("min");
            //goal.setAttribute("value",goal.getAttribute("min"));
        }
    }
   })
let wellbeingGoal = document.getElementById("current_sleep_number");
let nutritionGoal = document.getElementById("current_Diet_number");
let fitnessGoal = document.getElementById("current_steps_number");

if(goal_category.innerText =="Wellbeing"){
    wellbeingGoal.addEventListener("input",(event) =>{
        if (wellbeingGoal.value >= wellbeingGoal.getAttribute("max")){
            checkComplete.checked = true;
            checkComplete.disabled = true;
            checkComplete.value =true;
        }else{
            checkComplete.checked = false;
            checkComplete.value =false;
            checkComplete.disabled = false;
        }
    })
}
if(goal_category.innerText =="Health"){
    nutritionGoal.addEventListener("input",(event) =>{
        if (nutritionGoal.value >= nutritionGoal.getAttribute("max")){
            checkComplete.checked = true;
            checkComplete.value =true;
            checkComplete.disabled = true;
        }else{
            checkComplete.checked = false;
            checkComplete.value =false;
            checkComplete.disabled = false;
        }
    })
}
if(goal_category.innerText =="Fitness"){
    fitnessGoal.addEventListener("input",(event) =>{
        if (fitnessGoal.value >= fitnessGoal.getAttribute("max")){
            checkComplete.checked = true;
            checkComplete.value =true;
            checkComplete.disabled = true;
        }else{
            checkComplete.checked = false;
            checkComplete.value =false;
            checkComplete.disabled = false;
        }
    })
}