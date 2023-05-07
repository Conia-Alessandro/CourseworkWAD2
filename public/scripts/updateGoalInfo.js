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
            goal.setAttribute("value",goal.getAttribute("max"));
        }
        if(goal_category.innerText =="Health"){
            //wellbeing goals
            goal = document.getElementById("current_Diet_number");
            goal.setAttribute("value",goal.getAttribute("max"));
        }
        if(goal_category.innerText =="Fitness"){
            //wellbeing goals
            goal = document.getElementById("current_steps_number");
            goal.setAttribute("value",goal.getAttribute("max"));
        }

    }else{
        if(goal_category.innerText =="Wellbeing"){
            //wellbeing goals
            goal = document.getElementById("current_sleep_number");
            goal.setAttribute("value",goal.getAttribute("min"));
        }
         if(goal_category.innerText =="Health"){
            //wellbeing goals
            goal = document.getElementById("current_Diet_number");
            goal.setAttribute("value",goal.getAttribute("min"));
        }
        if(goal_category.innerText =="Fitness"){
            //wellbeing goals
            goal = document.getElementById("current_steps_number");
            goal.setAttribute("value",goal.getAttribute("min"));
        }
    }
   })