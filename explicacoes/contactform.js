document.addEventListener("DOMContentLoaded", function () {

  const nivel = document.getElementById("nivel");
  const detalhe = document.getElementById("detalhe");

  const opcoes = {
    secundario: [
      "10º ano",
      "11º ano",
      "12º ano",
      "Preparação para exame"
    ],
    universitario: [
      "Álgebra",
      "Cálculo",
      "Análise Matemática",
      "Matemática Discreta",
      "Probabilidades",
      "Estatística",
      "Outros"
    ],
    maiores23: [
      "Preparação geral",
      "Exercícios tipo exame",
      "Revisão de matéria base"
    ]
  };

  nivel.addEventListener("change", function () {

    const valor = this.value;

    // limpar opções
    detalhe.innerHTML = "";

    if (!valor || !opcoes[valor]) {
      detalhe.innerHTML = '<option value="">Seleciona primeiro o nível</option>';
      return;
    }

    // adicionar nova lista
    const lista = opcoes[valor];

    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = "Seleciona opção";
    detalhe.appendChild(defaultOption);

    lista.forEach(item => {
      const option = document.createElement("option");
      option.value = item;
      option.textContent = item;
      detalhe.appendChild(option);
    });

  });

});