// Variable Declarations

let menu = document.querySelector(".menu-icon");
let sidenav = document.querySelector("#nav");
let domDecks = document.querySelector("#flashcard-decks");
let domFlashcard = document.querySelector("#flashcard");
let domContent = document.querySelector(".content");



// Event Listener Declarations


menu.addEventListener("click", sideNavToggle.bind(this, sidenav));




// Class Declarations
class Flashcard {
  constructor(front,back){
    this.front = front;
    this.back = back;
    this.passed = false;
    this.ele = document.createElement("div");
    this.ele.classList.add("flashcard");
    this.domFront = document.createElement("h1");
    this.domFront.innerText = this.front;
    this.domBack = document.createElement("h1");
    this.domBack = this.back;
  }
  getFrontHTML(){
    let ele = this.ele.cloneNode(true);
    ele.appendChild(this.domFront);
    return ele;
  }
  getBackHTML(){
    let ele = this.ele.cloneNode(true);
    ele.appendChild(this.domFront);
    return this.domBack;
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
    this.passedCards = [];
    this.failedCards = [];
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
  moveCardFromUnreviewToPassed(index){
    this.passedCards.push(this.unreviewedCards.pop());
  }
  moveCardFromUnreviewToFailed(index){
    this.failedCards.push(this.unreviewedCards.pop());
  }
  moveCardFromFailedToPassed(index){
    this.passedCards.push(this.failedCards.pop());
  }
}


class Memoreyes {
  constructor(){
    this.decks = [];
  }
  addDeck(deck){
      this.decks.push(deck);
  }

}


// Function Declarations


function populateDecksInNavbar(decks){
  let deckList = document.querySelector('#flashcard-decks');
  deleteChildren(deckList);
  deckList.classList.add("sidebar-decklist");
  decks.forEach(deck =>{
    let ele = document.createElement("h2");
    let hr = document.createElement("hr");
    ele.innerText = deck.title;
    deckList.appendChild(ele);
    deckList.appendChild(hr);
  })
}


function createRandomCards(cards){
  for(let i = 0; i < 10; i++){
    let card = new Flashcard(i+": Is it true","yes");
    cards.unreviewedCards.push(card);
  }
  return cards;
}
// This code is for initial Testing, and is likely to change


function deleteChildren(e) {
    var child = e.lastElementChild;
    while (child!==null) {
        e.removeChild(child);
        child = e.lastElementChild;
    }
}

function flipCard(){
  //Responsible for flipping the card and displaying its other value

}

function selectDeck(){
  // Selects the deck and displays it in the content element
}

function checkIfForDeckInPlay(){
  //Checks to ensure that there isn't an active deck in play when the
  //selectDeck() function is run

}

function displayCard(card){

  domContent.removeChild(domFlashcard);
  domFlashcard = card;
  domContent.appendChild(card);
}

function nextFlashCard(){


}

function previousFlashCard(){


}


// Script Initiation

let memoreyes = new Memoreyes();
let cards1 = createRandomCards(new Deck("Test Deck - 1"));
let cards2 = createRandomCards(new Deck("Test Deck - 2"));



memoreyes.addDeck(cards1);
memoreyes.addDeck(cards2);
memoreyes.decks[0].randomize("unreviewedCards");
memoreyes.decks[0].unreviewedCards.forEach(val=>console.log(val.front));

displayCard(memoreyes.decks[0].unreviewedCards[0].getFrontHTML())
populateDecksInNavbar(memoreyes.decks);
