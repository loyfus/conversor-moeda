import './style.css'

document.addEventListener('DOMContentLoaded', function () {
    const valorBox = document.getElementById('valor-box');
    const sel1 = document.getElementById('sel1');
    const sel2 = document.getElementById('sel2');
    const resultado = document.getElementById('resultado');
    const converterBtn = document.getElementById('converter-btn');
  
    converterBtn.addEventListener('click', () => {
      const moedaOrigem = sel1.value;
      const moedaFinal = sel2.value;
      const valor = parseFloat(valorBox.value);
  
      if (isNaN(valor) || valor <= 0 || moedaOrigem === '' || moedaFinal === '') {
        alert('Preencha todos os campos corretamente.');
        return;
      }
  
      fetch(`https://api.exchangerate-api.com/v4/latest/${moedaOrigem}`)
        .then((response) => response.json())
        .then((data) => {
          const taxaCambio = data.rates[moedaFinal];
          if (taxaCambio) {
            const resultadoConversao = valor * taxaCambio;
            resultado.textContent = `R$ ${resultadoConversao.toFixed(2)} ${moedaFinal}`;
          } else {
            resultado.textContent = 'Moeda de final inválida.';
          }
        })
        .catch((error) => {
          console.error('Erro ao buscar, tente novamente:', error);
        });
    });
  });
  