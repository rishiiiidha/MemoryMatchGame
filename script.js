const cards = document.querySelectorAll(".card");
let matchedCards=0;
//The forEach() method calls a function for each element in an array and not execute for empty element

let cardOne, cardTwo;// initially no value allocated hence they will pointed to NULL
let disableDeck = false;
function flipCard(e){
  let clickedCard = e.target; // storing user clicked card
  clickedCard.classList.add("flip");
 if(clickedCard!=cardOne&& !disableDeck){
  if(!cardOne){
    return cardOne=clickedCard;
    //return the cardOne value to clickedCard
  }
  cardTwo=clickedCard;
  disableDeck=true;
 let cardOneImg=cardOne.querySelector("img").src,
 cardTwoImg=cardTwo.querySelector("img").src;
 matchCards(cardOneImg,cardTwoImg)

 }
}
function matchCards(img1,img2){
  if(img1==img2){
    matchedCards++;// incremented by 1 for each flip
    if(matchedCards==10){
      setTimeout(function(){
        return shuffleCards();
      },1000);// calling shuffling card after 1 second
    }
    cardOne.removeEventListener("click",flipCard);
    cardTwo.removeEventListener("click",flipCard);
    cardOne=cardTwo="";//setting both cards value to blank
    return disableDeck=false;
  }
  setTimeout(function(){
    //adding shake class to both card after 400ms
    cardOne.classList.add("shake");
    cardTwo.classList.add("shake");
  },400);
  setTimeout(function(){
    //adding shake  & flip classes both cards after 1.2ms
    cardOne.classList.remove("shake","flip");
    cardTwo.classList.remove("shake","flip");
    cardOne=cardTwo="";//setting both cards value to blank
    disableDeck=false;
  },1200);
}
function shuffleCards(){
  matchedCards=0;
  cardOne=cardTwo="";
  disableDeck = false;
  // creatin array of 20 items each item is repated twice
  let arr=[1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0]
  arr.sort(()=>Math.random()>0.5 ? 1: -1);
  //sorting an array item randomly
  cards.forEach(function(card,index){ // adding click even for all the cards
    card.classList.remove("flip");
    //removing flip class from all cards and passing random image to each card
    let imgTag=card.querySelector("img");
    imgTag.src=`images/i${arr[index]}.png`;
    card.addEventListener("click",flipCard);
  });
}
shuffleCards();
cards.forEach(function(card){ // adding click even for all the cards
  card.addEventListener("click",flipCard);
});
