//Classe Pessoa e Herança
class Pessoa {
    constructor(nome, idade, sexo) {
        this.nome = nome;
        this.idade = idade;
        this.sexo = sexo;
    }
    apresentar() {
        return `Olá, meu nome é ${this.nome}, tenho ${this.idade} anos e sou ${this.sexo}.`;
    }
}
class Aluno extends Pessoa {
    constructor(nome, idade, sexo, matricula, curso) {
        super(nome, idade, sexo);
        this.matricula = matricula;
        this.curso = curso;
    }

    apresentar() {
        return `${super.apresentar()} Estou matriculado no curso de ${this.curso}.`;
    }
}
const aluno = new Aluno('João', 25, 'homem', 12345, 'Engenharia');
console.log(aluno.apresentar());

//Classe ContaBancaria
class ContaBancaria {
    constructor(titular, saldo) {
        this.titular = titular;
        this.saldo = saldo;
    }
    depositar(valor) {
        this.saldo += valor;
    }
    sacar(valor) {
        if (this.saldo >= valor) {
            this.saldo -= valor;
        } else {
            console.log('Saldo insuficiente.');
        }
    }
    mostrarSaldo() {
        console.log(`Saldo: R$ ${this.saldo}`);
    }
}
class ContaCorrente extends ContaBancaria {
    constructor(titular, saldo, limite) {
        super(titular, saldo);
        this.limite = limite;
    }
    sacar(valor) {
        if (this.saldo + this.limite >= valor) {
            this.saldo -= valor;
        } else {
            console.log('Saldo insuficiente, incluindo o limite.');
        }
    }
}


//Sistema de Gerenciamento de Produtos
class Produto {
    constructor(nome, preco, quantidadeEmEstoque) {
        this.nome = nome;
        this.preco = preco;
        this.quantidadeEmEstoque = quantidadeEmEstoque;
    }
    atualizarEstoque(quantidade) {
        this.quantidadeEmEstoque += quantidade;
    }
    calcularValorEstoque() {
        return this.preco * this.quantidadeEmEstoque;
    }
}
class ProdutoPerecivel extends Produto {
    constructor(nome, preco, quantidadeEmEstoque, dataDeValidade) {
        super(nome, preco, quantidadeEmEstoque);
        this.dataDeValidade = dataDeValidade;
    }
    verificarValidade(dataAtual) {
        return dataAtual <= this.dataDeValidade ? 'Produto válido' : 'Produto expirado';
    }
}

//Classe Veiculo
class Veiculo {
    constructor(marca, modelo, ano) {
        this.marca = marca;
        this.modelo = modelo;
        this.ano = ano;
    }
    descrever() {
        return `Marca: ${this.marca}, Modelo: ${this.modelo}, Ano: ${this.ano}`;
    }
}
class Carro extends Veiculo {
    constructor(marca, modelo, ano, portas) {
        super(marca, modelo, ano);
        this.portas = portas;
    }
    descrever() {
        return `${super.descrever()}, Portas: ${this.portas}`;
    }
}
class Moto extends Veiculo {
    constructor(marca, modelo, ano, cilindradas) {
        super(marca, modelo, ano);
        this.cilindradas = cilindradas;
    }

    descrever() {
        return `${super.descrever()}, Cilindradas: ${this.cilindradas}`;
    }
}

//Classe de Gerenciamento de Funcionários
class Funcionario {
    constructor(nome, salario) {
        this.nome = nome;
        this.salario = salario;
    }
    aumentarSalario(percentual) {
        this.salario += this.salario * (percentual / 100);
    }
    mostrarInformacoes() {
        console.log(`Nome: ${this.nome}, Salário: R$ ${this.salario}`);
    }
}
class Gerente extends Funcionario {
    constructor(nome, salario, departamento) {
        super(nome, salario);
        this.departamento = departamento;
    }

    mostrarInformacoes() {
        console.log(`Nome: ${this.nome}, Salário: R$ ${this.salario}, Departamento: ${this.departamento}`);
    }
}
class Estagiario extends Funcionario {
    aumentarSalario(percentual) {
        if (percentual > 10) percentual = 10;
        super.aumentarSalario(percentual);
    }
}

//Sistema de Biblioteca
class Livro {
    constructor(titulo, autor, disponivel) {
        this.titulo = titulo;
        this.autor = autor;
        this.disponivel = disponivel;
    }
    emprestar() {
        if (this.disponivel) {
            this.disponivel = false;
        } else {
            console.log('Livro não disponível.');
        }
    }
    devolver() {
        this.disponivel = true;
    }
    status() {
        return `${this.titulo} - ${this.disponivel ? 'Disponível' : 'Emprestado'}`;
    }
}
class Biblioteca {
    constructor() {
        this.livros = [];
    }
    adicionarLivro(livro) {
        this.livros.push(livro);
    }
    listarLivros() {
        this.livros.forEach(livro => console.log(livro.status()));
    }
    buscarLivro(titulo) {
        return this.livros.filter(livro => livro.titulo === titulo);
    }
}

//Classe Jogador para Jogos Online
class Jogador {
    constructor(nome, nivel, experiencia) {
        this.nome = nome;
        this.nivel = nivel;
        this.experiencia = experiencia;
    }
    ganharExperiencia(pontos) {
        this.experiencia += pontos;
        this.subirDeNivel();
    }
    subirDeNivel() {
        while (this.experiencia >= 100) {
            this.experiencia -= 100;
            this.nivel++;
        }
    }
}
class Guerreiro extends Jogador {
    constructor(nome, nivel, experiencia, forca) {
        super(nome, nivel, experiencia);
        this.forca = forca;
    }
    subirDeNivel() {
        super.subirDeNivel();
        this.forca += 10;
    }
}

//Classe Turma e Alunos
class Turma {
    constructor(curso) {
        this.curso = curso;
        this.alunos = [];
    }
    adicionarAluno(nome) {
        this.alunos.push(nome);
    }
    removerAluno(nome) {
        this.alunos = this.alunos.filter(aluno => aluno !== nome);
    }
    listarAlunos() {
        return this.alunos;
    }
}
class TurmaOnline extends Turma {
    constructor(curso, linkDeAcesso) {
        super(curso);
        this.linkDeAcesso = linkDeAcesso;
    }
    listarAlunos() {
        return `${super.listarAlunos().join(', ')} - Link de Acesso: ${this.linkDeAcesso}`;
    }
}

//Classe para Gerenciar Tarefas
class Tarefa {
    constructor(descricao) {
        this.descricao = descricao;
        this.concluida = false;
    }
    marcarConcluida() {
        this.concluida = true;
    }
    descrever() {
        return `${this.descricao} - ${this.concluida ? 'Concluída' : 'Pendência'}`;
    }
}
class ListaDeTarefas {
    constructor() {
        this.tarefas = [];
    }
    adicionarTarefa(tarefa) {
        this.tarefas.push(tarefa);
    }
    listarConcluidas() {
        return this.tarefas.filter(tarefa => tarefa.concluida);
    }
}

//Classe para Controle de Estacionamento
class Carro {
    constructor(placa, modelo) {
        this.placa = placa;
        this.modelo = modelo;
    }
    descrever() {
        return `Placa: ${this.placa}, Modelo: ${this.modelo}`;
    }
}
class Estacionamento {
    constructor(vagasTotais) {
        this.vagasTotais = vagasTotais;
        this.carros = [];
    }
    adicionarCarro(carro) {
        if (this.carros.length < this.vagasTotais) {
            this.carros.push(carro);
        } else {
            console.log('Vagas insuficientes.');
        }
    }
    removerCarro(placa) {
        this.carros = this.carros.filter(carro => carro.placa !== placa);
    }
    listarCarros() {
        return this.carros.map(carro => carro.descrever()).join('\n');
    }
}
