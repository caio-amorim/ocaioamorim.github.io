const produtos = [
    { nome: 'Laptop', preco: 1000, quantidade: 5 },
    { nome: 'Mouse', preco: 20, quantidade: 10 },
    { nome: 'Teclado', preco: 30, quantidade: 8 }
];

function calcularValorTotalEstoque(produtos) {
    let valorTotal = 0;
    for (const produto of produtos) {
        valorTotal += produto.preco * produto.quantidade;
    }
    return valorTotal;
}

const valorTotal = calcularValorTotalEstoque(produtos);
console.log('Valor total do estoque:', valorTotal);