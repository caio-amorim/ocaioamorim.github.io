const chaveAPI = 'ebdd1400';
const url = 'https://www.omdbapi.com/';
const btnBuscar = document.querySelector("#buscarFilmes");
async function buscarFilmes(titulo) {
    let resposta = await fetch(`${url}?s=${titulo}&apikey=${chaveAPI}`);
    resposta = await resposta.json();
    return resposta.Search;
}
async function obterDetalhesFilme(id) {
    let resposta = await fetch(`${url}?i=${id}&apikey=${chaveAPI}`);
    resposta = await resposta.json();
    return {
        titulo: resposta.Title,
        ano: resposta.Year,
        diretor: resposta.Director,
    };
}
async function processarFilmes(titulo) {
    const filmesBasicos = await buscarFilmes(titulo);
    const detalhes = await Promise.all(filmesBasicos.map(filme => obterDetalhesFilme(filme.imdbID)));
    const filmes = detalhes.map(filme => `<p>Título: ${filme.titulo}, Ano: ${filme.ano}, Diretor: ${filme.diretor}</p>`).join('');
    document.querySelector('#resultadosFilmes').innerHTML = filmes;
    let filmesApos2000 = [];
    detalhes.forEach(filme => {
        const ano = parseInt(filme.ano);
        if (ano > 2000) filmesApos2000.push(filme);
    });
    filmesApos2000 = filmesApos2000.map(filme => `<p>Título: ${filme.titulo}, Ano: ${filme.ano}, Diretor: ${filme.diretor}</p>`).join('');
    document.querySelector('#filmesApos2000').innerHTML = filmesApos2000;
}
btnBuscar.addEventListener('click', () => {
    const titulo = document.querySelector('#tituloFilme').value;
    processarFilmes(titulo);
});
