window.onload = () => {
    var repe_check = document.getElementById("rep_switch")
    var repe_div = document.getElementById("rep_F")
    var seleccion = document.getElementById("type_repetition_choose")
    repe_div.style.display = "none"

    repe_check.addEventListener('click', () => {
        if(repe_check.checked){
            repe_div.style.display = "block"
        }else{
            repe_div.style.display = "none"
        }
    })


}