const saldo = document.getElementById('balance');
const receitasTotal = document.getElementById('money-plus');
const despesasTotal = document.getElementById('money-minus');
const listaTransacoes = document.getElementById('transactions');
const formulario = document.getElementById('form');
const descricao = document.getElementById('text');
const valor = document.getElementById('amount');

let transacoes = JSON.parse(localStorage.getItem('transactions')) || [];

const gerarID = () => Math.floor(Math.random() * 100000000);

const adicionarTransacao = (e) => {
  e.preventDefault();

  if (descricao.value.trim() === '' || valor.value.trim() === '') {
    alert('Por favor, adicione uma descrição e valor');
  } else {
    const transacao = {
      id: gerarID(),
      descricao: descricao.value,
      valor: +valor.value, // Converte o valor em número
    };

    transacoes.push(transacao);
    adicionarTransacaoDOM(transacao);
    atualizarValores();
    atualizarLocalStorage();

    descricao.value = '';
    valor.value = '';
  }
};

const adicionarTransacaoDOM = (transacao) => {
  const sinal = transacao.valor < 0 ? '-' : '+';
  const item = document.createElement('li');

  item.classList.add(transacao.valor < 0 ? 'minus' : 'plus');

  item.innerHTML = `
    ${transacao.descricao} <span>${sinal} R$${Math.abs(transacao.valor).toFixed(2)}</span>
    <button class="delete-btn" onclick="removerTransacao(${transacao.id})">x</button>
  `;

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
    valores.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) *
    -1
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
