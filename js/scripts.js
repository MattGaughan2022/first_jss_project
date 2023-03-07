//backslash in a string to announce non-normal reading of a symbol
// like "she said \"Yes!\" to the proposal"
// complex vs primitive data types
// complex uses pointers to stored data vs primitive
// containing data directly
// https://pokedex.org/

let pokemonRepository = (function () {

    let pokemonList = [
        {
            name: 'Bulbasaur',
            height: .7,
            types: ['grass', ' poison']
        },
        {
            name: 'Charmander',
            height: .6,
            types: ['fire']
        },
        {
            name: 'Squirtle',
            height: .5,
            types: ['water']
        },
        {
            name: 'Pikachu',
            height: .4,
            types: ['electric']
        }
    ];

    function add(pokemon){
        if(
            typeof pokemon === 'object' &&
            'name' in pokemon &&
            'height' in pokemon &&
            'types' in pokemon
        ){
            pokemonList.push(pokemon);
        } else {
            console.log('pokemon input is not correct')
        }
    }

    function getAll(){
        return pokemonList;
    }

    function addListItem(pokemon){
        let visibleList = document.querySelector('.pokemon-list');
        let listItem = document.createElement('li');
        let button = document.createElement('button');
        button.innerText = pokemon.name;
        button.classList.add('button-class');
        listItem.appendChild(button);
        visibleList.appendChild(listItem);
        button.addEventListener('click', function (event){
            showDetails(pokemon.name);
        });
    }

    function showDetails(pokemon){
        console.log(pokemon);
    }

    return{
         add: add,
         getAll: getAll,
         addListItem: addListItem,
         showDetails: showDetails
        };
})();

console.log(pokemonRepository.getAll());
console.log(pokemonRepository.getAll());
console.log(pokemonRepository.add(218));
console.log(pokemonRepository.add( {name: 'Raichu', height: 0.8, types: ['electric']}));

function printPokemonList(list) {
    document.write('<p>' + list.name + ' (' + list.height + 'm) ' + list.types);
    if (list.height < .5) {
        document.write(' <--- What a small pokemon!');
    }
    document.write(`</p>`);
}

pokemonRepository.getAll().forEach(function (pokemon){
    pokemonRepository.addListItem(pokemon);
});

// pokemonRepository.getAll().forEach(function (pokemon){
//     let visibleList = document.querySelector('.pokemon-list');
//     let listItem = document.createElement('li');
//     let button = document.createElement('button');
//     button.innerText = pokemon.name;
//     button.classList.add('button-class');
//     listItem.appendChild(button);
//     visibleList.appendChild(listItem);
// });