"use strict";

// flag: "pen-flag" = penguin's turn, "bear-flag" = bear's turn
let flag = "pen-flag"; // A

// Turn counter: Total 9 squares
let counter = 9; // C

// Get DOM elements for the squares
const a_1 = document.getElementById("a_1");
const a_2 = document.getElementById("a_2");
const a_3 = document.getElementById("a_3");
const b_1 = document.getElementById("b_1");
const b_2 = document.getElementById("b_2");
const b_3 = document.getElementById("b_3");
const c_1 = document.getElementById("c_1");
const c_2 = document.getElementById("c_2");
const c_3 = document.getElementById("c_3");

// Messages
const msgtxt1 = '<p class="image"><img src="img/penguins.jpg" width=61px height=61px></p><p class="text">Penguins Attack!</p>';
const msgtxt2 = '<p class="image"><img src="img/whitebear.jpg" width=61px height=61px></p><p class="text">WhiteBear Attack!</p>';
const msgtxt3 = '<p class="image"><img src="img/penguins.jpg" width=61px height=61px><img src="img/whitebear.jpg" width=61px height=61px></p><p class="text">Draw!!</p>'; [cite_start]// Draw message [cite: 619]

// Initialize when page loads
window.addEventListener("DOMContentLoaded", function() {
    setMessage("pen-turn"); // Set initial message
}, false);


// Win or Lose Judgment (to be implemented later)


// Click Events for Squares
a_1.addEventListener("click", () => { isSelect(a_1); });
a_2.addEventListener("click", () => { isSelect(a_2); });
a_3.addEventListener("click", () => { isSelect(a_3); });
b_1.addEventListener("click", () => { isSelect(b_1); });
b_2.addEventListener("click", () => { isSelect(b_2); });
b_3.addEventListener("click", () => { isSelect(b_3); });
c_1.addEventListener("click", () => { isSelect(c_1); });
c_2.addEventListener("click", () => { isSelect(c_2); });
c_3.addEventListener("click", () => { isSelect(c_3); });


// Function runs when a square is clicked
function isSelect(selectSquare) {
    if (flag === "pen-flag") {
        // Penguin's turn logic
        selectSquare.classList.add("js-pen-checked"); [cite_start]// Display Penguin [cite: 355]
        selectSquare.classList.add("js-unclickable"); [cite_start]// Disable click [cite: 400]
        
        // Switch turn to Bear
        setMessage("bear-turn");
        flag = "bear-flag"; 
        
    } else {
        // Bear's turn logic
        selectSquare.classList.add("js-bear-checked"); [cite_start]// Display Bear [cite: 375]
        selectSquare.classList.add("js-unclickable"); // Disable click
        
        // Switch turn to Penguin
        setMessage("pen-turn");
        flag = "pen-flag";
    }

    // Decrement counter
    counter--; 

    // Check for Draw (Game Over)
    if (counter === 0) {
        setMessage("draw");
    }
}


// Message Switching Function
function setMessage(id) {
    const msgtext = document.getElementById("msgtext");
    
    switch (id) {
        case 'pen-turn':
        msgtext.innerHTML = msgtxt1;
            break;
        case 'bear-turn':
            msgtext.innerHTML = msgtxt2;
            break;
        case 'draw':
            msgtext.innerHTML = msgtxt3;
            break;
        default:
            break;
    }
}