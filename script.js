// Player objective factory.
const player = (symbol) => {
    let playerSymbol = symbol;

    const getSign = () => {
        return playerSymbol;
    }
    return {getSign};
};


// Module for gameboard.
const gameBoard = (() => {
    let boardValues = ["", "", "", "", "", "", "", "", ""];

    const winningIndexes =
        [[0, 1, 2], [3, 4, 5], [6, 7, 8],
         [0, 3, 6], [1, 4, 7], [2, 5, 8],
         [0, 4, 8], [2, 4, 6]];



    const getValue = (index) => {
        return boardValues[index];
    }
    const setValue = (index, sign) => {
        boardValues[index] = sign;
        console.log(boardValues[index]);
    }

    return {getValue, setValue, winningIndexes};
})();


// All DOM stuff here.
const domController = (() => {
    let boardSigns = document.querySelectorAll(".boardSpot");


    boardSigns.forEach(sign => sign.addEventListener("click", function () {
        if (gameBoard.getValue(sign.dataset.index) !== ""){
            console.log("nonii")
        } else {
            gameBoard.setValue(sign.dataset.index, gameController.makeMove(sign.dataset.index));
            sign.textContent = gameBoard.getValue(sign.dataset.index);
        }
    }));

    return {};
})();

// Module for controlling gameflow.
const gameController = (() => {
    const playerOne = player("X");
    const playerTwo = player("O");
    let playerOneTurn = true;

    const makeMove = (index) => {
        if (playerOneTurn && gameBoard.getValue(index) === "") {
            playerOneTurn = false;
            return playerOne.getSign(index);
        } else if (!playerOneTurn && gameBoard.getValue(index) === ""){
            playerOneTurn = true;
            return playerTwo.getSign(index);
        }
        else {
            return;
        }
    }


    // Started making function to check winner, currently figuring out how to use for loops
    const checkWinner = () => {
        for (let i = 0; i < gameBoard.winningIndexes.length; i++){

        }
            }

    return {makeMove};
})();












