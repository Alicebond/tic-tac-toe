"use strict";

const gameBoard = (function () {
  const gameBoard = [
    ["x", "x", "o"],
    ["o", "x", "o"],
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

gameBoard.showBoard();
