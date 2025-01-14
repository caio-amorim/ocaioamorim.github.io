const chaveApi = "a39e1f50b887e90640b4ab9c7786c25f";
async function obterClima() {
    const cidade = document.querySelector('#cidade').value;
    let resultado = document.querySelector('#resultado');
    let resposta = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cidade}&units=metric&appid=${chaveApi}`);
    resposta = await resposta.json();
    const temperatura = resposta.main.temp;
    const umidade = resposta.main.humidity;
    const condicao = resposta.weather[0].description;
    const detalhesClima = {
        temperatura: temperatura,
        umidade: umidade,
        condicao: condicao
    };
    const climaExtremo = detalhesClima.filter(function (clima) {
        return clima.temperatura > 35 || clima.temperatura < 5;
    });
    resultado.innerHTML = `Temperatura: ${detalhesClima.temperatura}°C; Umidade: ${detalhesClima.umidade}%; Condição atual: ${detalhesClima.condicao}`;
    if (climaExtremo.length > 0) {
        resultado.innerHTML += " Clima Extremo!";
    }
}
const botao = document.querySelector('#btn');
botao.addEventListener('click', obterClima);
