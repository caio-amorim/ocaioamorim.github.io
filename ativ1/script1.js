document.addEventListener('DOMContentLoaded', function () {
    const inputTarefa = document.querySelector('#tarefa');
    const botaoAdicionar = document.querySelector('#adicionar');
    const listaTarefas = document.querySelector('#lista-tarefas');

    botaoAdicionar.addEventListener('click', function () {
        const novaTarefaTexto = inputTarefa.value.trim();
        if (novaTarefaTexto !== '') {
            const novaTarefa = document.createElement('li');
            novaTarefa.textContent = novaTarefaTexto;

            const botaoExcluir = document.createElement('button');
            botaoExcluir.textContent = 'Excluir';
            botaoExcluir.addEventListener('click', function () {
                listaTarefas.removeChild(novaTarefa);
            });

            novaTarefa.appendChild(botaoExcluir);
            listaTarefas.appendChild(novaTarefa);
            inputTarefa.value = '';
        }
    });

    listaTarefas.addEventListener('click', function (event) {
        const elementoClicado = event.target;
        if (elementoClicado.tagName === 'LI') {
            elementoClicado.classList.toggle('concluida');
        }
    });
});