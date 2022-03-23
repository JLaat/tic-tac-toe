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
            gameController.checkWinner();
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
    };


    const checkWinner = () => {
        let partOfBoard = [];
        for (let i = 0; i < 8; i++){
            for (let j = 0; j < 3; j++) {
                partOfBoard.push(gameBoard.getValue(gameBoard.winningIndexes[i][j]));
                console.log(gameBoard.getValue(gameBoard.winningIndexes[i[j]]));
            }
            if (areEquals(partOfBoard)){
                console.log("game over");
            }
            partOfBoard = [];
        }
    };

    const areEquals = (array) => {
        if (array[0] === array[1] && array[1] === array[2]
            && array[0] === ("X" || "O ")){
            return true;
        } else {
            return false;
        }
    };


    return {makeMove, checkWinner};
})();












