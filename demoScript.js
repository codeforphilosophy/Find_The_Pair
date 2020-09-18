//HTML ELEMENTS
let gameCardsDiv = document.querySelector('.game-cards');

gameCardsDiv.addEventListener('click', function (e) {
    if (e.target !== e.currentTarget) {
        var clickedItem = e.target.class;
        console.log("Hello " + clickedItem);
    }
    e.stopPropagation(); 
}, false)



