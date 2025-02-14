const chaveApi = 'a39e1f50b887e90640b4ab9c7786c25f';
const url = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';
const pesquisa = document.querySelector('#nomeCidade');
const icone = document.querySelector('.icone-clima');

async function verificarClima(cidade) {
    try {
        const response = await fetch(url + cidade + `&appid=${chaveApi}`);
        const data = await response.json();
        document.querySelector('.cidade').textContent = data.name;
        document.querySelector('.temp').textContent = `${Math.round(data.main.temp)}°C`;
        document.querySelector('.umidade').textContent = `${data.main.humidity}%`;
        document.querySelector('.vento').textContent = `${data.wind.speed} km/h`;

        switch (data.weather[0].main) {
            case 'Clouds':
                icone.src = 'imagens/clouds.png';
                icone.alt = 'Nublado';
                break;
            case 'Clear':
                icone.src = 'imagens/clear.png';
                icone.alt = 'Ensolarado';
                break;
            case 'Rain':
                icone.src = 'imagens/rain.png';
                icone.alt = 'Chuvoso';
                break;
            case 'Drizzle':
                icone.src = 'imagens/drizzle.png';
                icone.alt = 'Chuviscando';
                break;
            case 'Mist':
                icone.src = 'imagens/mist.png';
                icone.alt = 'Neblina';
                break;
            default:
                icone.src = 'imagens/clear.png';
                icone.alt = 'Condição climática desconhecida';
        }

        icone.classList.remove('animate-icon');
        void icone.offsetWidth;
        icone.classList.add('animate-icon');

        document.querySelector('.clima').style.display = 'block';
        document.querySelector('.erro').style.display = 'none';
    } catch (erro) {
        document.querySelector('.erro').style.display = 'block';
        document.querySelector('.clima').style.display = 'none';
    }
}

document.querySelector('#btnBuscar').addEventListener('click', () => {
    verificarClima(pesquisa.value);
});
