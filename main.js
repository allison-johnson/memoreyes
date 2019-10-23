// Variable Declarations






// Event Listener Declarations





// Class Declarations
class Flashcard {
  constructor(front,back){
    this.front = front;
    this.back = back;
    this.passed = false;
  }
  getFrontHTML(){

  }
  getBackHTML(){

  }
  getHTML(){
    let div = document.createElement("div");
    div.classList.add("flashcard-inner");

    this.frontEle = document.createElement("div");
    this.backEle = document.createElement("div");
    this.frontEle.classList.add("flashcard-front");
    this.backEle.classList.add("flashcard-back");
    this.frontEle.classList.add("center-element");
    this.backEle.classList.add("center-element");

    this.frontText = document.createElement("h1");
    this.frontText.classList.add("center-element");
    this.frontText.innerText = this.front;
    this.frontEle.appendChild(this.frontText);

    this.backText = document.createElement("h1");
    this.backText.classList.add("center-element");
    this.backText.innerText = this.back;
    this.backEle.appendChild(this.backText);

    div.appendChild(this.frontEle);
    div.appendChild(this.backEle);
    this.ele = div;
    return this.ele;
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
    return this;
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
    return this;
  }

  createRandomCards(count){
    for(let i = 0; i < count; i++){
      let card = new Flashcard(i+": Is it true","yes");
      this.unreviewedCards.push(card);
    }
    return this;
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
    this.flipButton = document.querySelector(".flashcard-flip-button");
    this.menu = document.querySelector(".menu-icon");
    this.domContent = document.querySelector(".content");
    this.sidebar = document.querySelector(".content-sidebar");
    this.knowButton = document.querySelector(".flashcard-know")
    this.dontKnowButton = document.querySelector(".flashcard-dont-know");
    this.sidenav = document.querySelector("#nav");

    //Add Event Listeners
    this.menu.addEventListener("click", this.toggleSidenav.bind(this));

    this.flipButton.addEventListener("click", this.domFlipCard.bind(this));
    this.knowButton.addEventListener("click", this.knowClick.bind(this));
    this.dontKnowButton.addEventListener("click", this.dontKnowClick.bind(this));
  }

  toggleSidenav(){
    console.log(this.sidenav);
    sideNavToggle(this.sidenav, "sidenav-hide")
  }

  toggleSidebar(){
    sideNavToggle(this.sidebar, "sidebar-hide");
  }

  // This code is for initial Testing, and is likely to change
  deleteChildren(e) {
      var child = e.lastElementChild;
      while (child!==null) {
          e.removeChild(child);
          child = e.lastElementChild;
      }
  }

  addDeck(deck){
      this.decks.push(deck);
  }

  selectDeck(index){
    // Selects the deck and displays it in the content element
    console.log("Deck Selected", index);
    let noSelectedDeck = this.selectedDeck === null;
    if(noSelectedDeck){
      this.selectedDeck = index;
      this.initializeSelectedDeck();
    }else{

      if(index===this.selectedDeck){
      }else{
        let switchDecks = confirm("Do you want to switch Decks?");
        if(switchDecks){

            this.selectedDeck = index;
            this.initializeSelectedDeck();
        }
      }
    }

  }

  initializeSelectedDeck(){
    this.determineCurrentDeck();
    this.domPopulateSidebar();
    this.domPopulateContent();
  }

  determineCurrentDeck(){
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
    let frontDisplayed = this.selectedCardFace === "front";
    let inner = document.querySelector(".flashcard-inner");
    if(frontDisplayed){
      inner.classList.toggle("flipped-card-inner");
      this.selectedCardFace = "back";
    }else{
      inner.classList.toggle("flipped-card-inner");
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
      this.domPopulateContent();
    }else {
      console.log("The Deck is Empty!");
    }
  }

  domPopulateDecksInNavBar(){
    let deckList = document.querySelector('#flashcard-decks');
    this.deleteChildren(deckList);
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
    this.deleteChildren(this.sidebar);
    let deck = this.decks[this.selectedDeck];
    let unreview = document.createElement("h4");
    let passed = document.createElement("h4");
    let failed = document.createElement("h4");

    unreview.innerText = `Unreviewed: ${deck.unreviewedCards.length}`;
    passed.innerText = `Passed: ${deck.passedCards.length}`;
    failed.innerText = `Failed: ${deck.failedCards.length}`;
    this.sidebar.appendChild(unreview);
    this.sidebar.appendChild(passed);
    this.sidebar.appendChild(failed);

  }

  domPopulateContent(showFront=true){
    console.log("Updating Card");
    //this.selectedCardIndex = index;
    let deck = this.getCurrentDeck();
    let flashcard = document.querySelector("#flashcard");
    this.domContent = document.querySelector(".content");
    let deckIsEmpty = deck.length === 0;
    console.log(deck.length);
    if(!deckIsEmpty){
      this.deleteChildren(flashcard);
      this.domCard = deck[0].getHTML();
      let flashcardEle = document.querySelector("#flashcard");
      this.deleteChildren(flashcardEle);
      flashcardEle.appendChild(this.domCard);

      if(showFront){
        //card.querySelector(".flashcard-front")
      }

    }else{
      alert("You have completed everything!");
    }

  }

  initializePage(){
    this.domPopulateDecksInNavBar();
  }
}


// Function Declarations









// Script Initiation

let memoreyes = new Memoreyes();
let card1  = new Deck("Test Deck - 1").createRandomCards(8);
console.log(card1.createRandomCards(14));
let card2  = new Deck("Test Deck - 2").createRandomCards(14);

memoreyes.addDeck(card1);
memoreyes.addDeck(card2);

memoreyes.selectDeck(0);
memoreyes.domPopulateDecksInNavBar();
