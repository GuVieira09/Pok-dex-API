const pokeName = document.querySelector('.pokemon_name')
const pokeNumber = document.querySelector('.pokemon_number')
const pokeImage = document.querySelector('.pokemon_image')
const pokeForm = document.querySelector('.form')
const pokeInput = document.querySelector('.input_search')
const buttonPrev = document.querySelector('.btn-prev')
const buttonNext = document.querySelector('.btn-next')
let searchPokemon = 1

const fetchPokemon = async (pokemon) => {
    const apiResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    
    if(apiResponse.status == 200){
        const data = await apiResponse.json();
        return data;
    }
}

const renderPokemon = async (pokemon)=>{
    pokeName.innerHTML = 'Loading...'
    pokeNumber.innerHTML = ''
    
    const data = await fetchPokemon(pokemon)
    

    if(data){
        pokeImage.style.display = 'block'
        pokeName.innerHTML = data.name
        pokeNumber.innerHTML = data.id
        pokeImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']
        pokeInput.value = ""
        searchPokemon = data.id
    }else{
        pokeImage.style.display = 'none'
        pokeName.innerHTML = "?"
        pokeNumber.innerHTML = ""
        pokeImage.src = ""
    }
}

pokeForm.addEventListener('submit', (event)=>{
    event.preventDefault();
    renderPokemon(pokeInput.value.toLowerCase())
})


buttonPrev.addEventListener('click', ()=>{
    if(searchPokemon > 1){
        searchPokemon -= 1
        renderPokemon(searchPokemon)
    }
})


buttonNext.addEventListener('click', ()=>{
    searchPokemon += 1
    renderPokemon(searchPokemon)
})


renderPokemon(searchPokemon)