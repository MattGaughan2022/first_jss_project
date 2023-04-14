//backslash in a string to announce non-normal reading of a symbol
// like "she said \"Yes!\" to the proposal"
// complex vs primitive data types
// complex uses pointers to stored data vs primitive
// containing data directly
// https://pokedex.org/

let pokemonRepository = (function () {

  let pokemonList = [];

  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  function add(pokemon) {
    if (
      typeof pokemon === 'object'
    ) {
      pokemonList.push(pokemon);
    } else {
      console.log('pokemon input is not correct')
    }
  }

  function getAll() {
    return pokemonList;
  }

  function addListItem(pokemon, i) {
    let visibleList = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '#modal-container');
    listItem.classList.add('list-group-item');
    button.innerText = i + '. ' + pokemon.name;
    button.classList.add('button-class', 'show-modal', 'btn', 'btn-outline-info');
    listItem.appendChild(button);
    visibleList.appendChild(listItem);
    button.addEventListener('click', () => {
      showDetails(pokemon);
    });
  }

  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: (item.name).charAt(0).toUpperCase() + (item.name).slice(1),
          height: item.height,
          types: item.types,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    })
  }

  function loadDetails(pokemon) {
    let url = pokemon.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      pokemon.height = details.height;
      pokemon.types = details.types;
      pokemon.sprite = details.sprites.front_default;
    }).catch(function (e) {
      console.error(e);
    });
  }

  function showDetails(item) {
    pokemonRepository.loadDetails(item).then(function () {
      showModal(item);
      console.log(item);
    });
  }
  function showModal(pokemon) {

    //jquery and bootstrap changes
    $(".modal-text").html('<p>' + ' ' + '</p>');
    $(".modal-title").html(pokemon.name);

    let type1, type2;
    if (pokemon.types[1]) {
      type1 = pokemon.types[0].type["name"];
      type2 = pokemon.types[1].type["name"];
      $(".modal-body").html('<p>' + pokemon.height / 10 + "m" + '</p>'
        + '<p>' + type1 + ", "
        + type2 + '</p>'
        + '<img src=' + '"' + pokemon.sprite + '"' + '/>');
    }
    else {
      type1 = pokemon.types[0].type["name"];
      $(".modal-body").html('<p>' + pokemon.height / 10 + "m" + '</p>'
        + '<p>' + type1 + '</p>'
        + '<img src=' + '"' + pokemon.sprite + '"' + '/>');
    }
  }

  return {
    add: add,
    getAll: getAll,
    loadList: loadList,
    loadDetails: loadDetails,
    addListItem: addListItem,
    showDetails: showDetails
  };
})();

pokemonRepository.loadList().then(function () {
  var i = 1;
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon, i);
    i++;
  });
});
