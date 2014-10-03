//This data structure represents one square on a chessboard and
//holds information such as its position and what piece (if any) occupies it.
"use strict";
function Square(x, y, piece) {
    this.x = x;
    this.y = y;
    this.piece = piece;
    this.flair = false;
    this.legalMove = false;
    this.fork = false;
    this.current = false;
    this.previous = false;
    this.blackControl = null;
    this.whiteControl = null;
};