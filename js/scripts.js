const cards = document.querySelectorAll('.carta');
cards.forEach(card => card.addEventListener('click', flipCard));

let btnStart, btnReset;
let hasFlippedCard = false;
let lockBoard = true;
let firstCard, secondCard;

function onLoad() {
  btnStart = document.getElementById('btnStart');
  btnReset = document.getElementById('btnReset');
}

function Start() {
  lockBoard = false;
}

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('girar');
  
  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;

    return;
  }

  secondCard = this;
  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('girar');
    secondCard.classList.remove('girar');

    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
}

window.onload = onLoad;