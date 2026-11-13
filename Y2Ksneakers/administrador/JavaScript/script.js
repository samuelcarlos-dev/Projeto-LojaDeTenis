document.addEventListener("DOMContentLoaded", function () {
  // Checkbox

  const selecionarTodos = document.getElementById("selecionarTodos");
  const checkboxes = document.querySelectorAll(".checkbox-produto");

  selecionarTodos.addEventListener("change", function () {
    checkboxes.forEach(function (checkbox) {
      checkbox.checked = selecionarTodos.checked;
    });
  });

  checkboxes.forEach(function (checkbox) {
    checkbox.addEventListener("change", function () {
      const marcados = document.querySelectorAll(
        ".checkbox-produto:checked",
      ).length;

      selecionarTodos.checked = marcados === checkboxes.length;

      selecionarTodos.indeterminate =
        marcados > 0 && marcados < checkboxes.length;
    });
  });

  // Avaliação

  const avaliacoes = document.querySelectorAll(".avaliacao");

  avaliacoes.forEach(function (avaliacao) {
    const botoes = avaliacao.querySelectorAll("button");

    function atualizarEstrelas(nota) {
      botoes.forEach(function (botao, indice) {
        const icone = botao.querySelector("i");

        if (indice < nota) {
          icone.className = "bi bi-star-fill";
        } else {
          icone.className = "bi bi-star";
        }
      });
    }

    atualizarEstrelas(Number(avaliacao.dataset.nota));

    botoes.forEach(function (botao, indice) {
      botao.addEventListener("click", function () {
        const novaNota = indice + 1;

        avaliacao.dataset.nota = novaNota;

        atualizarEstrelas(novaNota);
      });
    });
  });

  // Fixar

  const botoesFixar = document.querySelectorAll(".btn-fixar");

  botoesFixar.forEach(function (botao) {
    botao.addEventListener("click", function () {
      const fixado = botao.getAttribute("aria-pressed") === "true";
      const novoEstado = !fixado;

      botao.setAttribute("aria-pressed", String(novoEstado));

      const icone = botao.querySelector("i");

      if (novoEstado) {
        icone.className = "bi bi-pin-angle-fill fs-5";
        botao.title = "Desfixar produto";
        botao.setAttribute("aria-label", "Desfixar produto");
      } else {
        icone.className = "bi bi-pin-angle fs-5";
        botao.title = "Fixar produto";
        botao.setAttribute("aria-label", "Fixar produto");
      }
    });
  });
});
