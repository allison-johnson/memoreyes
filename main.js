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
    this.selectedDeck = null;
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

    //Add Event Listeners
    this.menu.addEventListener("click", toggleSidenav);
    this.flipButton.addEventListener("click", this.domFlipCard.bind(this));
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

    this.domPopulateSidebar();
    this.domPopulateContent(0);
  }

  getSelectedDeck(){
    let deckSelected = this.selectedDeck !== null;
    if(deckSelected){
      return this.decks[this.selectedDeck];
    }
  }

  domFlipCard(){
    domContent = document.querySelector(".content");
    let domFlashcard = document.querySelector("#flashcard");
    domContent.removeChild(domFlashcard);
    let frontDisplayed = this.selectedCardFace === "front";
    console.log(this.currentFlashcardFront);
    if(frontDisplayed){
      domContent.prepend(this.currentFlashcardBack);
      this.selectedCardFace = "back";
    }else{
      console.log(this.currentFlashcardFront);
      domContent.prepend(this.currentFlashcardFront);
      this.selectedCardFace = "front";
    }
  }

  nextFlashCard(){}

  previousFlashCard(){

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

  domPopulateContent(index, showFront){
    this.selectedCardIndex = index;
    let deck = this.getSelectedDeck();
    let flashcard = document.querySelector("#flashcard");
    this.domContent.removeChild(flashcard);
    this.currentFlashcardFront = deck.unreviewedCards[index].getFrontHTML();
    this.currentFlashcardBack = deck.unreviewedCards[index].getBackHTML();
    console.log(this.currentFlashcardFront);
    this.domContent.prepend(this.currentFlashcardFront);
    this.selectedCardFace = "front";
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

memoreyes.addDeck(cards1);
memoreyes.addDeck(cards2);


memoreyes.domPopulateDecksInNavBar();
