"use strict";

const gameBoard = (function () {
  let board = ['', '', '', '', '', '', '', '', ''];
  const getInput = function (blockNum, type) {
    if (type === 'user') {
      board[blockNum] = 'X'
      showBoard(blockNum);
    } else if (type === 'computer') {
      board[blockNum] = 'O'
      showBoard(blockNum);
    }
  };
  const showBoard = function (blockNum) {
    const block = document.getElementById(`${blockNum}`)
    block.textContent = board[blockNum];
    displayController.checkGameOver(gameBoard.getBoard());
  };
  const getBoard = () => board;
  const resetBoard = function () {
    for (let i = 0; i < 9; i++) {
      board[i] = "";
      document.getElementById(`${i}`).textContent = "";
    }
  };
  return {
    getInput,
    getBoard,
    resetBoard,
  };
})();

const player = (playerType) => {
  let blockId, emptySpot;
  const userInput = function () {
    const board = document.getElementById("gameBoard");
    board.addEventListener("click", function (e) {
      const state = document.getElementById("result").textContent;
      if (!e.target.textContent && !state) {
        blockId = +e.target.id;
        gameBoard.getInput(blockId, playerType)
        computer.computerInput();
      }
    });
  };
  const getBlockId = () => blockId;
  const computerInput = () => {
    const state = document.getElementById("result").textContent;
    if (state) return;
    const block = document.querySelectorAll(".block");
    const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    for (let i = 0; i < block.length; i++) {
      if (block[i].textContent) {
        emptySpot = arr.splice(arr.indexOf(i), 1);
      }
    }
    if (arr.length) {
      blockId = arr[Math.floor(Math.random() * (arr.length))];
      gameBoard.getInput(blockId, playerType)
    }
  }
  if (playerType === 'user') {
    return {
      userInput,
      getBlockId,
    };
  } else if (playerType === 'computer') {
    return {
      computerInput,
      getBlockId,
    };
  }
};

const displayController = (function () {
  const result = document.getElementById('result')
  const checkGameOver = function (board) {
    if (board[0] === board[1] && board[1] === board[2] && board[0] === board[2]) {
      showResult(board[0], ['0', '1', '2'])
    } else if (board[3] === board[4] && board[4] === board[5] && board[3] === board[5]) {
      showResult(board[3], ['3', '4', '5']);
    } else if (board[6] === board[7] && board[7] === board[8] && board[6] === board[8]) {
      showResult(board[6], ['6', '7', '8']);
    } else if (board[0] === board[3] && board[3] === board[6] && board[0] === board[6]) {
      showResult(board[0], ['0', '3', '6']);
    } else if (board[1] === board[4] && board[4] === board[7] && board[1] === board[7]) {
      showResult(board[1], ['1', '4', '7']);
    } else if (board[2] === board[5] && board[5] === board[8] && board[2] === board[8]) {
      showResult(board[2], ['2', '5', '8']);
    } else if (board[0] === board[4] && board[4] === board[8] && board[0] === board[8]) {
      showResult(board[0], ['0', '4', '8']);
    } else if (board[2] === board[4] && board[4] === board[6] && board[2] === board[6]) {
      showResult(board[2], ['2', '4', '6']);
    } else if (!board.includes('')) showResult('draw', null);
  };
  const showResult = function (value, blockId) {
    if (value === "X") {
      for (let i of blockId) document.getElementById(i).style.color = 'green';
      result.textContent = "Congrats! You Win 🎉";
      result.style.color = "green";
      console.log("Congrats! You Win 🎉");
    } else if (value === "O") {
      for (let i of blockId) document.getElementById(i).style.color = 'red';
      result.textContent = "Oops! You Lose 💥";
      result.style.color = "red";
    } else if (value === "draw") {
      result.textContent = "Draw";
      console.log("Draw");
    }
  }
  const reset = function () {
    for (let i = 0; i < 9; i++)
      document.getElementById(`${i}`).style.color = "black";
    result.textContent = "";
    result.style.color = "black";
  }
  return {
    checkGameOver,
    reset,
  }
})();

const restart = (function () {
  const reset = function () {
    const resetBtn = document.querySelector(".restart");
    resetBtn.addEventListener("click", function () {
      gameBoard.resetBoard();
      displayController.reset();
    })
  };
  return {
    reset,
  }
})()

const computer = player('computer');
const user = player('user');
user.userInput();
restart.reset();