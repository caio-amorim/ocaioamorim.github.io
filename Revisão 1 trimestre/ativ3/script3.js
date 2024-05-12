const palavras = ["javascript", "html", "css", "programacao", "computador"];
let palavraOculta = palavras[Math.floor(Math.random() * palavras.length)];
let letrasErradas = [];
let tentativasRestantes = 6;

document.querySelector("#adivinhar").addEventListener("click", function () {
    const letra = document.querySelector("#letra").value.toLowerCase();
    if (letra.length !== 1 || !/^[a-zA-Z]+$/.test(letra)) {
        alert("Por favor, insira uma letra válida.");
        return;
    }
    if (palavraOculta.includes(letra)) {

        const palavraOcultaArray = palavraOculta.split('');
        for (let i = 0; i < palavraOculta.length; i++) {
            if (palavraOcultaArray[i] === letra) {
                document.querySelector("#palavra-oculta").textContent =
                    document.querySelector("#palavra-oculta").textContent.substr(0, i * 2) + letra +
                    document.querySelector("#palavra-oculta").textContent.substr(i * 2 + 1);
            }
        }
    } else {
        letrasErradas.push(letra);
        tentativasRestantes--;
        document.querySelector("#letras-erradas").textContent = "Letras erradas: " + letrasErradas.join(', ');
        document.querySelector("#tentativas").textContent = "Tentativas restantes: " + tentativasRestantes;
    }

    if (tentativasRestantes === 0) {
        alert("Você perdeu! A palavra era: " + palavraOculta);
        resetarJogo();
    } else if (!document.querySelector("#palavra-oculta").textContent.includes('_')) {
        alert("Parabéns! Você venceu!");
        resetarJogo();
    }
});

function resetarJogo() {
    palavraOculta = palavras[Math.floor(Math.random() * palavras.length)];
    letrasErradas = [];
    tentativasRestantes = 6;
    document.querySelector("#palavra-oculta").textContent = "_ ".repeat(palavraOculta.length);
    document.querySelector("#letras-erradas").textContent = "Letras erradas: ";
    document.querySelector("#tentativas").textContent = "Tentativas restantes: " + tentativasRestantes;
}