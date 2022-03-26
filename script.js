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

    return {getValue, setValue, winningIndexes, resetArray, boardValues};
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
        }
        else {
            gameBoard.setValue(sign.dataset.index, gameController.makeMove(sign.dataset.index));
            sign.textContent = gameBoard.getValue(sign.dataset.index);
            gameController.checkWinner();
            computerPlay();

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
        gameController.computerSelected = true;
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

    // AI
    const computerPlay = () => {
        if (gameController.computerSelected && !gameController.playerOneTurn) {
            let index = AI.getBestMove();
            domController.boardSigns.item(index).textContent = gameBoard.getValue(index);
            gameController.checkWinner();
        }
    }

    return {announceWinner, announceTie, boardSigns};
})();


// Module for controlling gameflow.
const gameController = (() => {
    const playerOne = player("X");
    const playerTwo = player("O");
    let playerOneTurn = true;
    let computerSelected = false;
    let roundCount = 0;
    let winnerSign = "";

    const makeMove = (index) => {
        if (gameController.playerOneTurn && gameBoard.getValue(index) === "") {
            gameController.playerOneTurn = false;
            roundCount++;
            return playerOne.getSign(index);
        } else if (!gameController.playerOneTurn && gameBoard.getValue(index) === ""){
            gameController.playerOneTurn = true;
            roundCount++;
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
            && array[0] === "X"){
            gameController.winnerSign = "X";
            return true;
        } else if (array[0] === array[1] && array[1] === array[2]
            && array[0] === "O") {
            gameController.winnerSign = "O";
            return true;
        }

        else {
            return false;
        }
    };


    return {makeMove, checkWinner, playerOneTurn, computerSelected, winnerSign, areEquals};
})();


// Module for AI.
const AI = (() => {
    let playerTurn = gameController.playerOneTurn;
    // Minimax algorithm
    const minimax = (newBoard) => {
        let availableSquares = getEmptySquares(newBoard);
        let moves = [];

        // Base
        if (gameController.areEquals(newBoard) && gameController.winnerSign === "X"){
            return {score: -10};
        } else if (gameController.areEquals(newBoard) && gameController.winnerSign === "O"){
            return {score: 10};
        } else if (availableSquares.length === 0){
            return {score: 0};
        }

        // Loop through empty spaces
        for (let i = 0; availableSquares.length; i++) {
            let id = availableSquares[i];
            let move = {};
            move.id = id;

            let savedBoardSpace = newBoard[id];
            // Check whose turn it is
            if (playerTurn) {
                newBoard[i] = "X";
            } else {
                newBoard[i] = "O";
            }
            // Recursion
            if (playerTurn) {
                AI.playerTurn = !AI.playerTurn;
                move.score = minimax(newBoard).score;
            } else {
                AI.playerTurn = !AI.playerTurn;
                move.score = minimax(newBoard).score;
            }
            newBoard[id] = savedBoardSpace;
            moves.push(move);
        }

        let bestMove;
        if (playerTurn) {
            let bestScore = -Infinity;
            for (let i = 0; moves.length; i++) {
                if (moves[i].score > bestScore) {
                    bestScore = moves[i].score;
                    bestMove = moves[i];
                }
            }
        } else{
            let bestScore = +Infinity;
            for (let i = 0; moves.length; i++) {
                if (moves[i].score > bestScore) {
                    bestScore = moves[i].score;
                    bestMove = moves[i];
                }
            }
        }
        return bestMove;
    }

    const getEmptySquares = (newBoard) => {
        return newBoard.filter(square => square.length === 0);
    }

    const getBestMove = () => {
        return minimax(gameBoard.boardValues).index;
    }

    return {getBestMove, playerTurn};
})();












