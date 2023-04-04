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

  function addListItem(pokemon) {
    let visibleList = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('button-class', 'show-modal');
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
          name: item.name,
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
    pokemonRepository.loadDetails(item).then(function(){
      showModal(item);
      console.log(item);
    });
  }

  function showModal(pokemon) {
    let modalContainer = document.querySelector('#modal-container');

    // Clear all existing modal content
    modalContainer.innerHTML = '';

    let modal = document.createElement('div');
    modal.classList.add('modal');

    // Add the new modal content
    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'Close';
    closeButtonElement.addEventListener('click', hideModal);

    let titleElement = document.createElement('h2');
    titleElement.innerText = pokemon.name;

    let contentElement1 = document.createElement('p');
    contentElement1.innerText = pokemon.height/10 + "m";

    let contentElement2 = document.createElement('p');
    let type1, type2;
    if (pokemon.types[1]){
      type1 = pokemon.types[0].type["name"];
      type2 = pokemon.types[1].type["name"];
      contentElement2.innerText = type1 + ", " + type2;
    }
    else{
      type1 = pokemon.types[0].type["name"];
      contentElement2.innerText = type1;
    }

    //contentElement2.innerText = JSON.stringify(pokemon.types);
    

    
    let myImage = document.createElement('img');
    myImage.src = pokemon.sprite;

    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(contentElement1);
    modal.appendChild(contentElement2);
    modal.appendChild(myImage);
    modalContainer.appendChild(modal);

    modalContainer.classList.add('is-visible');

    modalContainer.addEventListener('click', (e) => {
      // Since this is also triggered when clicking INSIDE the modal
      // We only want to close if the user clicks directly on the overlay
      let target = e.target;
      if (target === modalContainer) {
        hideModal();
      }
    });
  }


  function hideModal() {
    let modalContainer = document.querySelector('#modal-container');
    modalContainer.classList.remove('is-visible');

    // if (dialogPromiseReject) {
    //   dialogPromiseReject();
    //   dialogPromiseReject = null;
    // }
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
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});


// pokemonRepository.getAll().forEach(function (pokemon){
//     pokemonRepository.addListItem(pokemon);
// });

// pokemonRepository.getAll().forEach(function (pokemon){
//     let visibleList = document.querySelector('.pokemon-list');
//     let listItem = document.createElement('li');
//     let button = document.createElement('button');
//     button.innerText = pokemon.name;
//     button.classList.add('button-class');
//     listItem.appendChild(button);
//     visibleList.appendChild(listItem);
// });