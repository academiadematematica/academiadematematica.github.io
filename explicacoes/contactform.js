/* =========================================================
   Marcação de explicações - o segundo campo ("detalhe")
   depende do nível escolhido no primeiro ("nivel").
   ========================================================= */
document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  var nivel = document.getElementById('nivel');
  var detalhe = document.getElementById('detalhe');
  if (!nivel || !detalhe) return;

  var opcoes = {
    secundario: [
      '10.º ano',
      '11.º ano',
      '12.º ano',
      'Preparação para exame'
    ],
    universitario: [
      'Álgebra',
      'Cálculo',
      'Análise Matemática',
      'Matemática Discreta',
      'Probabilidades',
      'Estatística',
      'Outros'
    ],
    maiores23: [
      'Preparação geral',
      'Exercícios tipo exame',
      'Revisão de matéria base'
    ]
  };

  function addOption(value, text) {
    var option = document.createElement('option');
    option.value = value;
    option.textContent = text;
    detalhe.appendChild(option);
  }

  function update() {
    var lista = opcoes[nivel.value];
    detalhe.innerHTML = '';

    if (!lista) {
      addOption('', 'Escolhe primeiro o nível');
      detalhe.disabled = true;
      return;
    }

    addOption('', 'Escolhe uma opção');
    lista.forEach(function (item) { addOption(item, item); });
    detalhe.disabled = false;
  }

  nivel.addEventListener('change', update);
  update();
});
