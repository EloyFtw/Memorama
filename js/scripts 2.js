const cards = document.querySelectorAll('.carta');
var girados = [];

let hasFlippedCard = false, lockBoard = false, started = false;
let firstCard, secondCard;
let btnStart, btnReset;
let lblAciertos, lblEquivocaciones, lblTimer;
let Aciertos, MaxAciertos = 18, Equivocaciones, MaxEquivocaciones = 55;
let Hours, Minutes, Seconds, TimerActive;

function Load() {
  btnStart = document.getElementById("btnStart");
  btnReset = document.getElementById("btnReset");
  btnStart.onclick = Start;
  btnReset.onclick = Reset;


  lblAciertos = document.getElementById('Aciertos');
  lblEquivocaciones = document.getElementById('Equivocaciones');
  lblTimer = document.getElementById('Timer');
  setTime();
}

function Start() {
  if (!started)
  {
    Inicializar();
    Hours = '000';
    Minutes = '00';
    started = TimerActive = true;
  }
}

function Reset() {
  lblAciertos.innerHTML = "";
  lblEquivocaciones.innerHTML = "";
  lblTimer.innerHTML = "";
  Hours = Minutes = Seconds = 0;
  started = TimerActive = false;
  let i = 0;
  while (i < cards.length) {
    cards[i++].classList.remove('girar');
  }
  while (girados.length > 0) {
    girados.pop().addEventListener('click', flipCard);
  }
}

function Inicializar() {
  Aciertos = Equivocaciones = 0;
  lblAciertos.innerHTML = "0/" + MaxAciertos;
  lblEquivocaciones.innerHTML = "0/" + MaxEquivocaciones;
  lblTimer.innerHTML = '000:00:00';
  Hours = Minutes = Seconds = 0;
  shuffle();
}

function setTime() {
  if (TimerActive)
  {
    Seconds++;
    if (Seconds == 60) {
      Seconds = 0;
      Minutes++;
      if (Minutes < 10) {Minutes = '0' + Minutes; }
    }
    if (Minutes == 60) {
      Minutes = 0;
      Hours++;
      if (Hours < 100) { Hours = '00' + Hours; }
      else if (Hours < 10) { Hours = '0' + Hours; }
    }
    if (Seconds < 10) {Seconds = '0' + Seconds; }


    lblTimer.innerHTML = Hours + ":" + Minutes + ":" + Seconds;
  }
  setTimeout(setTime, 1000);
}

function flipCard() {
  if (lockBoard || !started) return;
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
  girados.push(firstCard);
  girados.push(secondCard);
  lblAciertos.innerHTML = ++Aciertos + "/" + MaxAciertos;
  resetBoard();
  if (Aciertos == MaxAciertos) {
    setTimeout(() => {
      started = TimerActive = false;
      alert("¡Lo lograste!")
    }, 500)
  }
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('girar');
    secondCard.classList.remove('girar');
    lblEquivocaciones.innerHTML = ++Equivocaciones + "/" + MaxEquivocaciones;
    if (Equivocaciones == MaxEquivocaciones) {
      started = TimerActive = false;
      alert("¡Perdiste!")
    }
    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * cards.length);
    card.style.order = randomPos;
  });
}

cards.forEach(card => card.addEventListener('click', flipCard));
window.onload = Load;