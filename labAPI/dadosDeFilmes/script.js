const chaveAPI = 'ebdd1400';
const url = 'https://www.omdbapi.com/';
async function buscarFilme(titulo) {
    try {
        const resposta = await fetch(`${url}?s=${titulo}&apikey=${chaveAPI}`);
        const dados = await resposta.json();
        if (!dados || dados.Response !== "True") {
            throw new Error(dados.Error || 'Erro ao buscar filmes.');
        }
        return dados.Search;
    } catch (erro) {
        console.error(erro);
        return null;
    }
}
async function processarFilmes(titulo) {
    const filmes = await buscarFilme(titulo);
    if (!filmes) {
        document.getElementById('resultadosFilmes').textContent = 'Nenhum filme encontrado.';
        return;
    }
    const filmesMapeados = filmes.map(filme => ({
        titulo: filme.Title,
        ano: filme.Year,
        diretor: filme.Director || 'Desconhecido'
    }));
    document.getElementById('resultadosFilmes').innerHTML = filmesMapeados
        .map(filme => `<p>Título: ${filme.titulo}, Ano: ${filme.ano}, Diretor: ${filme.diretor}</p>`)
        .join('');
    const filmesApos2000 = filmesMapeados.filter(filme => {
        const ano = parseInt(filme.ano);
        return !isNaN(ano) && ano > 2000;
    });
    document.getElementById('filmesApos2000').innerHTML = filmesApos2000
        .map(filme => `<p>Título: ${filme.titulo}, Ano: ${filme.ano}, Diretor: ${filme.diretor}</p>`)
        .join('');
}
document.getElementById('buscarFilmes').addEventListener('click', () => {
    const titulo = document.getElementById('tituloFilme').value;
    if (!titulo) {
        alert('Por favor, digite um título de filme.');
        return;
    }
    processarFilmes(titulo);
});
