//HTML ELEMENTS
let cardDivs = document.querySelectorAll('.card');
let newGameButton = document.querySelector('.newGame')

//variables to keep information about currently open card
let waitingCardImgId = ''
let waitingCardObject;
let boarLock = false;
let waitingCardEvent;

//CREATE ARRAY OF IMGAGE PATHS
let imgArr = new Array();
Array.prototype.shuffle = function(){
  for(let i = imgArr.length-1; i > 0; i--){
    const j = Math.floor(Math.random() * i);
    const temp = imgArr[i];
    imgArr[i] = imgArr[j];
    imgArr[j] = temp;
  }
}
for (let i=0; i< 8;i++){
  imgArr.push("assets/visuals/p"+(i+1)+".jpg");
  imgArr.push("assets/visuals/p"+(i+1)+".jpg");
}
imgArr.shuffle();



//CREATING CARD CLASS AND ADDING INSTANCES TO AN ARRAY
let cardsArray = new Array();
class Card{
  constructor (card, position, isOpen, imgSource, isFound){
    this.card = card;
    this.position = position;
    this.isOpen = isOpen;
    this.imgSource = imgSource;
    this.isFound = isFound;
  }
}

for (let i = 0; i < cardDivs.length; i++) {
  cardsArray.push(new Card(cardDivs[i], i, false, imgArr[i], false))
}


//LISTENING FOR CLICK: CHANING BLANK CARD TO IMG
cardsArray.forEach((objCard,index) => {
  //create img tag and add img link to divs in object.card(which is an html element)
  let imgTag = document.createElement('img')
  imgTag.setAttribute('src', objCard.imgSource)
  imgTag.setAttribute('id', index)
  imgTag.classList.add('imgStyle')
  objCard.card.appendChild(imgTag);
  
  //listen for the click
  objCard.card.addEventListener('click', flipCard.bind(objCard))
});


//FUNCTIONS
function flipCard(e){

  if(boarLock) return;
  
  let cardOpen = cardsArray.filter(objCard => objCard.isOpen === true);
  // let cardIsFound = cardsArray.filter(objCard => objCard.isFound === true);
  
  // *If the game just started*
  if(cardOpen.length === 0){
    this.isOpen = true;
    let imgId = document.getElementById(this.position)
    imgId.classList.add('display')
    //add informatiom of the current card to waiting variables
    waitingCardImgId = imgId;
    waitingCardObject = this;
    waitingCardEvent = e;
  }
  
 // *When there is an open card*
  if(cardOpen.length > 0 && waitingCardEvent.target !== e.currentTarget){
    
    //**if second open card is same as the waiting card**
    if (this.imgSource.localeCompare(waitingCardObject.imgSource)=== 0) {
      let secondImgId = document.getElementById(this.position);
      secondImgId.classList.add('display'); 
      //change isFound status to true;
      waitingCardObject.isFound = true;
      this.isFound = true;
      
      //remove isOpen key from current objects
      delete this.isOpen;
      delete waitingCardObject.isOpen;
      resetWaiting();
      return;
    }
    
    //**if second open card different from the waiting card**
    if (this.imgSource.localeCompare( waitingCardObject.imgSource) !== 0) {
      boarLock = true;
      let secondImgId = document.getElementById(this.position);
      secondImgId.classList.add('display');
      
      setTimeout(()=>{
        secondImgId.classList.remove('display');
        waitingCardImgId.classList.remove('display');
        boarLock = false;
      },1000)

      this.isOpen = false;
      waitingCardObject.isOpen = false; 
    }
    cardOpen.pop()
  }
}

function resetWaiting(){
  waitingCardImg = '';
  waitingCardObject = {};
}


