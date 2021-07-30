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
  const showBoard = function (blockNum, type) {
    const block = document.getElementById(`${blockNum}`)
    block.textContent = board[blockNum];

  };
  return {
    getInput,
  };
})();

const player = (playerType) => {
  let blockId;
  const userInput = function () {
    const board = document.getElementById("gameBoard");
    board.addEventListener("click", function (e) {
      if (!e.target.textContent) {
        blockId = +e.target.id;
        gameBoard.getInput(blockId, playerType)
        computer.computerInput()
      }
    });
  };
  const getBlockId = () => blockId;
  const computerInput = () => {
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
user.userInput();
// computer.computerInput();

const flowController = (function () {})();