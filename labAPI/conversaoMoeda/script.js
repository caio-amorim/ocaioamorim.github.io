const url = 'https://v6.exchangerate-api.com/v6/61c98c6a8e7f4b73851e2caa/latest/';
const botaoConverter = document.querySelector("#botaoConverter");
const moedaInicial = document.querySelector("#moedaInicial");
const moedaFinal = document.querySelector("#moedaFinal");
const resultado = document.querySelector("#resultado");
async function converterMoeda(valor, moedaInicial, moedaFinal) {
        let resposta = await fetch(`${url}${moedaInicial}`);
        dados = await resposta.json();
        let taxa = dados.conversion_rates[moedaFinal];
        return valor * taxa;
}
botaoConverter.addEventListener('click', async () => {
    const valor = parseFloat(document.querySelector("#valor").value);
    const moedaInicialValor = moedaInicial.value.toUpperCase();
    const moedaFinalValor = moedaFinal.value.toUpperCase();
    const res = await converterMoeda(valor, moedaInicialValor, moedaFinalValor);
    resultado.innerHTML = res;
});
