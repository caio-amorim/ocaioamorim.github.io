// Seleciona os elementos do DOM
const saldo = document.getElementById('balance');
const receitasTotal = document.getElementById('money-plus');
const despesasTotal = document.getElementById('money-minus');
const listaTransacoes = document.getElementById('transactions');
const formulario = document.getElementById('form');
const descricao = document.getElementById('text');
const valor = document.getElementById('amount');

// Inicializa as transações no localStorage ou vazio se não houver
let transacoes = JSON.parse(localStorage.getItem('transactions')) || [];

// Função para gerar uma ID única
const gerarID = () => Math.floor(Math.random() * 100000000);

// Adiciona uma nova transação
const adicionarTransacao = (e) => {
  // Evita o envio do formulário
  if (descricao.value === '' || descricao.value === ' ' || valor.value === '' || valor.value === ' ') {
    alert('Por favor, adicione uma descrição e valor');
    return; // Retorna se a validação falhar
  }

  const transacao = {
    id: gerarID(),
    descricao: descricao.value,
    valor: +valor.value, // Converte o valor em número
    data: new Date().toISOString().split('T')[0], // Formato 'YYYY-MM-DD'
  };

  transacoes.push(transacao);
  adicionarTransacaoDOM(transacao);
  atualizarValores();
  atualizarLocalStorage();

  descricao.value = '';
  valor.value = '';
};

// Adiciona a transação ao DOM
const adicionarTransacaoDOM = (transacao) => {
  const sinal = transacao.valor < 0 ? '-' : '+';
  const item = document.createElement('li');

  item.classList.add(transacao.valor < 0 ? 'minus' : 'plus');

  item.innerHTML = `
    ${transacao.descricao} <span>${sinal} R$${Math.abs(transacao.valor).toFixed(2)}</span> <small>${transacao.data}</small>
    <button class="delete-btn" onclick="removerTransacao(${transacao.id})">x</button>
  `;

  listaTransacoes.appendChild(item);
};

// Atualiza os valores de saldo, receitas e despesas
const atualizarValores = () => {
  const valores = transacoes.map(transacao => transacao.valor);

  const total = valores.reduce((acc, item) => (acc += item), 0).toFixed(2);

  const receitas = valores
    .filter(item => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);

  const despesas = (
    valores.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) *
    -1
  ).toFixed(2);

  saldo.innerText = `R$ ${total}`;
  receitasTotal.innerText = `+ R$${receitas}`;
  despesasTotal.innerText = `- R$${despesas}`;
};

// Remove a transação pelo ID
const removerTransacao = (id) => {
  transacoes = transacoes.filter(transacao => transacao.id !== id);

  atualizarLocalStorage();
  iniciar();
};

// Atualiza as transações no localStorage
const atualizarLocalStorage = () => {
  localStorage.setItem('transactions', JSON.stringify(transacoes));
};

// Inicializa o app
const iniciar = () => {
  listaTransacoes.innerHTML = '';
  transacoes.forEach(adicionarTransacaoDOM);
  atualizarValores();
};

iniciar();

// Função para gerar relatório de transações por período
const gerarRelatorio = () => {
  const dataInicial = new Date(document.getElementById('start-date').value);
  const dataFinal = new Date(document.getElementById('end-date').value);
  
  const transacoesFiltradas = transacoes.filter(transacao => {
    const dataTransacao = new Date(transacao.data);
    return dataTransacao >= dataInicial && dataTransacao <= dataFinal;
  });

  // Aqui você pode exibir as transações filtradas como desejar
  listaTransacoes.innerHTML = '';
  transacoesFiltradas.forEach(adicionarTransacaoDOM);
  
  gerarGraficos(transacoesFiltradas);
};

document.getElementById('generate-report').addEventListener('click', gerarRelatorio);

// Função para gerar gráficos com Chart.js
const gerarGraficos = (transacoes) => {
  const categorias = {
    receitas: {},
    despesas: {},
  };

  transacoes.forEach(transacao => {
    const categoria = transacao.valor < 0 ? 'despesas' : 'receitas';
    const categoriaNome = transacao.descricao; // Aqui você pode ajustar para usar categorias específicas

    if (!categorias[categoria][categoriaNome]) {
      categorias[categoria][categoriaNome] = 0;
    }
    categorias[categoria][categoriaNome] += Math.abs(transacao.valor);
  });

  const ctx = document.getElementById('myChart').getContext('2d');
  const grafico = new Chart(ctx, {
    type: 'pie', // ou 'bar' para gráfico de barras
    data: {
      labels: [], // Array de labels
      datasets: [{
        label: 'Receitas e Despesas',
        data: [], // Array de dados
        backgroundColor: ['#36A2EB', '#FF6384'],
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
    },
  });

  // Preencher labels e dados usando for...in
  for (const categoria in categorias) {
    for (const nome in categorias[categoria]) {
      grafico.data.labels.push(nome);
      grafico.data.datasets[0].data.push(categorias[categoria][nome]);
    }
  }

  grafico.update(); // Atualiza o gráfico
};

// Event listener para o formulário
formulario.addEventListener('submit', adicionarTransacao);
