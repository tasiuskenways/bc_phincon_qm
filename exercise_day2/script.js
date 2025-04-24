let containerPokeCard = document.getElementById("cardContainer");
let searchInput = document.getElementById("searchInput");
let searchButton = document.getElementById("searchButton");

searchButton.addEventListener("click", async () => {
  const searchTerm = searchInput.value.toLowerCase();
  containerPokeCard.innerHTML = ""; // Clear previous results
  if (searchTerm === "") {
    fetchPokemonList(); // Fetch all Pokémon if search term is empty
  } else {
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${searchTerm}`
      );
      if (!response.ok) throw new Error("Pokémon not found");

      const pokeData = await response.json();
      setPokeData(pokeData);
    } catch (error) {
      console.error("Error fetching Pokémon:", error);
    }
  }
});

async function fetchPokemonList() {
  try {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=10");
    const data = await response.json();
    const pokemonList = data.results;

    pokemonList.forEach(async (pokemon) => {
      const res = await fetch(pokemon.url);
      const pokeData = await res.json();
      setPokeData(pokeData);
    });
  } catch (error) {
    console.error("Error fetching Pokémon:", error);
  }
}

fetchPokemonList();

function setPokeData(pokeData) {
  const template = document.getElementById("pokemon-card-template");
  const clone = template.content.cloneNode(true);
  // Set image
  const img = clone.querySelector("[data-pokemon-img]");
  img.src = pokeData.sprites.front_default;
  img.alt = pokeData.name;
  // Set name
  const nameElem = clone.querySelector("[data-pokemon-name]");
  nameElem.textContent = pokeData.name;
  // Set type
  const typeElem = clone.querySelector("[data-pokemon-type]");
  const types = pokeData.types.map((t) => t.type.name).join(", ");
  typeElem.textContent = `Type: ${types}`;

  // Set weight
  const weightElm = clone.querySelector("[data-pokemon-weight]");
  weightElm.textContent = `Weight: ${pokeData.weight}`;
  // Set height
  const heightElm = clone.querySelector("[data-pokemon-height]");
  heightElm.textContent = `Height: ${pokeData.height}`;

  containerPokeCard.appendChild(clone);
}
