document.addEventListener("DOMContentLoaded", function () {
  // Gráficos do dashboard
  const graficoVendas = document.getElementById("grafico-vendas");
  const graficoPedidos = document.getElementById("grafico-pedidos");
  const graficoDespesas = document.getElementById("grafico-despesas");

  if (!graficoVendas || !graficoPedidos || !graficoDespesas) return;

  if (typeof Chart === "undefined") {
    [graficoVendas, graficoPedidos, graficoDespesas].forEach(
      function (grafico) {
        grafico.parentElement.textContent = "Gráfico indisponível.";
      },
    );
    return;
  }

  const meses = [
    "Jan",
    "Fev",
    "Mar",
    "Abr",
    "Mai",
    "Jun",
    "Jul",
    "Ago",
    "Set",
    "Out",
    "Nov",
    "Dez",
  ];
  const roxo = "#4300ff";
  const vermelho = "#ed2828";

  // Dados fictícios inspirados no wireframe.
  const vendas2025 = [
    21000, 23500, 26000, 20500, 23000, 22500, 24500, 26500, 22800, 28000, 24800,
    21000,
  ];
  const vendas2026 = [
    26500,
    18000,
    21500,
    25500,
    17000,
    27500,
    28500,
    22000,
    19500,
    23500,
    26000,
    null,
  ];
  const despesas2025 = [
    24500,
    20500,
    17800,
    20500,
    15500,
    20500,
    15500,
    21000,
    17800,
    21000,
    null,
    null,
  ];
  const moeda = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  const opcoesFinanceiras = {
    maintainAspectRatio: false,
    interaction: { mode: "index", intersect: false },
    plugins: {
      tooltip: {
        callbacks: {
          label(item) {
            return item.dataset.label + ": " + moeda.format(item.parsed.y);
          },
        },
      },
    },
    scales: {
      x: { grid: { display: false } },
      y: {
        beginAtZero: true,
        suggestedMax: 30000,
        ticks: {
          callback(valor) {
            return valor === 0 ? "R$ 0" : "R$ " + valor / 1000 + " mil";
          },
        },
      },
    },
  };

  new Chart(graficoVendas, {
    type: "line",
    data: {
      labels: meses,
      datasets: [
        {
          label: "2026",
          data: vendas2026,
          borderColor: roxo,
          backgroundColor: roxo,
        },
        {
          label: "2025",
          data: vendas2025,
          borderColor: vermelho,
          backgroundColor: vermelho,
        },
      ],
    },
    options: opcoesFinanceiras,
  });

  const quantidadePedidos = [149, 39, 22, 9];
  const totalPedidos = quantidadePedidos.reduce(
    (total, quantidade) => total + quantidade,
    0,
  );
  const situacoes = [
    "Entregues",
    "Em transporte",
    "Em separação",
    "Aguardando pagamento",
  ];
  const legendasPedidos = situacoes.map(function (situacao, indice) {
    const quantidade = quantidadePedidos[indice];
    const percentual = Math.round((quantidade / totalPedidos) * 100);
    return situacao + " " + percentual + "% (" + quantidade + ")";
  });

  new Chart(graficoPedidos, {
    type: "doughnut",
    data: {
      labels: legendasPedidos,
      datasets: [
        {
          data: quantidadePedidos,
          backgroundColor: ["#4478ef", "#ad8af4", "#f3b662", "#ffdd57"],
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      cutout: "52%",
      plugins: { legend: { position: "bottom" } },
    },
  });

  new Chart(graficoDespesas, {
    type: "bar",
    data: {
      labels: meses,
      datasets: [
        {
          label: "Vendas",
          data: [...vendas2025.slice(0, 10), null, null],
          backgroundColor: roxo,
        },
        { label: "Despesas", data: despesas2025, backgroundColor: vermelho },
      ],
    },
    options: {
      ...opcoesFinanceiras,
      scales: {
        ...opcoesFinanceiras.scales,
        // Reserva espaço para o par de barras nas extremidades do eixo.
        x: { ...opcoesFinanceiras.scales.x, offset: true },
      },
      datasets: {
        bar: { categoryPercentage: 0.4, barPercentage: 1 },
      },
    },
  });
});

document.addEventListener("DOMContentLoaded", function () {
  // Checkbox

  const selecionarTodos = document.getElementById("selecionarTodos");
  const checkboxes = document.querySelectorAll(".checkbox-produto");

  selecionarTodos?.addEventListener("change", function () {
    checkboxes.forEach(function (checkbox) {
      checkbox.checked = selecionarTodos.checked;
    });
  });

  checkboxes.forEach(function (checkbox) {
    checkbox.addEventListener("change", function () {
      if (!selecionarTodos) return;

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
