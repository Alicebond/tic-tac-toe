"use strict";

const gameBoard = (function () {
  const board = ['', '', '', '', '', '', '', '', ''];
  const getInput = function (blockNum, type) {
    if (type === 'user') {
      board[blockNum] = 'X'
      showBoard(blockNum, type);
    } else if (type === 'computer') {
      board[blockNum] = 'O'
      showBoard(blockNum, type);
    }
  };
  const showBoard = function (blockNum) {
    const block = document.getElementById(`${blockNum}`)
    block.textContent = board[blockNum];
  };
  const getBoard = () => board;
  return {
    getInput,
    getBoard,
  };
})();

const player = (playerType) => {
  let blockId;
  const userInput = function () {
    const board = document.getElementById("gameBoard");
    board.addEventListener("click", function (e) {
      const state = document.getElementById("result").textContent;
      if (!e.target.textContent && !state) {
        blockId = +e.target.id;
        gameBoard.getInput(blockId, playerType)
        displayController.checkGameOver(gameBoard.getBoard());
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
        arr.splice(arr.indexOf(i), 1);
      }
    }
    if (arr.length) {
      blockId = arr[Math.floor(Math.random() * (arr.length - 1))];
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

const computer = player('computer');
const user = player('user');

const displayController = (function () {
  const result = document.getElementById('result')
  const checkGameOver = function (board) {
    if (board[0] === board[1] && board[1] === board[2] && board[0] === board[2]) showResult(board[0]);
    else if (board[3] === board[4] && board[4] === board[5] && board[3] === board[5]) showResult(board[3]);
    else if (board[6] === board[7] && board[7] === board[8] && board[6] === board[8]) showResult(board[6]);
    else if (board[0] === board[3] && board[3] === board[6] && board[0] === board[6]) showResult(board[0]);
    else if (board[1] === board[4] && board[4] === board[7] && board[1] === board[7]) showResult(board[1]);
    else if (board[2] === board[5] && board[5] === board[8] && board[2] === board[8]) showResult(board[2]);
    else if (board[0] === board[4] && board[4] === board[8] && board[0] === board[8]) showResult(board[0]);
    else if (board[2] === board[4] && board[4] === board[6] && board[2] === board[6]) showResult(board[2]);
    else if (!board.includes('')) showResult('draw');
    else return;
  };
  const showResult = function (value) {
    if (value === "X") {
      result.textContent = "Congrats! You Win 🎉";
    } else if (value === "O") {
      result.textContent = "Oops! You Lose 💥";
    } else if (value === "draw") {
      result.textContent = "Draw";
    }
  }

  return {
    checkGameOver,
  }
})();

user.userInput()