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
    const resetArray = () => {
        boardValues = ["", "", "", "", "", "", "", "", ""];
    }

    return {getValue, setValue, winningIndexes, resetArray};
})();


// All DOM stuff here.
const domController = (() => {
    let boardSigns = document.querySelectorAll(".boardSpot");
    const btnRestart = document.querySelector(".restart");
    const btnHuman = document.querySelector(".btnSelectHuman");
    const btnComputer = document.querySelector(".btnSelectAi");




    // Event listeners for board spots
    boardSigns.forEach(sign => sign.addEventListener("click", function () {
        if (gameBoard.getValue(sign.dataset.index) !== ""){
            console.log("nonii")
        } else {
            gameBoard.setValue(sign.dataset.index, gameController.makeMove(sign.dataset.index));
            sign.textContent = gameBoard.getValue(sign.dataset.index);
            gameController.checkWinner();
        }
    }));


    // Event listener for restart button
    btnRestart.addEventListener("click", () => {
        document.querySelector(".modal-container").style.display ="none";
        resetBoard();
    })

    // Event listeners for opponent selection buttons.
    btnHuman.addEventListener("click", () => {
        document.querySelector(".beginning-screen").style.display ="none";
    });
    btnComputer.addEventListener("click", () => {
        document.querySelector(".beginning-screen").style.display = "none";
    })


    const resetBoard = () => {
        gameBoard.resetArray();
        boardSigns.forEach(sign => sign.textContent = "");
        btnRestart.disabled = true;
    }

    const announceWinner = () => {
        document.querySelector(".modal-container").style.display ="inline";
        if (gameController.playerOneTurn) {
            document.querySelector(".modal-text").textContent = `Nice, you won!`;
        } else {
            document.querySelector(".modal-text").textContent = `Nice, you won!`;
        }
        btnRestart.disabled = false;
    }
    const announceTie = () => {
        document.querySelector(".modal-container").style.display ="inline";
        document.querySelector(".modal-text").textContent = "It's a tie!";
        btnRestart.disabled = false;
    }

    const computerPlay = () => {

    }

    return {announceWinner, announceTie};
})();


// Module for controlling gameflow.
const gameController = (() => {
    const playerOne = player("X");
    const playerTwo = player("O");
    let playerOneTurn = true;
    let computerSelected = false;
    let roundCount = 0;

    const makeMove = (index) => {
        if (playerOneTurn && gameBoard.getValue(index) === "") {
            playerOneTurn = false;
            roundCount++;
            return playerOne.getSign(index);
        } else if (!playerOneTurn && gameBoard.getValue(index) === ""){
            playerOneTurn = true;
            roundCount++;
            return playerTwo.getSign(index);
        }
        else {
            return;
        }
    };

    // Started making AI
    const computerMakeMove = () => {

    }


    const checkWinner = () => {
        let partOfBoard = [];
        for (let i = 0; i < 8; i++){
            for (let j = 0; j < 3; j++) {
                partOfBoard.push(gameBoard.getValue(gameBoard.winningIndexes[i][j]));
                console.log(gameBoard.getValue(gameBoard.winningIndexes[i[j]]));
            }
            // === If win condition is met
            if (areEquals(partOfBoard)){
                console.log("game over");
                domController.announceWinner();
                playerOneTurn = true;
                roundCount = 0;
            }
            partOfBoard = [];
        }
        // === If it's a tie
        if (roundCount === 9){
            domController.announceTie();
            roundCount = 0;
            playerOneTurn = true;
        }
    };

    const areEquals = (array) => {
        if (array[0] === array[1] && array[1] === array[2]
            && (array[0] === "X" || array[0] === "O")){
            return true;
        } else {
            return false;
        }
    };


    return {makeMove, checkWinner, playerOneTurn};
})();












