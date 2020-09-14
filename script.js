//HTML ELEMENTS
let cardDivs = document.querySelectorAll('.card');
// let arrCardDivs = [].slice.call(cardDivs)

//CREATE ARRAY OF IMGAGE PATHS
let imgArr = new Array();

Array.prototype.shuffle = function(){
  for(let i = imgArr.length-1; i > 0; i--){
    const j = Math.floor(Math.random() * i)
    const temp = imgArr[i]
    imgArr[i] = imgArr[j]
    imgArr[j] = temp
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
//variables to keep information about currently open card
let waitingCardImg = ''
let waitingCardObject;
let waitingCardImgSrc;

//looping through array and listening for events
cardsArray.forEach((objCard,index) => {
  //create img tag and add img link to divs in object.card(which is an html element)
  let imgTag = document.createElement('img')
  imgTag.setAttribute('src', objCard.imgSource)
  imgTag.setAttribute('id', index)
  imgTag.classList.add('imgStyle')
  objCard.card.appendChild(imgTag);
  
  //listen for the click
  objCard.card.addEventListener('click', function(e){
    let cardOpen = cardsArray.filter(objCard => objCard.isOpen === true);
    let cardIsFound = cardsArray.filter(objCard => objCard.isFound === true);
    // if the game just started
    if(cardOpen.length === 0){
      objCard.isOpen = true;
      let imgId = document.getElementById(objCard.position)
      imgId.classList.toggle('display')
      //add informatiom of the current card to waiting variables
      waitingCardImg = imgId;
      waitingCardObject = objCard;
      waitingCardImgSrc = objCard.imgSource
    }
    
    //when there is an open card
    if(cardOpen.length > 0 ){
      //if second open card is same as the waiting card
      if (objCard.imgSource.localeCompare( waitingCardImgSrc)=== 0) {
        let secondImgId = document.getElementById(objCard.position)
        secondImgId.classList.toggle('display')
        
        //change isFound status to true;
        waitingCardObject.isFound = true;
        objCard.isFound = true;
        
        //remove isOpen key from current objects
        delete objCard.isOpen;
        delete waitingCardObject.isOpen;

        resetWaiting();
        
      }
      
      //if second open card different from the waiting card
      if (objCard.imgSource.localeCompare( waitingCardImgSrc) !== 0 && waitingCardImgSrc.length>0) {
        let secondImgId = document.getElementById(objCard.position)
        secondImgId.classList.toggle('display');
        setTimeout(()=>{
          secondImgId.classList.toggle('display');
          waitingCardImg.classList.toggle('display');
        },500)
        
        objCard.isOpen = false;
        waitingCardObject.isOpen = false; 
      }
      cardOpen.pop()
    }
  })
});


//FUNCTIONS
function resetWaiting(){
  waitingCardImg = '';
  waitingCardObject = {};
  waitingCardImgSrc = '';
}


