const chaveApi = "ebdd1400";
const titulo = document.querySelector('#tituloFilme');
const buscarFilme = document.querySelector('#buscarFilmes');
const resultado = document.querySelector('#filmesApos2000');
async function buscarFilmePorTitulo(titulo) {
    let resposta = await fetch(`https://www.omdbapi.com/?apikey=${chaveApi}&t=${titulo}`);
    resposta = await resposta.json();
    return resposta;
}
function exibirFilmes(elemento, filmes) {
    elemento.innerHTML = filmes.map(filme => `<h3>${filme.titulo} (${filme.ano})</h3><p><strong>Diretor:</strong>${filme.diretor}</p>`).join('');
}
async function gerenciarFilmes() {
    const tituloFilme = titulo.value.trim();
    let filme = await buscarFilmePorTitulo(tituloFilme);
    if (filme && filme.Response === "True") {
        filme = {
            titulo: filme.Title,
            ano: parseInt(filme.Year, 10),
            diretor: filme.Director,
        };
        exibirFilmes(resultado, [filme]);
        if (filme.ano > 2000) {
            exibirFilmes(resultado, [filme]);
        } 
    }
}
buscarFilme.addEventListener('click', gerenciarFilmes);
