const pokemonName = document.querySelector('.pokemon-name');
const pokemonNumber = document.querySelector('.pokemon-number');
const pokemonImage = document.querySelector('.pokemon-image');
const form = document.querySelector('.form');
const input = document.querySelector('.input-search');
const btnAnt = document.querySelector('.btn-ant');
const btnProx = document.querySelector('.btn-prox');
let searchPokemon = 1;

async function fetchPokemon(pokemon) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if(response.status === 200) {
        const data = await response.json();
        return data;
    } 
}

async function renderPokemon(pokemon){
    pokemonName.innerHTML = 'Carregando...';
    pokemonNumber.innerHTML = '';
    const data = await fetchPokemon(pokemon);
    if(data) {
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        if(data.id < 650){
            pokemonImage.src = data.sprites.versions['generation-v']['black-white'].animated['front_default'];
        } else if(data.id >= 650){
            pokemonImage.src = data.sprites.front_default;
        }
        input.value = '';
        searchPokemon = data.id;
    } else {
        pokemonName.innerHTML = 'Não encontrado';
        pokemonNumber.innerHTML = '';
        pokemonImage.src = './imagens/what-does-this-mean-v0-hyx2v97q0whb1.webp';
    }
    
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
});

btnAnt.addEventListener('click', (event) => {
    if(searchPokemon > 1){
        searchPokemon -= 1;
        renderPokemon(searchPokemon);
    } 
});

btnProx.addEventListener('click', (event) => {
    searchPokemon += 1;
    renderPokemon(searchPokemon);
});

renderPokemon(searchPokemon);