
// Module for gameboard.
const gameBoard = (() => {
    let boardValues = ["1", "2", "3", "", "", "", "", "", ""];

    const getValue = (index) => {
        return boardValues[index];
    }
    const setValue = (index, sign) => {
        boardValues[index] = sign;
        console.log(boardValues[index]);
    }

    return {getValue, setValue, boardValues};
})();

// Player objective factory.
const player = (symbol) => {
    this.playerSymbol = symbol;



    return {};
};

// All DOM stuff here.
const domController = (() => {
    let boardSigns = document.querySelectorAll(".boardSpot");


    boardSigns.forEach(sign => addEventListener("click", function () {
        gameBoard.setValue(sign.dataset.index, gameController.makeMove());
        sign.textContent = gameBoard.getValue(sign.dataset.index);
    }));

    // I was solving below a bug where setValue gets repeated for all buttons
    const setListeners = () => {

    }





    return {};
})();

const gameController = (() => {
    const playerOne = player("X");
    const playerTwo = player("O");
    let playerOneTurn = true;

    const makeMove = () => {
        if (playerOneTurn) {
            playerOneTurn = false;
            return "X";
        } else {
            playerOneTurn = true;
            return "O";
        }
    }

    return {makeMove};
})();












