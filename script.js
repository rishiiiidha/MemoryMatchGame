const cards = document.querySelectorAll(".card");
let matchedCards = 0;
let cardOne = null, cardTwo = null;
let disableDeck = false;

function flipCard(e) {
  let clickedCard = e.target;
  if (!clickedCard.classList.contains("card")) return; // Ignore clicks on non-card elements

  if (disableDeck || clickedCard === cardOne) return; // Ignore clicks if deck is disabled or if the same card is clicked twice

  clickedCard.classList.add("flip");

  if (!cardOne) {
    cardOne = clickedCard;
  } else {
    cardTwo = clickedCard;
    disableDeck = true;
    matchCards();
  }
}

function matchCards() {
  let cardOneImg = cardOne.querySelector("img").src;
  let cardTwoImg = cardTwo.querySelector("img").src;

  if (cardOneImg === cardTwoImg) {
    matchedCards++;
    if (matchedCards === 10) {
      setTimeout(shuffleCards, 800);
    }
    cardOne.removeEventListener("click", flipCard);
    cardTwo.removeEventListener("click", flipCard);
    cardOne = cardTwo = null;
    disableDeck = false;
  } else {
    setTimeout(() => {
      cardOne.classList.add("shake");
      cardTwo.classList.add("shake");
    }, 400);

    setTimeout(() => {
      cardOne.classList.remove("shake", "flip");
      cardTwo.classList.remove("shake", "flip");
      cardOne = cardTwo = null;
      disableDeck = false;
    }, 1000);
  }
}

function shuffleCards() {
  matchedCards = 0;
  cardOne = cardTwo = null;
  disableDeck = false;
  let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  arr.sort(() => Math.random() > 0.5 ? 1 : -1);

  cards.forEach((card, index) => {
    card.classList.remove("flip");
    let imgTag = card.querySelector("img");
    imgTag.src = `images/i${arr[index]}.png`;
    card.addEventListener("click", flipCard);
  });
}

shuffleCards();
