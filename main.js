let menu = document.querySelector(".menu-icon");
let sidenav = document.querySelector("#nav");
let domDecks = document.querySelector("#flashcard-decks");
let domFlashcard = document.querySelector("#flashcard");


menu.addEventListener("click", sideNavToggle.bind(this, sidenav));


class Flashcard {
  constructor(front,back){
    this.front = front;
    this.back = back;
    this.passed = false;

  }
}


class JavascriptFlashcard extends Flashcard{
  constructor(){
    super();
  }
}



class Deck {
  constructor(title){
    this.title = title;
    this.unreviewedCards = [];
    this.reviewedPassedCards = [];
    this.reviewedFailedCards = [];
  }
  randomize(arrayName){
    let shuffledDeck = [];
    let arr = Array.from(this[arrayName]);
    let deckSize = this[arrayName].length;
    for(let i = 0; i < deckSize; i++){
      let currentSize = arr.length;
      let randomNumber = Math.floor(Math.random()*currentSize);
      let shuffledCard = arr.splice(randomNumber, 1)[0];
      shuffledDeck.push(shuffledCard);
    }
    this[arrayName] = shuffledDeck;
  }
  moveCard(){}
}


class Memoreyes {
  constructor(){
    this.decks = [];
  }
  addDeck(deck){
      this.decks.push(deck);
  }
}


let memoreyes = new Memoreyes();
let cards = new Deck("Test Deck");

function createRandomCards(){
  for(let i = 0; i < 10; i++){
    let card = new Flashcard(i+": Is it true","yes");
    cards.unreviewedCards.push(card);
  }
}
// This code is for initial Testing, and is likely to change

function flipCard(){

}



createRandomCards();

memoreyes.addDeck(cards);
memoreyes.decks[0].randomize("unreviewedCards");
memoreyes.decks[0].unreviewedCards.forEach(val=>console.log(val.front));
