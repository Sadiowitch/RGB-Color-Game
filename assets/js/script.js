var numbSquares = 6;
var colors = [];
var pickedColor;
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.getElementById("message");
var header = document.getElementById("header");
var resetButton = document.getElementById("reset");
var modeButtons = document.querySelectorAll(".modeBtn");

init();

function init() {
    setUpModeButtons();
    setUpSquares();
    reset();
}

function setUpModeButtons() {
    // mode buttons (Easy / Difficult);
    for (var i = 0; i < modeButtons.length; i++) {
        modeButtons[i].addEventListener("click", function() {
            modeButtons[0].classList.remove("selected");
            modeButtons[1].classList.remove("selected");
            this.classList.add("selected");
            // how many squares to use?
            if (this.textContent === "Easy") {
                numbSquares = 3;
            } else {
                numbSquares = 6;
            }
            reset();
        })
    }
}

function setUpSquares() {
    // set up square listeners;
    for (var i = 0; i < squares.length; i++) {
        // add click listeners to each square;
        squares[i].addEventListener("click", function() {
            // grab color of clicked square;
            var clickedColor = this.style.backgroundColor;
                // compare color to picked color;
                if (clickedColor === pickedColor) {
                    messageDisplay.innerHTML = "<i class='fas fa-check-circle'></i>";
                    messageDisplay.style.color = "rgb(55, 224, 29)";
                    changeColors(clickedColor);
                    header.style.backgroundColor = clickedColor;
                    resetButton.textContent = "Play Again?";
                } else {
                    this.style.backgroundColor = "rgb(48, 48, 48)";
                    this.style.boxShadow = "none";
                    messageDisplay.innerHTML = "<i class='fas fa-times-circle'></i>";
                    messageDisplay.style.color = "rgb(224, 29, 29)";
                }
        })
    }
}

function reset() {
      //  generate new colors;
      colors = generateRandomColors(numbSquares);
      // pick a new random color from array;
      pickedColor = pickColor();
      // change display to match picked color;
      colorDisplay.textContent = pickedColor;
      resetButton.textContent = "New Colors";
      messageDisplay.textContent = "";
      // change colors of the squares;
      for (var i = 0; i < squares.length; i++) {
          if (colors[i]) {
            squares[i].style.display = "block";
            squares[i].style.backgroundColor = colors[i];
          } else {
            squares[i].style.display = "none";
          }
      }
      header.style.backgroundColor = "rgb(0, 0, 0)";
}

resetButton.addEventListener("click", function() {
    reset();
})

// make the squares colors match; 
function changeColors(color) {
    for (var i = 0; i < squares.length; i++) {
        squares[i].style.backgroundColor = color;
    }
}

function pickColor() {
    var random = Math.floor(Math.random() * colors.length);
    return colors[random];
}

// generate a random color;
function randomColor() {
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    return "rgb(" + r + ", " + g + ", " + b + ")";
}

// generate as many random colors as asked;
function generateRandomColors(num) {
    var arr = [];
    for (var i = 0; i < num; i++) {
        arr.push(randomColor());
    }
    return arr;
}