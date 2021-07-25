"use strict";

const gameBoard = (function () {
  const gameBoard = ['', '', '', '', '', '', '', '', ''];
  const getInput = function (blockNum, type) {
    if (type === 'user') {
      console.log(blockNum);
      gameBoard[blockNum] = 'X'
      showBoard(blockNum);
    } else if (type === 'computer') {
      gameBoard[blockNum] = 'O'
      showBoard(blockNum);
    }
  };
  const showBoard = function (blockNum) {
    const block = document.getElementById(`${blockNum}`)
    block.textContent = gameBoard[blockNum];
  };
  return {
    getInput,
  };
})();

const player = (playerType) => {
  let blockId = 0;
  let getBlockId = () => blockId;
  let userInput = function () {
    const board = document.getElementById("gameBoard");
    board.addEventListener("click", function (e) {
      if (!e.target.textContent) {
        blockId = +e.target.id;
        gameBoard.getInput(blockId, playerType)
      }
    });
  };
  let computerInput = () => {
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

const user = player('user');
const computer = player('computer');
user.userInput();