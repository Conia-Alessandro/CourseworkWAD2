function validate() {
    let reg_btn = document.getElementById("register_btn");
    if (document.getElementById('tosCheck').checked) {
        reg_btn.disabled = false;
    } else {
         reg_btn.disabled = true;
    }
}