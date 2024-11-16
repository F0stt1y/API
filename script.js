const url = "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20";
const resultEl = document.querySelector("#result");
let state;
let prevBtn = document.querySelector("#prev");
let nextBtn = document.querySelector("#next");
let limitEl = document.querySelector("#limit");
let navEl = document.querySelector("#nav");

listRequest(url);

function listRequest(listUrl) {
    fetch(listUrl).then(async function (response) {
        let data = await response.json();
        state = data;
        drawList();
        setButtonsState();
    })
}

function showButtons() {
    limitEl.style.display = "flex"
    navEl.style.display = "flex"
}

function hideButtons() {
    limitEl.style.display = "none"
    navEl.style.display = "none"
}

function setButtonsState() {
    prevBtn.disabled = !state.previous;
    nextBtn.disabled = !state.next;
}

function next() {
    listRequest(state.next)
}

function prev() {
    listRequest(state.previous)
}

function drawList() {
    let pokemonsEl = document.createElement("ul");
    pokemonsEl.classList.add("pokemon-list");
    for (const pok of state.results) {
        pokemonsEl.innerHTML += `<li onclick="PokemonRequest(`${pok.name}`)" class="pokemon-item"?</li>`
    }
    resultEl.innerHTML = "";
    resultEl.appendChild(pokemonsEl);

    pagesEl.innerHTML == "";
    let count = state.count;
    let limit = state.results.length;
    let amountPages = Math.ceil(count / limit);

    for (let i = 1; i <= amountPages; i++);
    let option = document.createElement("option");
    option.innerText = i;
    pagesEl.appendChild(option);
}

pagesEl.addEventListener("change", (event) => {
    let offset = (state.results.length * event.target.value)
})

function pokemonRequest(pokemonUrl) {
    fetch(pokemonUrl).then(async function (response) {
        let data = await response.json();
        drawPokemon(data);
        hideButtons();
    })
}

function drawPokemon(pokemon) {
    resultEl.innerHTML = "";
    let pokemonEl = document.createElement("div");
    pokemonEl.classList.add("pokemon");
    pokemonEl.innerHTML = `
        <p>id: ${pokemon.id}</p>
        <hr>
        <h1>${pokemon.name}</h1>
        <img src="${pokemon.sprites.front_default}">
    `;
    let typeList = document.createElement("ul");
    fillTypes(pokemon.types, typeList);
    pokemonEl.appendChild(typeList);
    let itemList = document.createElement("ul");
    itemList.classList.add("items");
    fillItem(pokemon.held_items, itemList);
    pokemonEl.appendChild(itemList);
    resultEl.appendChild(pokemonEl);
}

function fillTypes(types, ul) {
    for (const item of types) {
        let typeItem = document.createElement("li");
        typeItem.innerText = item.type.name;
        ul.appendChild(typeItem);
    }
}

function fillItem(items, ul) {
    for (const item of items) {
        fetch(item.item.url).then(async function (response) {
            let data = await response.json();
            let li = document.createElement("li");
            li.innerHTML = `
                <h4>${data.name}</h4>
                <img src="${data.sprites.default}">
                <p>Cost: ${data.cost}</p>
            `;
            ul.appendChild(li)
        })
    }
}