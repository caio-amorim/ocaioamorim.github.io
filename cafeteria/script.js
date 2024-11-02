const criarProduto = (id, nome, categoria, img, valorUnitario, quantidade = 1) => ({
    id, nome, categoria, foto: img, valorUnitario, quantidade
});

const cardapio = [
    criarProduto(1, "Capuccino", "Bebidas Quentes", "https://rafaelescalfoni.github.io/desenv_web/img/capuccino.png", 7),
    criarProduto(2, "Espresso", "Bebidas Quentes", "https://rafaelescalfoni.github.io/desenv_web/img/espresso.png", 4),
    criarProduto(3, "Frapuccino", "Bebidas Quentes", "https://rafaelescalfoni.github.io/desenv_web/img/frapuccino.png", 8),
    criarProduto(4, "Chococcino", "Bebidas Quentes", "https://rafaelescalfoni.github.io/desenv_web/img/chococcino.png", 7),
    criarProduto(5, "Chocolate Quente", "Bebidas Quentes", "https://rafaelescalfoni.github.io/desenv_web/img/chocolate_quente.png", 10),
    criarProduto(6, "Frapê", "Bebidas Frias", "https://rafaelescalfoni.github.io/desenv_web/img/frape.png", 12),
    criarProduto(7, "Suco de Laranja", "Bebidas Frias", "https://rafaelescalfoni.github.io/desenv_web/img/suco_laranja.png", 10),
    criarProduto(8, "Açaí", "Doces", "https://rafaelescalfoni.github.io/desenv_web/img/acai.png", 12),
    criarProduto(9, "Bolo de Laranja", "Doces", "https://rafaelescalfoni.github.io/desenv_web/img/bolo_laranja.png", 8)
];

const pedidosContainer = document.querySelector("#pedidos");
const totalDisplay = document.querySelector("#valorTotal");
const cardapioContainer = document.querySelector("#cardapio");
const carregarCardapio = lista => {
    lista.forEach(produto => {
        const itemHTML = `
            <li data-id="${produto.id}">
                <figure>
                    <img src="${produto.foto}" alt="${produto.nome}">
                    <figcaption>${produto.nome}<strong> R$${produto.valorUnitario.toFixed(2)}</strong></figcaption>
                </figure>
            </li>`;
        cardapioContainer.insertAdjacentHTML("beforeend", itemHTML);
    });
};

const atualizarPedidos = () => {
    pedidosContainer.innerHTML = "";
    cesta.forEach(pedido => {
        const pedidoHTML = `
            <li data-id="${pedido.id}">
                <figure>
                    <img src="${pedido.foto}" alt="${pedido.nome}">
                    <figcaption>${pedido.nome}<strong> R$${(pedido.valorUnitario * pedido.quantidade).toFixed(2)}</strong></figcaption>
                </figure>
            </li>`;
        pedidosContainer.insertAdjacentHTML("beforeend", pedidoHTML);
    });
};

const atualizarTotal = () => {
    const total = cesta.reduce((acc, produto) => acc + (produto.valorUnitario * produto.quantidade), 0);
    totalDisplay.textContent = `Total - R$${total.toFixed(2)}`;
};

const adicionarAoPedido = produto => {
    const itemExistente = cesta.find(p => p.id === produto.id);
    if (itemExistente) {
        itemExistente.quantidade++;
    } else {
        cesta.push({ ...produto });
    }
    salvarPedidosNoLocalStorage();
    atualizarPedidos();
    atualizarTotal();
};

const salvarPedidosNoLocalStorage = () => {
    cesta.forEach(produto => localStorage.setItem(produto.id, produto.quantidade));
};

const carregarPedidosDoLocalStorage = () => {
    cardapio.forEach(produto => {
        const quantidade = parseInt(localStorage.getItem(produto.id));
        if (quantidade) {
            produto.quantidade = quantidade;
            cesta.push(produto);
        }
    });
};

cardapioContainer.addEventListener("click", event => {
    const id = event.target.closest("li").dataset.id;
    if (id) {
        const produto = cardapio.find(p => p.id == id);
        adicionarAoPedido(produto);
    }
});

let cesta = [];
carregarCardapio(cardapio);
carregarPedidosDoLocalStorage();
atualizarPedidos();
atualizarTotal();
