let createGoalForm = document.getElementById("createGoalForm");
let choice = document.getElementById("user_goal_choice");
let label1 = document.getElementsByClassName("goal_info_label")[0];
let label2 = document.getElementsByClassName("goal_info_label")[1];
let label3 = document.getElementsByClassName("goal_info_label")[2];
let label4 = document.getElementsByClassName("goal_info_label")[3];
let label5 = document.getElementsByClassName("goal_info_label")[4];
let goal_choice = document.getElementsByClassName("goal-display-option")[1];
let datalist = document.getElementById("subCategoryPicker");
let goal_description = document.getElementById("goalEndValueDescription"); //changes on different input.
let goal_endValueNumber = document.getElementById("endValueNumber");
let start_goal_type = document.getElementById("goal_type");

let wellbeingOpt = document.getElementById("sleepOption");
let nutritionOpt = document.getElementById("healthOption");
let fitnessOpt = document.getElementById("fitnessOption");
let jsonAquired;
let fitnessSub;
let wellbeinSub;
let NutritionSub;
let currentOption = "sleepOption";
fetch('/descriptors/subcategoryInformation.json')
    .then((response) => response.json())
    .then((json) => {
         //console.log(json);
        jsonAquired =json;
        fitnessSub = json.Fitness;
        wellbeinSub = json.Wellbeing;
        NutritionSub = json.Nutrition;
        //console.log(jsonAquired.Fitness[0].subcategory);
        //always at least once when setting up wellbeing as the first category
        let otherItem =  "Other";
        var extraOption = document.createElement('option');
        extraOption.innerText = otherItem;
        datalist.appendChild(extraOption);
        if(start_goal_type.innerText =="wellbeing"){
            //append the options of subcategories to the default wellbeing cateogry
            for( let i = 0 ; i < wellbeinSub.length ; i++){
                let item =  wellbeinSub[i].subcategory;
                var option = document.createElement('option');
                option.innerText = item;
                option.text = item;
                option.value = i;
                datalist.appendChild(option);
            }
            goal_description.innerText = "it could be for instance the number of Hours you want to sleep , rest or meditate";
            goal_endValueNumber.setAttribute("max",100); //max 100 hours of wellbeing
        }
        if(start_goal_type.innerText =="nutrition"){
            //append the options of subcategories to the default wellbeing cateogry
            for( let i = 0 ; i < NutritionSub.length ; i++){
                let item =  NutritionSub[i].subcategory;
                var option = document.createElement('option');
                option.innerText = item;
                option.text = item;
                option.value = i;
                datalist.appendChild(option);
            }
            goal_description.innerText = "it could be for instance the number of calories to loose or intake";
        goal_endValueNumber.setAttribute("max",5000); //max 5000 kcals for wellbeing
        nutritionOpt.checked = true;
         addClasses(1);
        
        }
        if(start_goal_type.innerText =="fitness"){
            //append the options of subcategories to the default wellbeing cateogry
            for( let i = 0 ; i < fitnessSub.length ; i++){
                let item =  fitnessSub[i].subcategory;
                var option = document.createElement('option');
                option.innerText = item;
                option.text = item;
                option.value = i;
                datalist.appendChild(option);
            }
            goal_description.innerText = "it could be for instance the number of exercises to perform in a day/week";
            goal_endValueNumber.setAttribute("max",100); //max 100 exercises for fitness
            fitnessOpt.checked = true;
            addClasses(2);
        }
        
    });
//listeners
function addClasses(option){
    switch(option){
        case 0:
        break;
        case 1:
           choice.classList.add("wgt");
        choice.classList.remove("eepy");
        choice.classList.remove("step");
        label1.classList.add("text-dark");
        label1.classList.remove("text-light");
        label2.classList.add("text-dark");
        label2.classList.remove("text-light");
        label3.classList.add("text-dark");
        label3.classList.remove("text-light");
        label4.classList.add("text-dark");
        label4.classList.remove("text-light");
        label5.classList.add("text-dark");
        label5.classList.remove("text-light");
        break;
        case 2:
        choice.classList.add("step");
        choice.classList.remove("eepy");
        choice.classList.remove("wgt");
        label1.classList.add("text-dark");
        label1.classList.remove("text-light");
        label2.classList.add("text-dark");
        label2.classList.remove("text-light");
        label3.classList.add("text-dark");
        label3.classList.remove("text-light");
        label4.classList.add("text-dark");
        label4.classList.remove("text-light");
        label5.classList.add("text-dark");
        label5.classList.remove("text-light");
        break;
    }
}

goal_choice.addEventListener("click",(event) =>{
    if(event.target.id == "sleepOption"){
        currentOption = event.target.id;
        choice.classList.add("eepy");
        choice.classList.remove("wgt");
        choice.classList.remove("step");
        label1.classList.remove("text-dark");
        label1.classList.add("text-light");
        label2.classList.remove("text-dark");
        label2.classList.add("text-light");
        label3.classList.remove("text-dark");
        label3.classList.add("text-light");
        label4.classList.remove("text-dark");
        label4.classList.add("text-light");
        label5.classList.remove("text-dark");
        label5.classList.add("text-light");
        console.log(wellbeinSub);
        while (datalist.firstChild) {
            datalist.removeChild(datalist.lastChild);
        }
        //always
    let otherItem =  "Other";
    var extraOption = document.createElement('option');
    extraOption.innerText = otherItem;
    datalist.appendChild(extraOption);
        for( let i = 0 ; i < wellbeinSub.length ; i++){
            let item =  wellbeinSub[i].subcategory;
            var option = document.createElement('option');
            option.innerText = item;
            option.value=i;
            option.text = item;
            datalist.appendChild(option);
        }
        goal_description.innerText = "it could be for instance the number of Hours you want to sleep , rest or meditate";
        goal_endValueNumber.setAttribute("max",100); //max 500 hours of wellbeing
        start_goal_type.innerText ="wellbeing";
    }
    if(event.target.id== "healthOption"){
        currentOption = event.target.id;
     
        choice.classList.add("wgt");
        choice.classList.remove("eepy");
        choice.classList.remove("step");
        label1.classList.add("text-dark");
        label1.classList.remove("text-light");
        label2.classList.add("text-dark");
        label2.classList.remove("text-light");
        label3.classList.add("text-dark");
        label3.classList.remove("text-light");
        label4.classList.add("text-dark");
        label4.classList.remove("text-light");
        label5.classList.add("text-dark");
        label5.classList.remove("text-light");
        console.log(NutritionSub);
        while (datalist.firstChild) {
            datalist.removeChild(datalist.lastChild);
        }
        //always
    let otherItem =  "Other";
    var extraOption = document.createElement('option');
    extraOption.innerText = otherItem;
    datalist.appendChild(extraOption);
        for( let i = 0 ; i < NutritionSub.length ; i++){
            let item =  NutritionSub[i].subcategory;
            var option = document.createElement('option');
            option.innerText = item;
            option.value=i;
            option.text = item;
            datalist.appendChild(option);
        }
        goal_description.innerText = "it could be for instance the number of calories to loose or intake";
        goal_endValueNumber.setAttribute("max",5000); //max 5000 kcals for wellbeing
        start_goal_type.innerText = "nutrition";
    }

    if(event.target.id == "fitnessOption"){
        currentOption = event.target.id;
        
        choice.classList.add("step");
        choice.classList.remove("eepy");
        choice.classList.remove("wgt");
        label1.classList.add("text-dark");
        label1.classList.remove("text-light");
        label2.classList.add("text-dark");
        label2.classList.remove("text-light");
        label3.classList.add("text-dark");
        label3.classList.remove("text-light");
        label4.classList.add("text-dark");
        label4.classList.remove("text-light");
        label5.classList.add("text-dark");
        label5.classList.remove("text-light");
        console.log(fitnessSub);
        while (datalist.firstChild) {
            datalist.removeChild(datalist.lastChild);
        }
        //always
    let otherItem =  "Other";
    var extraOption = document.createElement('option');
    extraOption.innerText = otherItem;
    datalist.appendChild(extraOption);
        for( let i = 0 ; i < fitnessSub.length ; i++){
            let item =  fitnessSub[i].subcategory;
            var option = document.createElement('option');
            option.innerText = item;
            option.value=i;
            option.text = item;
            datalist.appendChild(option);
        }
        goal_description.innerText = "it could be for instance the number of exercises to perform in a day/week";
        goal_endValueNumber.setAttribute("max",100); //max 100 exercises for fitness
        start_goal_type.innerText ="fitness";
    }
    /*
    //not necessary anymore at the end
    let otherItem =  "Other";
    var extraOption = document.createElement('option');
    extraOption.innerText = otherItem;
    datalist.appendChild(extraOption);
    */
})


//on selection
datalist.addEventListener("change", (event)=>{
    let indexText = datalist.options[datalist.selectedIndex].value; // or datalist.value datalist.options[datalist.selectedIndex].value
    var text = datalist.options[datalist.selectedIndex].innerText;
    console.log("text: ",text, " index",indexText);
    let descriptionArea = document.getElementById("subcategoryDescription"); //description of subcategories
    let category  = document.getElementById("subCategoryName");
    //Three main categories:
    // wellbeinSub
    // NutritionSub
    // fitnessSub
//descriptionArea.innerText = wellbeinSub;
    if(currentOption== "sleepOption"){
        //text = datalist.options[datalist.selectedIndex].innerText;
        if(text =="Other"){
            console.log("nothing to do");
        }else{
            descriptionArea.innerText = wellbeinSub[indexText].description;
            category.innerText = text;
        }
        
    }
    if(currentOption == "healthOption"){
        //text = datalist.options[datalist.selectedIndex].innerText;
        if(text =="Other"){
            console.log("nothing to do");
        }else{
            descriptionArea.innerText = NutritionSub[indexText].description;
            category.innerText = text;
        }
        
    }
    if(currentOption =="fitnessOption"){
        //text = datalist.options[datalist.selectedIndex].innerText;
        if(text =="Other"){
            console.log("nothing to do");
        }else{
           descriptionArea.innerText = fitnessSub[indexText].description;
           category.innerText = text;
        }
        
    }

 
})
createGoalForm.addEventListener("submit",(event)=>{
    //swap before submission
    //let indexText = datalist.options[datalist.selectedIndex].value;
    var text = datalist.options[datalist.selectedIndex].innerText;
    datalist.options[datalist.selectedIndex].value = text;
})
goal_endValueNumber.addEventListener("input",(event) =>{
    /*
    if(goal_endValueNumber.value > goal_endValueNumber.max){
        alert("the value cannot be more than max, the max value for each category has been preset to avoid this.");
        goal_endValueNumber.setAttribute("value", goal_endValueNumber.max);
    }
    */
})