let biblioteca = [];
function adicionarLivro(titulo, autor) {
    const livro = {
        titulo,
        autor,
        disponivel: true,
        emprestimos: 0
    };
    biblioteca.push(livro);
}
function atualizarDisponibilidade(titulo) {
    const livro = biblioteca.find(l => l.titulo === titulo);
    if (livro) {
        livro.disponivel = !livro.disponivel;
        if (!livro.disponivel) {
            livro.emprestimos++;
        }
    }
}
function listarLivrosDisponiveis() {
    return biblioteca.filter(livro => livro.disponivel);
}
function listarTitulosEmprestados() {
    return biblioteca.filter(livro => !livro.disponivel).map(livro => livro.titulo);
}
document.querySelector("#adicionar").addEventListener("click", () => {
    const titulo = document.querySelector("#titulo").value;
    const autor = document.querySelector("#autor").value;
    if (titulo && autor) {
        adicionarLivro(titulo, autor);
        alert("Livro adicionado com sucesso!");
    }
});
document.querySelector("#atualizar").addEventListener("click", () => {
    const titulo = document.querySelector("#tituloAtualizar").value;
    if (titulo) {
        atualizarDisponibilidade(titulo);
        alert("ATUALIZADO!!");
    }
});
document.querySelector("#listarDisponiveis").addEventListener("click", () => {
    const listarD = listarLivrosDisponiveis();
    const livrosDisponiveis = document.querySelector("#livrosDisponiveis");
    if (listarD.length > 0) {
        livrosDisponiveis.innerHTML = listarD.map(livro => `Título: ${livro.titulo}, Autor: ${livro.autor}`).join("<br>");
    }
});
document.querySelector("#listarEmprestados").addEventListener("click", () => {
    const listarE = listarTitulosEmprestados();
    const titulosEmprestados = document.querySelector("#titulosEmprestados");
    if (listarE.length > 0) {
        titulosEmprestados.innerHTML = listarE.join("<br>");
    }
});
