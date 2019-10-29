window.onload = () => {
btn_inicio = document.getElementById("inicio");
btn_sesion = document.getElementById("initSesion");
//btn_reserva = document.getElementById("reserva");
btn_r = document.getElementById("registro");

let horarios = document.getElementsByClassName("horarios");
let inicioSesion = document.getElementsByClassName("login");
let registro = document.getElementsByClassName("crearUser");

function clickbtn(unnumero) {
    if (unnumero == 0) {
        horarios[0].setAttribute("style", "display:block");
        inicioSesion[0].setAttribute("style", "display:none");
        registro[0].setAttribute("style", "display:none");

    }
    if(unnumero == 1){
        horarios[0].setAttribute("style", "display:none");
        inicioSesion[0].setAttribute("style", "display:block");
        registro[0].setAttribute("style", "display:none");
    }

    if(unnumero == 3){
        horarios[0].setAttribute("style", "display:none");
        inicioSesion[0].setAttribute("style", "display:none");
        registro[0].setAttribute("style", "display:block");

    }
    console.log(unnumero);
}




btn_inicio.addEventListener("click", function () {
    clickbtn(0);
});

btn_sesion.addEventListener("click", function () {
    clickbtn(1);
});

btn_r.addEventListener("click", function(){
    clickbtn(3);

});


};