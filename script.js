"use strict";

const gameBoard = (function () {
  const gameBoard = [
    ["o", "x", "o"],
    ["x", "x", "o"],
    ["o", "o", "x"],
  ];
  const showBoard = function () {
    let board = document.getElementById("gameBoard");

    for (let i = 0; i < board.children.length; i++) {
      for (let j = 0; j < board.children[i].children.length; j++) {
        board.children[i].children[j].textContent = gameBoard[i][j];
      }
    }
  };
  return { showBoard };
})();

// gameBoard.showBoard();

const player = (function () {
  const board = document.getElementById("gameBoard");

  board.addEventListener("click", function (e) {
    if (!e.target.textContent) {
      e.target.textContent = "X";
      computer();
    }
  });

  function computer() {
    const block = document.querySelectorAll(".block");

    const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    for (let i = 0; i < block.length; i++) {
      if (block[i].textContent) {
        arr.splice(arr.indexOf(i), 1);
      }
    }

    if (arr.length) {
      let index = arr[Math.floor(Math.random() * (arr.length - 1))];
      block[index].textContent = "O";
      console.log(arr, index);
    }
  }
})();
