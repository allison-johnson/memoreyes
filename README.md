# memoreyes
Memoreyes is a flashcard Web App!

# Deployment instructions

> `git clone https://github.com/clarknoah/memoreyes.git`



The App works right out of the box, and relies on the `Memoreyes` class in order to run properly.


The following Javascript initializes the App (this is for example purpose only, the code is already provided in the `main.js`file)


```Javascript
//Initializes the Memoreyes Class
let memoreyes = new Memoreyes();

//Initialize a Deck Class and import deck from array
let dogDeck = new Deck("Things to Remember about Hildi").createDeckFromArray(hildiDeck);


// Create Text Deck
let randomDeck  = new Deck("Test Deck").createRandomCards(14);


// Add Decks to Memoreyes class
memoreyes.addDeck(dogDeck);
memoreyes.addDeck(randomDeck);


//Populate Navbar with Decks Available
memoreyes.domPopulateDecksInNavBar();

```



> Open `index.html`




## Adding Additional Decks

Additional decks can be added by running the following lines of code

```Javascript
let newDeck = new Deck("New Deck").createRandomCards(42);

memoreyes.domPopulateDecksInNavBar();

```


# Deck Format
In order to create your own deck, use the following model:

```Javascript
let importDeck = [
  [
    `text to be displayed on front of flashcard`,//required
    `text to be displayed on back of flashcard`,//required
    `relative url (from index.html root) for front image`//optional
    `relative url (from index.html root) for back imnage`//optional
  [],
];
```
