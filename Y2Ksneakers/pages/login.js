const formulario = document.getElementById("form-login");
const usuario = document.getElementById("usuario");
const senha = document.getElementById("password");
const mensagem = document.getElementById("mensagem-login");

function validarEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
function validarCPF(cpf) {
  cpf = cpf.replace(/\D/g, "");

  return cpf.length === 11;
}
formulario.addEventListener("submit", function (event) {
  event.preventDefault();

  let valorUsuario = usuario.value.trim();
  let valorSenha = senha.value;

  if (valorUsuario === "" || valorSenha === "") {
    mensagem.textContent = "Preencha todos os campos.";
    mensagem.style.color = "red";
  } else if (!validarEmail(valorUsuario) && !validarCPF(valorUsuario)) {
    mensagem.textContent = "Digite um e-mail ou CPF válido.";
    mensagem.style.color = "red";
  }
});
