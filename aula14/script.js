
const campos = document.querySelectorAll("input");
const botao = document.querySelector("#habilitar");

botao.addEventListener("click", function() {
    campos.forEach(function(campo) {
        campo.disabled = false;
    });
});

campos.forEach(function(campo) {
    campo.addEventListener("blur", function() {
        campo.disabled = true;
    });
});