let datePicker = document.getElementById("goal_start_date");
function getDayName(dateStr, locale) {
    var date = new Date(dateStr);
    return date.toLocaleDateString(locale, { weekday: 'long' });
}
let link_to_newWellbeingGoal = document.getElementsByClassName("external-link-sleep")[0];
let link_to_newNutritionGoal = document.getElementsByClassName("external-link-health")[0];
let link_to_newFitnessGoal = document.getElementsByClassName("external-link-steps")[0];
datePicker.addEventListener("change",(evt) =>{
    let documentDay = document.getElementsByClassName("day_placeholder")[0];
    let currentValue = datePicker.value;
    let date = new Date(currentValue);
    var dd = String(date.getDate()).padStart(2, '0');
    var mm = String(date.getMonth() + 1).padStart(2, '0');
    var yyyy = date.getFullYear();
    let currentSelectedDate = `${mm}/${dd}/${yyyy}`;
    var day = getDayName(currentSelectedDate, "en-gb"); 
    //update day
    documentDay.innerText = day;
    //update links
    //wellbeing link
    link_to_newWellbeingGoal.setAttribute("href",`/newGoal/${currentValue}/wellbeing`);
    link_to_newNutritionGoal.setAttribute("href",`/newGoal/${currentValue}/nutrition`);
    link_to_newFitnessGoal.setAttribute("href",`/newGoal/${currentValue}/fitness`);
})