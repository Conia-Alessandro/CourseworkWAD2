 //alert handling
 let alert_x =document.getElementById("closingAlert");
 let alert_element =document.getElementById("weight_alert");
 alert_x.addEventListener("click", function(){
     alert_element.classList.remove("show");
     alert_element.remove();
 })
 let goals_container = document.getElementsByClassName("goals_container")[0] //element.childNodes.length
 let goal_types = document.getElementsByClassName("goal_type_retrived");
 for(let i = 0; i< goals_container.childNodes.length; i++){
//do something else
 }