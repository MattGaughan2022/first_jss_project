//backslash in a string to announce non-normal reading of a symbol
// like "she said \"Yes!\" to the proposal"
// complex vs primitive data types
// complex uses pointers to stored data vs primitive
// containing data directly


let pokemonList = [
    { 
        name: 'Bulbasaur', 
        height: .7, 
        types: ['grass', ' poison']},
    { 
        name: 'Charmander', 
        height: .6, 
        types: ['fire']},
    { 
        name: 'Squirtle', 
        height: .5, 
        types: ['water']},
    { 
        name: 'Pikachu', 
        height: .4, 
        types: ['electric']}
];

for(let i = 0; i<pokemonList.length; i++){
    document.write(`<br>${pokemonList[i].name} (${pokemonList[i].height}m) type: ${pokemonList[i].types}`);
    if(pokemonList[i].height < .5){
        document.write(' <--- What a small pokemon!');
    }
}

// console.log(pokemonList[0]);
// console.log(pokemonList[1]);
// console.log(pokemonList[2]);
// console.log(pokemonList[3]);