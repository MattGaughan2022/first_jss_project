# Modeling a Pokedex

## Description

This project leverages Ajax to access https://pokedex.org/ and their educational API webhooks to allow for a JSON file to be received by the client with a specific Pokemon's information. Polyfills are also used to help handle this connection and promise(s).

Using Bootstrap, modals are created via eventhandlers on each button. JQuery is partially used to set variables or write to HTML during certain events. The modal shows the Pokemon's name, height, type(s), and its sprite. If not fully received yet, there will be a '..loading..' title in the modal to signify a loading event to the user.

## Resources:

> Bootstrap (min) version 4.3.1

> JQuery version 3.5.1

> JQuery-ui 1.12.1

> Popper 1.14.7
