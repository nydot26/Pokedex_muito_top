let allPokemons = []

function returnResponse (response){
    return response.json()
}

function renderList(list){
    const listPokemon = document.getElementById("poke-list")
    listPokemon.innerHTML = ""

    list.forEach((item) => {
        const id = item.url.split("/")[6]

        const imagePokemon = document.createElement("img")
        imagePokemon.width = 300
        imagePokemon.src =
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/"+ id +".png"

        const namePokemon = document.createElement("p")
        namePokemon.innerHTML = item.name

        const line = document.createElement("li")
        line.appendChild(imagePokemon)
        line.appendChild(namePokemon)

        listPokemon.appendChild(line)
    })
}

function jsonResponse (json){
    allPokemons = json.results
    renderList(allPokemons)
}

function loadPokemonList(){
    fetch("https://pokeapi.co/api/v2/pokemon?offset=0&limit=151")
    .then(returnResponse)
    .then(jsonResponse)
}

document.getElementById("search").addEventListener("input", function(e){
    const text = e.target.value.toLowerCase()

    const filtered = allPokemons.filter(pokemon =>
        pokemon.name.includes(text)
    )

    renderList(filtered)
})

window.onload = function () {
    loadPokemonList()
}