'use strict';
// console.log(document.querySelector(".message").textContent);
// document.querySelector(".message").textContent = "Initialize Guessing";
// console.log(document.querySelector(".message").textContent);
// document.querySelector(".number").textContent = 20;
// console.log(document.querySelector(".number").textContent);
// document.querySelector(".score").textContent = 12;
// console.log(document.querySelector(".score").textContent);
// document.querySelector(".guess").value = 20;
// console.log(document.querySelector(".number").textContent);

// ******************** Project Start From Here ************************

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
    // document.querySelector(".message").textContent = "Start guessing...";
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
    // document.querySelector(".message").textContent = "Start Guessing...";
    // When there is no input
    if (!guessValue) {
        // document.querySelector(".message").textContent = "No Number Entered ❓❔❓";
        displayMessage("No Number Entered ❓❔❓");
    }
    else if (score > 0) {
        // When player wins
        if (guessValue === secretNumber) {
            // document.querySelector(".message").textContent = "Correct Number ✨";
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
            // document.querySelector(".message").textContent = guessValue < secretNumber ? "Too low 🔽" : "Too high 🔼";
            displayMessage(guessValue < secretNumber ? "Too low 🔽" : "Too high 🔼");
            document.querySelector('body').style.backgroundColor = 'rgb(240 116 196)';
            score--;
        }
        // When guess too low
        // else if (guessValue < secretNumber) {
        //     document.querySelector(".message").textContent = "Too low 🔽";
        //     document.querySelector('body').style.backgroundColor = 'rgb(240 116 196)';
        //     score--;
        // }
        // // When guess too high
        // else if (guessValue > secretNumber) {
        //     document.querySelector(".message").textContent = "Too high 🔼";
        //     document.querySelector('body').style.backgroundColor = 'rgb(230, 10, 46)';
        //     score--;
        // }
        document.querySelector(".score").textContent = score;
    }

    if (score === 0) {
        // document.querySelector(".message").textContent = "😭 You lost the game 😭";
        displayMessage("😭 You lost the game 😭");
        document.querySelector(".score").textContent = 0;
    }

})
