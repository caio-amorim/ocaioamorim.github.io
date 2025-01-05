async function buscarTaxas() {
  const url = 'https://v6.exchangerate-api.com/v6/61c98c6a8e7f4b73851e2caa/latest/USD';
  try {
      const resposta = await fetch(url);
      const dados = await resposta.json();
      if (!dados || !dados.conversion_rates) {
          throw new Error('Dados inválidos recebidos da API.');
      }
      return dados.conversion_rates;
  } catch (erro) {
      console.error(erro);
      return null;
  }
}
async function converterMoeda(quantia, deMoeda, paraMoeda) {
  const taxas = await buscarTaxas();
  if (!taxas) {
      document.getElementById('resultado').textContent = 'Erro ao buscar taxas de câmbio.';
      return;
  }
  const taxaDe = taxas[deMoeda.toUpperCase()];
  const taxaPara = taxas[paraMoeda.toUpperCase()];

  if (!taxaDe || !taxaPara) {
      document.getElementById('resultado').textContent = 'Código de moeda inválido.';
      return;
  }
  const valorConvertido = (quantia / taxaDe) * taxaPara;
  document.getElementById('resultado').textContent = `${quantia} ${deMoeda.toUpperCase()} é ${valorConvertido} ${paraMoeda.toUpperCase()}`;
}
async function converterParaMultiplasMoedas(quantia, deMoeda) {
  const taxas = await buscarTaxas();
  if (!taxas) {
      document.getElementById('resultadosMultiplos').textContent = 'Erro ao buscar taxas de câmbio.';
      return;
  }
  const taxaDe = taxas[deMoeda.toUpperCase()];
  if (!taxaDe) {
      document.getElementById('resultadosMultiplos').textContent = 'Código de moeda inválido.';
      return;
  }
  const conversoes = Object.keys(taxas).map(moeda => {
      const valorConvertido = (quantia / taxaDe) * taxas[moeda];
      return `${moeda}: ${valorConvertido}`;
  });
  document.getElementById('resultadosMultiplos').innerHTML = conversoes.join('<br>');
}
document.getElementById('botaoConverter').addEventListener('click', () => {
  const quantia = parseFloat(document.getElementById('quantia').value);
  const deMoeda = document.getElementById('deMoeda').value;
  const paraMoeda = document.getElementById('paraMoeda').value;
  if (!quantia || !deMoeda || !paraMoeda) {
      alert('Por favor, preencha todos os campos.');
      return;
  }
  converterMoeda(quantia, deMoeda, paraMoeda);
  converterParaMultiplasMoedas(quantia, deMoeda);
});