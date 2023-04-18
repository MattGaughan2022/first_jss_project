/* eslint-disable no-undef */
let pokemonRepository = (function () {
  let t = [];
  function e(e) {
    "object" == typeof e
      ? t.push(e)
      : console.log("pokemon input is not correct");
  }
  function o() {
    return t;
  }
  function n(t) {
    pokemonRepository.loadDetails(t).then(function () {
      var e;
      let o, n;
      (e = t),
        $(".modal-title").html(e.name),
        e.types[1]
          ? ((o = e.types[0].type.name),
            (n = e.types[1].type.name),
            $(".modal-body").html(
              "<p>" +
                e.height / 10 +
                "m</p><p>" +
                o +
                ", " +
                n +
                "</p><img src='" +
                e.sprite +
                "'/>"
            ))
          : ((o = e.types[0].type.name),
            $(".modal-body").html(
              "<p>" +
                e.height / 10 +
                "m</p><p>" +
                o +
                "</p><img src='" +
                e.sprite +
                "'/>"
            )),
        $(".modal").on("hidden.bs.modal", function () {
          $(".modal-title").html("..loading.."), $(".modal-body").html("");
        }),
        console.log(t);
    });
  }
  return {
    add: e,
    getAll: o,
    loadList: function t() {
      return fetch("https://pokeapi.co/api/v2/pokemon/?limit=150")
        .then(function (t) {
          return t.json();
        })
        .then(function (t) {
          t.results.forEach(function (t) {
            e({
              name: t.name.charAt(0).toUpperCase() + t.name.slice(1),
              height: t.height,
              types: t.types,
              detailsUrl: t.url,
            });
          });
        })
        .catch(function (t) {
          console.error(t);
        });
    },
    loadDetails: function t(e) {
      return fetch(e.detailsUrl)
        .then(function (t) {
          return t.json();
        })
        .then(function (t) {
          (e.height = t.height),
            (e.types = t.types),
            (e.sprite = t.sprites.front_default);
        })
        .catch(function (t) {
          console.error(t);
        });
    },
    addListItem: function t(e, o) {
      let i = document.querySelector(".pokemon-list"),
        l = document.createElement("li"),
        a = document.createElement("button");
      a.setAttribute("data-toggle", "modal"),
        a.setAttribute("data-target", "#modal-container"),
        l.classList.add("list-group-item"),
        (a.innerText = o + ". " + e.name),
        a.classList.add(
          "button-class",
          "show-modal",
          "btn",
          "btn-outline-info"
        ),
        l.appendChild(a),
        i.appendChild(l),
        a.addEventListener("click", () => {
          n(e);
        });
    },
    showDetails: n,
  };
})();
pokemonRepository.loadList().then(function () {
  let t = 1;
  pokemonRepository.getAll().forEach(function (e) {
    pokemonRepository.addListItem(e, t), t++;
  });
});
