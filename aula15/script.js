const campos = document.querySelectorAll("input");
const botao = document.querySelector("#habilitar");

botao.addEventListener("click", function () {
  campos.forEach(function (campo) {
    campo.disabled = false;
  });
});

campos.forEach(function (campo) {
  campo.addEventListener("blur", function () {
    campo.disabled = true;
  });
});

function cadastrar(event) {
  event.preventDefault();

  const nome = document.querySelector("#nome").value;
  const mensagem = document.querySelector("#mensagem");

  mensagem.style.display = "block";
  mensagem.textContent = "Cadastrado com sucesso, " + nome + "!";
}
