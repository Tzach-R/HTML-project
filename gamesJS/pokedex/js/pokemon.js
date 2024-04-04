const maxPokemon = 1281;
const listWrapper = document.querySelector(".listWrapper");
const searchInput = document.querySelector("#searchInput");
const numberFilter = document.querySelector("#number");
const nameFilter = document.querySelector("#name");
const notFound = document.querySelector("#notFound");

let pokemonsAll = [];

fetch(`https://pokeapi.co/api/v2/pokemon?limit=${maxPokemon}`)
    .then((response) => response.json())
    .then((data) => {
        pokemonsAll = data.results;
        showPokemons(pokemonsAll);
    });

async function fetchDataB4Redirect(id) {
    try {
        const [pokemon, pokemonSpecies] = await Promise.all([
            fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((res) =>
                res.json()
            ),
            fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`).then((res) =>
                res.json()
            ),
        ]);
        return true;
    } catch (error) {
        console.error("Failed to fetch data before redirect");
    }
}

function showPokemons(pokemon) {
    listWrapper.innerHTML = "";
    pokemon.forEach((pokemon) => {
        const pokeId = pokemon.url.split("/")[6];
        const listItem = document.createElement(`div`);
        listItem.className = "listItem";
        listItem.innerHTML = `
        <div class="numberWrap">
        <p class="captionFonts">#${pokeId}</p>
        </div>
        <div class="imgWrap">
        <img src="https://raw.githubusercontent.com/pokeapi/sprites/master/sprites/pokemon/other/dream-world/${pokeId}.svg" alt="${pokemon.name}" />
        </div>
        <div class="nameWrap">
            <p class="body3Fonts">#${pokemon.name}</p>
        </div>`;
        listItem.addEventListener("click", async () => {
            const success = await fetchDataB4Redirect(pokeId);
            if (success) {
                window.location.href = `./pokemonInfo.html?id=${pokeId}`;
            }
        });
        listWrapper.appendChild(listItem);
    });
}

searchInput.addEventListener("keyup", enableSearch);

function enableSearch() {
    const searchTerm = searchInput.value.toLowerCase();
    let filteredPoke;
    if (numberFilter.checked) {
        filteredPoke = pokemonsAll.filter((pokemon) => {
            const pokeId = pokemon.url.split("/")[6];
            return pokeId.startsWith(searchTerm);
        });
    } else if (nameFilter.checked) {
        filteredPoke = pokemonsAll.filter((pokemon) =>
            pokemon.name.toLowerCase().startsWith(searchTerm)
        );
    } else {
        filteredPoke = pokemonsAll;
    }

    showPokemons(filteredPoke);

    if (filteredPoke.length === 0) { notFound.style.display = "block"; } else {
        notFoundMessage.style.display = "none";
    }

    const closeButton = document.querySelector(".searchDeleteIcon");
    closeButton.addEventListener("click", clearSearch);

    function clearSearch() {
        searchInput.value = "";
        showPokemons(pokemonsAll);
        notFound.style.display = "none";
    }
}