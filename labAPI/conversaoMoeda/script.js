const url = `https://v6.exchangerate-api.com/v6/61c98c6a8e7f4b73851e2caa/latest/`;
async function converterMoeda(valor, moedaOrigem, moedaDestino) {
    try {
      const resposta = await fetch(`${url}${moedaOrigem}`);
      const dados = await resposta.json();
      if (!dados.conversion_rates[moedaDestino]) {
        throw new Error(`Taxa de câmbio para ${moedaDestino} não encontrada.`);
      }
      const taxaDeCambio = dados.conversion_rates[moedaDestino];
      return valor * taxaDeCambio;
    } catch (erro) {
      console.error('Erro ao converter moeda:', erro);
    }
  }
  async function converter() {
    const valor = parseFloat(document.getElementById('valor').value);
    const moedaOrigem = document.getElementById('moedaOrigem').value.toUpperCase();
    const moedaDestino = document.getElementById('moedaDestino').value.toUpperCase();
    if (!valor || !moedaOrigem || !moedaDestino) {
      alert('Preencha todos os campos corretamente.');
    }
    try {
      const resultado = await converterMoeda(valor, moedaOrigem, moedaDestino);
      document.getElementById('resultado').innerText = `Resultado: ${resultado.toFixed(2)} ${moedaDestino}`;
    } catch (erro) {
      alert('Erro ao converter moedas. Verifique os valores inseridos.');
    }
  }
