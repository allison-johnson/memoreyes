// Variable Declarations

let menu = document.querySelector(".menu-icon");
let sidenav = document.querySelector("#nav");
let domDecks = document.querySelector("#flashcard-decks");
let domFlashcard = document.querySelector("#flashcard");
let domContent = document.querySelector(".content");
let sidebar = document.querySelector(".content-sidebar");




// Event Listener Declarations


menu.addEventListener("click", toggleSidenav);




// Class Declarations
class Flashcard {
  constructor(front,back){
    this.front = front;
    this.back = back;
    this.passed = false;
    this.ele = document.createElement("div");
    this.ele.setAttribute("id","flashcard");
    this.ele.classList.add("flashcard");
    this.domFront = document.createElement("h1");
    this.domFront.innerText = this.front;
    this.domBack = document.createElement("h1");
    this.domBack.innerText = this.back;
  }
  getFrontHTML(){
    let ele = this.ele.cloneNode(true);
    ele.appendChild(this.domFront.cloneNode(true));
    return ele;
  }
  getBackHTML(){
    let ele = this.ele.cloneNode(true);
    ele.appendChild(this.domBack.cloneNode(true));
    return ele;
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
  resetDecks(){
    this.unreviewedCards.push(... this.passedCards);
    this.unreviewedCards.push(... this.failedCards);
    this.passedCards = [];
    this.failedCards = [];
    this.randomize('unreviewedCards');
  }
  moveCardFromUnreviewToPassed(index){
    let unreviewedIsNotEmpty = this.unreviewedCards.length > 0;
    if(unreviewedIsNotEmpty){
      this.passedCards.push(this.unreviewedCards.splice(0,1)[0]);
    }else{
      console.log("Array is Empty");
    }

  }
  moveCardFromUnreviewToFailed(index){
    let unreviewedIsNotEmpty = this.unreviewedCards.length > 0;
    if(unreviewedIsNotEmpty){
      this.failedCards.push(this.unreviewedCards.splice(0,1)[0]);
    }else{
      console.log("Array is Empty");
    }

  }
  moveCardFromFailedToPassed(index){
    let failedIsNotEmpty = this.failedCards.length > 0;
    if(failedIsNotEmpty){
      this.passedCards.push(this.failedCards.splice(0,1)[0]);
    }else{
      console.log("Array is Empty");
    }

  }
  moveCardFromFailedToFailed(index){
    let failedIsNotEmpty = this.failedCards.length > 0;
    if(failedIsNotEmpty){
      this.failedCards.push(this.failedCards.splice(0,1)[0]);
    }else{
      console.log("Array is Empty");
    }

  }

}


class Memoreyes {
  constructor(){
    this.decks = [];
    this.selectedDeck = null;
    this.selectedDeckType = null;
    this.currentFlashcardBack = null;
    this.currentFlashcardFront = null;
    this.selectedCardIndex = null;
    this.selectedCardFace = null;

    // Dom Elements
    this.flipButton = document.querySelector(".flashcard-flip");
    this.menu = document.querySelector(".menu-icon");
    this.domDecks = document.querySelector("#flashcard-decks");
    this.domFlashcard = document.querySelector("#flashcard");
    this.domContent = document.querySelector(".content");
    this.sidebar = document.querySelector(".content-sidebar");
    this.knowButton = document.querySelector(".flashcard-know")
    this.dontKnowButton = document.querySelector(".flashcard-dont-know");

    //Add Event Listeners
    this.menu.addEventListener("click", toggleSidenav);
    this.flipButton.addEventListener("click", this.domFlipCard.bind(this));
    this.knowButton.addEventListener("click", this.knowClick.bind(this));
    this.dontKnowButton.addEventListener("click", this.dontKnowClick.bind(this));
  }

  addDeck(deck){
      this.decks.push(deck);
  }

  selectDeck(index){
    // Selects the deck and displays it in the content element
    console.log("Deck Selected", index);
    let noSelectedDeck = this.selectedDeck === null;
    if(noSelectedDeck){
      console.log("Gonna Switcxh!");
      this.selectedDeck = index;
      this.initializeSelectedDeck();
    }else{

      if(index===this.selectedDeck){
        console.log("Do Nothing");
      }else{
        let switchDecks = confirm("Do you want to switch Decks?");
        if(switchDecks){
            console.log("Gonna Switcxh!");
            this.selectedDeck = index;
            this.initializeSelectedDeck();
        }
      }
    }

  }

  updateVariables(){
    this.flipButton = document.querySelector(".flashcard-flip");
    this.menu = document.querySelector(".menu-icon");
    this.domDecks = document.querySelector("#flashcard-decks");
    this.domFlashcard = document.querySelector("#flashcard");
    this.domContent = document.querySelector(".content");
    this.sidebar = document.querySelector(".content-sidebar");
  }

  initializeSelectedDeck(){
    this.determineCurrentDeck();
    this.domPopulateSidebar();
    this.domPopulateContent(0);
  }

  determineCurrentDeck(){
    console.log(this.decks[this.selectedDeck]);
    let unreviewedIsEmpty = this.decks[this.selectedDeck].unreviewedCards.length === 0;
    let failedIsEmpty = this.decks[this.selectedDeck].failedCards.length === 0;
    if(!unreviewedIsEmpty){
      this.selectedDeckType = "unreviewedCards";
      return this.selectedDeckType;
    }else if(unreviewedIsEmpty && !failedIsEmpty){
      this.selectedDeckType = "failedCards";
      return this.selectedDeckType;
    }else {
      console.log("You have no cards to review");
      //this.selectedDeckType = "passedCards";
      //return this.selectedDeckType;
    }
  }

  getCurrentDeck(){
    return this.decks[this.selectedDeck][this.selectedDeckType];
  }

  getSelectedDeck(){
    let deckSelected = this.selectedDeck !== null;
    if(deckSelected){
      return this.decks[this.selectedDeck][this.selectedDeckType];
    }
  }

  domFlipCard(){
    domContent = document.querySelector(".content");
    let domFlashcard = document.querySelector("#flashcard");
    domContent.removeChild(domFlashcard);
    let frontDisplayed = this.selectedCardFace === "front";
    if(frontDisplayed){
      domContent.prepend(this.currentFlashcardBack);
      this.selectedCardFace = "back";
    }else{
      console.log(this.currentFlashcardFront);
      domContent.prepend(this.currentFlashcardFront);
      this.selectedCardFace = "front";
    }
  }


  dontKnowClick(){
    let index = this.selectedCardIndex;
    let deck = this.decks[this.selectedDeck];
    let deckIsUnreviewed = this.selectedDeckType === "unreviewedCards";
    let deckIsFailed = this.selectedDeckType === "failedCards";
    if(deckIsUnreviewed){
      deck.moveCardFromUnreviewToFailed(index);
      this.updateNextCard();
    }else if(deckIsFailed){
      deck.moveCardFromFailedToFailed(index);
      this.updateNextCard();
    }else{
      console.log("You have finished reviewing your cards!");
    }
  }

  knowClick(){
    let index = this.selectedCardIndex;
    let deck = this.decks[this.selectedDeck];
    let deckIsUnreviewed = this.selectedDeckType === "unreviewedCards";
    let deckIsFailed = this.selectedDeckType === "failedCards";
    if(deckIsUnreviewed){
      deck.moveCardFromUnreviewToPassed(index);
      this.updateNextCard();
    }else if(deckIsFailed){
      deck.moveCardFromFailedToPassed(index);
      this.updateNextCard();
    }else{
      console.log("You have finished reviewing your cards!");
    }

  }

  updateNextCard(){
    this.determineCurrentDeck();
    this.domPopulateSidebar();
    let moreCardsInDeck = this.decks[this.selectedDeck][this.selectedDeckType].length > 0;
    if(moreCardsInDeck){
      let index = this.selectedCardIndex + 1;
      this.domPopulateContent(index);
    }else {
      console.log("The Deck is Empty!");
    }
  }


  domPopulateDecksInNavBar(){
    let deckList = document.querySelector('#flashcard-decks');
    deleteChildren(deckList);
    deckList.classList.add("sidebar-decklist");
    this.decks.forEach((deck,index) =>{
      let ele = document.createElement("h2");
      ele.classList.add("sidebar-deck-title");
      ele.addEventListener("click",function(){
        this.selectDeck(index);
      }.bind(this));

      let hr = document.createElement("hr");
      ele.innerText = deck.title;
      deckList.appendChild(ele);
      deckList.appendChild(hr);
    })
  }

  domPopulateSidebar(){
    //gets the title of the selected deck
    deleteChildren(this.sidebar);
    let deck = this.decks[this.selectedDeck];
    let unreview = document.createElement("h4");
    let passed = document.createElement("h4");
    let failed = document.createElement("h4");

    unreview.innerText = `Unreviewed: ${deck.unreviewedCards.length}`;
    passed.innerText = `Passed: ${deck.passedCards.length}`;
    failed.innerText = `Failed: ${deck.failedCards.length}`;
    sidebar.appendChild(unreview);
    sidebar.appendChild(passed);
    sidebar.appendChild(failed);

  }

  domPopulateContent(index, showFront=true){
    console.log("Updating Card");
    //this.selectedCardIndex = index;
    let deck = this.getCurrentDeck();
    let flashcard = document.querySelector("#flashcard");
    let domContent = document.querySelector(".content");
    let deckIsEmpty = deck.length === 0;
    console.log(deck.length);
    if(!deckIsEmpty){
      domContent.removeChild(flashcard);
      this.currentFlashcardFront = deck[0].getFrontHTML();
      this.currentFlashcardBack = deck[0].getBackHTML();

      this.domContent.prepend(this.currentFlashcardFront);
      this.selectedCardFace = "front";
    }else{
      console.log("The Deck is Empty, switch to a deck that isn't");
    }

  }


  initializePage(){
    this.domPopulateDecksInNavBar();
  }
}


// Function Declarations

function toggleSidenav(){
  sideNavToggle(sidenav, "sidenav-hide")
}

function toggleSidebar(){
  sideNavToggle(sidebar, "sidebar-hide");
}



function createRandomCards(count, cards){
  for(let i = 0; i < count; i++){
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







// Script Initiation

let memoreyes = new Memoreyes();
let cards1 = createRandomCards(15, new Deck("Test Deck - 1"));
let cards2 = createRandomCards(25, new Deck("Test Deck - 2"));
cards1.randomize("unreviewedCards");
cards2.randomize("unreviewedCards");
memoreyes.addDeck(cards1);
memoreyes.addDeck(cards2);


memoreyes.domPopulateDecksInNavBar();
