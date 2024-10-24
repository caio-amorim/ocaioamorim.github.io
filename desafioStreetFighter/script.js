const ryu = document.getElementById('ryu');
const hadouken = document.getElementById('hadouken');
const hadoukenSound = document.getElementById('hadouken-sound');

let ryuPositicao = 50;

const moverRyu = (direcao) => {
    if (direcao === 'esquerda' && ryuPosition > 0) {
        ryuPosition -= 10; 
    } else if (direcao === 'direita' && ryuPosition < 700) {
        ryuPosition += 10; 
    }
    ryu.style.left = ryuPosition + 'px';
};

const lancarHadouken = () => {
    hadouken.style.display = 'block';
    hadouken.style.left = ryuPosition + 100 + 'px';
    hadoukenSound.play();

    let hadoukenPosition = ryuPosition + 100;
    const intervalo = setInterval(() => {
        if (hadoukenPosition < 800) {
            hadoukenPosition += 10;
            hadouken.style.left = hadoukenPosition + 'px';
        } else {
            clearInterval(intervalo);
            hadouken.style.display = 'none';
        }
    }, 50);
};

document.addEventListener('keydown', (evento) => {
    if (evento.key === 'ArrowLeft') {
        moverRyu('esquerda');
    } else if (evento.key === 'ArrowRight') {
        moverRyu('direita');
    } else if (evento.key === ' ') {
        lancarHadouken();
    }
});
