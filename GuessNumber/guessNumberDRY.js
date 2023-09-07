'use strict';
// ******************** Project Start From Here (This code is implemented using DRY rule) ************************

let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highScore = 0;
console.log(secretNumber);
// Display Message Function
const displayMessage = function (message) {
    document.querySelector(".message").textContent = message;
}
// Implementing Again Button Functionality
document.querySelector('.again').addEventListener('click', function () {
    score = 20;
    secretNumber = Math.trunc(Math.random() * 20) + 1;
    document.querySelector(".score").textContent = score;
    displayMessage("Start guessing...");
    document.querySelector(".number").textContent = '?';
    document.querySelector('body').style.backgroundColor = '#222';
    document.querySelector('.number').style.width = '15rem';
    document.querySelector('.number').style.backgroundColor = '#eee';
    document.querySelector('.number').style.border = 'none';
    document.querySelector('.guess').value = '';
})
// Input Number Function (We can also define the function outside and use its name here)
document.querySelector(".check").addEventListener('click', function () {
    let guessValue = Number(document.querySelector(".guess").value);
    // When there is no input
    if (!guessValue) {
        displayMessage("No Number Entered ❓❔❓");
    }
    else if (score > 0) {
        // When player wins
        if (guessValue === secretNumber) {
            displayMessage("Correct Number ✨");
            document.querySelector(".number").textContent = secretNumber;
            document.querySelector('body').style.backgroundColor = 'rgb(90, 206, 90)';
            document.querySelector('.number').style.width = '30rem';
            document.querySelector('.number').style.backgroundColor = 'rgb(68, 203, 207)';
            document.querySelector('.number').style.border = '2px solid black';
            if (score > highScore) {
                highScore = score;
                document.querySelector('.highscore').textContent = highScore;
            }
        }
        // When guess is wrong ==> An alternate code for below one
        else if (guessValue !== secretNumber) {
            displayMessage(guessValue < secretNumber ? "Too low 🔽" : "Too high 🔼");
            document.querySelector('body').style.backgroundColor = 'rgb(240 116 196)';
            score--;
        }
        document.querySelector(".score").textContent = score;
    }
    if (score === 0) {
        displayMessage("😭 You lost the game 😭");
        document.querySelector(".score").textContent = 0;
    }
})