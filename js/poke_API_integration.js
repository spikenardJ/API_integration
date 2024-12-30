document.getElementById("form-pokemon-search").addEventListener("submit", function(event) {
    event.preventDefault();

    const pokemonNameOrId = document.getElementById("pokemon-input").value.toLowerCase();
    const apiUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonNameOrId}`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error("Pokémon was not found.");
            }
            return response.json();
        })
        .then(data => {
            displayPokemonData(data);
        })
        .catch(error => {
            document.getElementById("pokemon-info").innerHTML = `<p class="text-danger">${error.message}</p>`;
        });
});
  
function displayPokemonData(pokemon) {
    const pokemonHtml = `
        <h4>${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h4>
        <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
        <p><strong>ID:</strong> ${pokemon.id}</p>
        <p><strong>Type:</strong> ${pokemon.types.map(typeInfo => typeInfo.type.name).join(", ")}</p>
        <p><strong>Abilities:</strong> ${pokemon.abilities.map(abilityInfo => abilityInfo.ability.name).join(", ")}</p>
    `;
    document.getElementById("pokemon-info").innerHTML = pokemonHtml;
}

async function fetchPokemon() {
    const pokemonName = document.getElementById("pokemonNameInput").value.toLowerCase();
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Pokémon was not found.");
        }
        const data = await response.json();
        displayPokemon(data);
    } catch (error) {
        document.getElementById("pokemonDetails").innerHTML = `<p>${error.message}</p>`;
    }
}

function displayPokemon(data) {
    const details = `
        <h2>${data.name.toUpperCase()}</h2>
        <img src="${data.sprites.front_default}" alt="${data.name}">
        <p><strong>Height:</strong> ${data.height}</p>
        <p><strong>Weight:</strong> ${data.weight}</p>
        <p><strong>Abilities:</strong> ${data.abilities.map(abilityInfo => abilityInfo.ability.name).join(", ")}</p>
        <p><strong>Type:</strong> ${data.types.map(type => type.type.name).join(", ")}</p>
        <p><strong>Base Stats:</strong></p>
        <ul>
            ${data.stats.map(stat => `<li>${stat.stat.name}: ${stat.base_stat}</li>`).join("")}
        </ul>
    `;
    document.getElementById("pokemonDetails").innerHTML = details;
}

function reset() {
    document.getElementById("pokemonName").value = ""
}