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
        ivro.titulo = novosDados.titulo;
        livro.autor = novosDados.autor;
        livro.anoPublicacao = novosDados.anoPublicacao;
        livro.disponivel = novosDados.disponivel;
    }
    removerLivro(id) {
        this.livros = this.livros.filter(l => l.id !== id);
        this.salvarDados();
    }
    salvarDados() {
        const livrosString = this.livros.map(livro => `${livro.id}|${livro.titulo}|${livro.autor}|${livro.anoPublicacao}|${livro.disponivel}`).join("\n");
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
const livro1 = new Livro(1, 'O Senhor dos Anéis', 'J.R.R. Tolkien', 1954, true);
biblioteca.adicionarLivro(livro1);
const livro2 = new Livro(2, '1984', 'George Orwell', 1949, false);
biblioteca.adicionarLivro(livro2);
console.log('Lista de Livros:');
biblioteca.listarLivros().forEach(livro => console.log(livro.detalhes()));
biblioteca.atualizarLivro(1, { titulo: 'O Hobbit', anoPublicacao: 1937 });
console.log('Após atualização:');
biblioteca.listarLivros().forEach(livro => console.log(livro.detalhes()));
biblioteca.removerLivro(2);
console.log('Após remoção:');
biblioteca.listarLivros().forEach(livro => console.log(livro.detalhes()));
