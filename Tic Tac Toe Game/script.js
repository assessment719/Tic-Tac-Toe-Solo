const boxes = document.querySelectorAll(".box");
const msg = document.querySelector("#msg");
const result = document.querySelector(".winner-container");
const newBtn = document.querySelector("#newBtn");
const resetBtn = document.querySelector("#resetBtn");

let turnO = true;
let count = 0;

const winPatterns = [
    [0, 1, 2],
    [0, 4, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

const drawGame = () => {
    msg.innerText = "The Game Is Draw. Play Again!";
    result.classList.remove("hide");
    disableBoxes();
    count = 0;
};

const disableBoxes = () => {
    for (let box of boxes) {
        box.classList.add("disabled");
    }
};

const showWinner = (winner) => {
    if (winner === "O") {
        msg.innerText = "Congratulation! You Are The Winner.";
    } else if (winner === "X") {
        msg.innerText = "Oh Noooooo! Computer Is The Winner.";
    }
    result.classList.remove("hide");
    disableBoxes();
    count = 0;
};

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;

        if (pos1 !== "" && pos2 !== "" && pos3 !== "") {
            if (pos1 === pos2 && pos2 === pos3) {
                showWinner(pos1);
                return true;
            }
        }
    }
    return false;
};

const computerTurn = () => {
    let emptyBoxes = [];
    for (let i = 0; i < boxes.length; i++) {
        if (boxes[i].innerText === "") {
            emptyBoxes.push(i);
        }
    }

    if (emptyBoxes.length > 0) {
        setTimeout(() => {
            let randIdx = emptyBoxes[Math.floor(Math.random() * emptyBoxes.length)];
            boxes[randIdx].innerText = "X";
            boxes[randIdx].style.color = "blue";
            boxes[randIdx].classList.add("disabled");
            turnO = true;
            count++;

            let isWinner = checkWinner();
            if (count === 9 && !isWinner) {
                drawGame();
            }
        }, 500);
    };
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO && box.innerText === "") {
            box.innerText = "O";
            box.classList.add("disabled");
            turnO = false;
            count++;

            let isWinner = checkWinner();
            if (isWinner) {
                return;
            }
            if (count < 9) {
                computerTurn();
            } else if (count === 9) {
                drawGame();
            }
        }
    });
});

const restartGame = () => {
    result.classList.add("hide");
    turnO = true;
    count = 0;
    for (let box of boxes) {
        box.classList.remove("disabled");
        box.innerText = "";
        box.style.color = "black";
    }
};

newBtn.addEventListener("click", restartGame);
resetBtn.addEventListener("click", restartGame);
