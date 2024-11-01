const saldo = document.getElementById('balance');
const receitasTotal = document.getElementById('money-plus');
const despesasTotal = document.getElementById('money-minus');
const listaTransacoes = document.getElementById('transactions');
const formulario = document.getElementById('form');
const descricao = document.getElementById('text');
const valor = document.getElementById('amount');
const dataTransacao = document.getElementById('date');
const startDate = document.getElementById('start-date');
const endDate = document.getElementById('end-date');
const botaoRelatorio = document.getElementById('gerar-relatorio');

let transacoes = JSON.parse(localStorage.getItem('transactions')) || [];

const gerarID = () => Math.floor(Math.random() * 100000000);

const adicionarTransacao = (e) => {
  e.preventDefault();

  if (descricao.value.trim() === '' || valor.value.trim() === '' || !dataTransacao.value) {
    alert('Por favor, adicione uma descrição, valor e data');
  } else {
    const transacao = {
      id: gerarID(),
      descricao: descricao.value,
      valor: +valor.value,
      data: dataTransacao.value, // Salva a data como string
    };

    transacoes.push(transacao);
    adicionarTransacaoDOM(transacao);
    atualizarValores();
    atualizarLocalStorage();

    descricao.value = '';
    valor.value = '';
    dataTransacao.value = '';
  }
};

const adicionarTransacaoDOM = (transacao) => {
  const sinal = transacao.valor < 0 ? '-' : '+';
  const item = document.createElement('li');

  item.classList.add(transacao.valor < 0 ? 'minus' : 'plus');
  item.innerHTML = 
    `${transacao.descricao} <span>${sinal} R$${Math.abs(transacao.valor).toFixed(2)}</span>
    <button class="delete-btn" onclick="removerTransacao(${transacao.id})">x</button>`;

  listaTransacoes.appendChild(item);
};

const atualizarValores = () => {
  const valores = transacoes.map(transacao => transacao.valor);
  const total = valores.reduce((acc, item) => (acc += item), 0).toFixed(2);
  const receitas = valores
    .filter(item => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);
  const despesas = (
    valores.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) * -1
  ).toFixed(2);

  saldo.innerText = `R$ ${total}`;
  receitasTotal.innerText = `+ R$${receitas}`;
  despesasTotal.innerText = `- R$${despesas}`;
};

const removerTransacao = (id) => {
  transacoes = transacoes.filter(transacao => transacao.id !== id);
  atualizarLocalStorage();
  iniciar();
};

const atualizarLocalStorage = () => {
  localStorage.setItem('transactions', JSON.stringify(transacoes));
};

const iniciar = () => {
  listaTransacoes.innerHTML = '';
  transacoes.forEach(adicionarTransacaoDOM);
  atualizarValores();
};

iniciar();

formulario.addEventListener('submit', adicionarTransacao);

botaoRelatorio.addEventListener('click', () => {
  const periodoTransacoes = transacoes.filter(transacao => {
    const dataTransacao = new Date(transacao.data);
    return (
      (!startDate.value || dataTransacao >= new Date(startDate.value)) &&
      (!endDate.value || dataTransacao <= new Date(endDate.value))
    );
  });
  
  gerarGraficos(periodoTransacoes);
});

function gerarGraficos(transacoesFiltradas) {
  const categoriasReceitas = {};
  const categoriasDespesas = {};

  transacoesFiltradas.forEach(transacao => {
    const { valor, descricao } = transacao;
    if (valor > 0) {
      categoriasReceitas[descricao] = (categoriasReceitas[descricao] || 0) + valor;
    } else {
      categoriasDespesas[descricao] = (categoriasDespesas[descricao] || 0) + Math.abs(valor);
    }
  });

  criarGrafico('grafico-receitas', 'Receitas', categoriasReceitas);
  criarGrafico('grafico-despesas', 'Despesas', categoriasDespesas);
}

function criarGrafico(idCanvas, titulo, dados) {
  const ctx = document.getElementById(idCanvas).getContext('2d');
  new Chart(ctx, {
    type: 'pie',
    data: {
      labels: Object.keys(dados),
      datasets: [{
        label: titulo,
        data: Object.values(dados),
        backgroundColor: [
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: titulo
        }
      }
    }
  });
}
