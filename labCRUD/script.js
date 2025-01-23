class Livro {
    constructor(id, titulo, autor, anoPublicacao, disponivel = true) {
        this.id = id;
        this.titulo = titulo;
        this.autor = autor;
        this.anoPublicacao = anoPublicacao;
        this.disponivel = disponivel;
    }

    detalhes() {
        return `ID: ${this.id}, Título: ${this.titulo}, Autor: ${this.autor}, Ano: ${this.anoPublicacao}, Disponível: ${this.disponivel}`;
    }
}
class Biblioteca {
    constructor() {
        this.livros = [];
        this.carregarDados();
    }
    adicionarLivro(livro) {
        this.livros.push(livro);
        this.salvarDados();
    }
    listarLivros() {
        return this.livros;
    }
    atualizarLivro(id, novosDados) {
        const livro = this.livros.find(l => l.id === id);
        if (livro) {
            livro.titulo = novosDados.titulo;
            livro.autor = novosDados.autor;
            livro.anoPublicacao = novosDados.anoPublicacao;
            livro.disponivel = novosDados.disponivel;
            this.salvarDados();
        }
    }
    removerLivro(id) {
        this.livros = this.livros.filter(l => l.id !== id);
        this.salvarDados();
    }
    salvarDados() {
        const livrosString = this.livros
            .map(livro => `${livro.id}|${livro.titulo}|${livro.autor}|${livro.anoPublicacao}|${livro.disponivel}`)
            .join("\n");
        localStorage.setItem('biblioteca', livrosString);
    }
    carregarDados() {
        const dados = localStorage.getItem('biblioteca');
        if (dados) {
            this.livros = dados.split("\n").map(linha => {
                const [id, titulo, autor, anoPublicacao, disponivel] = linha.split('|');
                return new Livro(Number(id), titulo, autor, Number(anoPublicacao), disponivel === 'true');
            });
        }
    }
}
const biblioteca = new Biblioteca();
function adicionarLivro() {
    const id = Number(document.querySelector('#id').value);
    const titulo = document.querySelector('#titulo').value;
    const autor = document.querySelector('#autor').value;
    const anoPublicacao = Number(document.querySelector('#anoPublicacao').value);
    if (id && titulo && autor && anoPublicacao) {
        const livro = new Livro(id, titulo, autor, anoPublicacao);
        biblioteca.adicionarLivro(livro);
        listarLivros();
    } else {
        alert('Preencha todos os campos!');
    }
}
function listarLivros() {
    const tabela = document.querySelector('#tabelaLivros');
    tabela.innerHTML = `
        <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Autor</th>
            <th>Ano</th>
            <th>Disponível</th>
            <th>Ações</th>
        </tr>
    `;
    biblioteca.listarLivros().forEach(livro => {
        const linha = document.createElement('tr');
        let disponivel = 'Não';
        if (livro.disponivel) {
            disponivel = 'Sim';
        }
        linha.innerHTML = `
            <td>${livro.id}</td>
            <td>${livro.titulo}</td>
            <td>${livro.autor}</td>
            <td>${livro.anoPublicacao}</td>
            <td>${disponivel}</td>
            <td>
                <button onclick="removerLivro(${livro.id})">Remover</button>
            </td>
        `;
        tabela.appendChild(linha);
    });
}
function removerLivro(id) {
    biblioteca.removerLivro(id);
    listarLivros();
}
document.querySelector('#adicionarLivroBtn').addEventListener('click', adicionarLivro);
document.querySelector('#listarLivrosBtn').addEventListener('click', listarLivros);
