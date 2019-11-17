var btn_telefono = document.getElementsByClassName("navbar-toggler")[0];
var btn_user = document.getElementsByClassName("dropdown-toggle")[0];

console.log(btn_user)

btn_telefono.addEventListener("click", () => {
    var oculto = document.querySelector(".navbar-collapse");
    if (oculto.className.match(/(?:^|\s)show(?!\S)/)) {
      oculto.className = oculto.className.replace(/(?:^|\s)show(?!\S)/g, "");
    } else {
      oculto.className += " show";
    }
  });
  btn_user.addEventListener("click", () => {
      var mostrar = document.querySelector(".dropdown-menu")
    if (mostrar.className.match(/(?:^|\s)show(?!\S)/)) {
        mostrar.className = mostrar.className.replace(/(?:^|\s)show(?!\S)/g, "");
    } else {
        mostrar.className += " show";
    }
  });