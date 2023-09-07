'use strict';
// Selecting Elements
const player0Elm = document.querySelector('.player--0');
const player1Elm = document.querySelector('.player--1');
const score0Elm = document.querySelector('#score--0');
const score1Elm = document.querySelector('#score--1');
const current0Elm = document.querySelector('#current--0');
const current1Elm = document.querySelector('#current--1');

const diceElm = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// Variables
let current, activePlayer, score, playingFlag;
// Initializer Function
const initFun = function () {
    current = 0;
    activePlayer = 0;
    score = [0, 0];
    playingFlag = true;

    score0Elm.textContent = 0;
    score1Elm.textContent = 0;
    current0Elm.textContent = 0;
    current1Elm.textContent = 0;

    diceElm.classList.add('hidden');
    player0Elm.classList.remove('player--winner');
    player1Elm.classList.remove('player--winner');
    player0Elm.classList.add('player--active');
    player1Elm.classList.remove('player--active');
}
initFun(); // Calling initilizer function
// Switch player Functionality
const switchPlayer = function () {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    current = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    const player0Elm = document.querySelector('.player--0');
    player0Elm.classList.toggle('player--active');
    player1Elm.classList.toggle('player--active');
}

// Rolling Dice Functionality
btnRoll.addEventListener('click', function () {
    if (playingFlag) {
        // Generating Random Number
        const dice = Math.trunc(Math.random() * 6) + 1;
        console.log(dice);

        // Displaying Image Accordingly
        diceElm.classList.remove('hidden');
        diceElm.src = `dice-${dice}.png`
        // Chcecking Either 1 or other Number
        if (dice !== 1) {
            current += dice;
            document.getElementById(`current--${activePlayer}`).textContent = current;
        } else {
            // Switch To Next Player
            switchPlayer();
        }
    }
})
// Hold Scroe Functionality
btnHold.addEventListener('click', function () {
    if (playingFlag) {
        // Adding current score to active player's score
        score[activePlayer] += current;
        document.getElementById(`score--${activePlayer}`).textContent = score[activePlayer];
        // Checking for win and finishing the game
        if (score[activePlayer] >= 100) {
            playingFlag = false;
            diceElm.classList.add('hidden');
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        }
        // Switching to next player
        switchPlayer();
    }
})
// NewGame Button Functionality
btnNew.addEventListener('click', initFun);