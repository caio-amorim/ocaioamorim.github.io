document.addEventListener("DOMContentLoaded", () => {
    const url = 'https://rafaelescalfoni.github.io/desenv_web/filmes.json';
    
    carregarDados(url, (response) => {
        if (response) {
            const catalogo = document.getElementById('catalogo');
            response.forEach(filme => {
                const ficha = document.createElement('div');
                ficha.classList.add('ficha-filme');
                let faixaEtariaClass;
                if (filme.classificacao <= 14) {
                    faixaEtariaClass = 'faixa-verde';
                } else if (filme.classificacao < 18) {
                    faixaEtariaClass = 'faixa-amarela';
                } else {
                    faixaEtariaClass = 'faixa-vermelha';
                }
                ficha.innerHTML = `
                    <img src="${filme.figura}" alt="${filme.titulo}">
                    <h2>${filme.titulo}</h2>
                    <p>${filme.resumo}</p>
                    <p class="faixa-etaria ${faixaEtariaClass}">Classificação: ${filme.classificacao} anos</p>
                    <p><strong>Gêneros:</strong> ${filme.generos.join(', ')}</p>
                    <p><strong>Elenco:</strong> ${filme.elenco.join(', ')}</p>
                    <div class="rating">${gerarEstrelas(filme.opinioes)}</div>
                `;
                catalogo.appendChild(ficha);
            });
        }
    });
});
const carregarDados = (url, callback) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            callback(response);
        }
    };
    xhr.onerror = () => {
        console.error('Erro ao carregar os dados');
        callback(null);
    };
    xhr.send();
}
const gerarEstrelas = (opinioes) => {
    const totalRating = opinioes.reduce((sum, opiniao) => sum + opiniao.rating, 0);
    const mediaRating = totalRating / opinioes.length;
    let arredondado = mediaRating - (mediaRating % 1);
    if (mediaRating % 1 >= 0.5) {
        arredondado += 1;
    }
    let estrelas = '';

    for (let i = 0; i < 5; i++) {
        estrelas += i < arredondado ? '<span class="star">★</span>' : '<span class="star">☆</span>';
    }

    return estrelas;
}
