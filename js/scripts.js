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

function printArrayDetails(list){
    for(let i = 0; i<list.length; i++){
        document.write(`<p>${list[i].name} (${list[i].height}m) type: ${list[i].types}`);
        if(list[i].height < .5){
            document.write(' <--- What a small pokemon!');
        }
        document.write(`</p>`)
    }
    return;
}

function printPokemonList(list){
    document.write('<p>' + list.name + ' (' + list.height + 'm) ' + list.types);
    if(list.height < .5){
        document.write(' <--- What a small pokemon!');
    }
    document.write(`</p>`);
}


printArrayDetails(pokemonList);

document.write('<p> ======= FOR:EACH LOOP BELOW ======= <br>');

pokemonList.forEach(printPokemonList);