//Base class for the various chess pieces
// See http://www.pasz.com/articles/JSInheritance.html for inheritance approach used here.
"use strict";

// Enumeration of pieces independent of piece colour.
var PIECETYPE = {
  PAWN:  {value: 0, name: 'pawn', material: 1, charCode: 'p'},
  KNIGHT:  {value: 1, name: 'knight', material:  3, charCode: 'n'},
  BISHOP:  {value: 2, name: 'bishop', material: 3, charCode: 'b'},
  ROOK:  {value: 3, name: 'rook', material: 5, charCode: 'r'},
  QUEEN: {value: 4, name: 'queen', material: 9, charCode: 'q'},
  KING:  {value: 5, name: 'king', material: 100, charCode: 'k'}
};

// Think of this as sort of a protected constructor - not for calling explicitly except from subclass definition.
function Piece(){
	// empty constructor
};

// Static method to create a new instance of a subclass of Piece.
// Returns null on bad input.
Piece.newInstance = function(pieceChar){
// <white Piece> ::= 'P' | 'N' | 'B' | 'R' | 'Q' | 'K'
// <black Piece> ::= 'p' | 'n' | 'b' | 'r' | 'q' | 'k'

  var newPiece;
  switch (pieceChar){
    case 'P':
      newPiece = new Pawn("white");
      break;
    case 'p':
      newPiece = new Pawn("black");
      break;
    case 'N':
      newPiece = new Knight("white");
      break;
    case 'n':
      newPiece = new Knight("black");
      break;
    case 'B':
      newPiece = new Bishop("white");
      break;
    case 'b':
      newPiece = new Bishop("black");
      break;
    case 'R':
      newPiece = new Rook("white");
      break;
    case 'r':
      newPiece = new Rook("black");
      break;
    case 'Q':
      newPiece = new Queen("white");
      break;
    case 'q':
      newPiece = new Queen("black");
      break;
    case 'K':
      newPiece = new King("white");
      break;
    case 'k':
      newPiece = new King("black");
      break;
  }
  return newPiece;
};

// Call this from subclass constructor
Piece.prototype.init = function(pieceChar){
  if (!Piece.validateChar(pieceChar)){
    alert('Invalid input to Piece.init:  ' + pieceChar);
    return;
  }
  this._pieceChar = pieceChar;

  this.captured = false;
  this.movedDouble = false;
  this.hasMoved = false;
};

Piece.prototype.pieceChar = function(){
  return this._pieceChar;
};

Piece.prototype.name = function(){
  var pieceType = this.pieceType();
  if (pieceType){
    return pieceType.name;
  }
  return null;
};

Piece.prototype.symbol = function(){
  var symbol = this._pieceChar.toUpperCase();
  if (symbol === 'P'){
    return '';
  }
  return symbol;
};

Piece.prototype.imageFileName = function(){
  return this.color() + "_" + this.name() + ".svg";
};

Piece.prototype.color = function(){
  var colourIsWhite = this._pieceChar.toLowerCase() !== this._pieceChar
  if (colourIsWhite){
    return "white";
  }else{
    return "black";
  }
};

Piece.prototype.material = function(){
  var pieceType = this.pieceType();
  if (pieceType){
    return pieceType.material;
  }
  return null;
};

Piece.prototype.getPosition = function getPosition() {
  for (var i = 0; i < game.board.grid.length; i++) {
    for (var j = 0; j < game.board.grid[i].length; j++) {
      if (game.board.grid[j][i].piece === this) {
        return new Position(j, i);
      }
    }
  }
  return new Position(this.x, this.y);
};

Piece.prototype.pieceType = function() {
  return Piece.piecetypeFromCharcode(this._pieceChar.toLowerCase());;
};

Piece.prototype.cloneSelf = function () {
  var selfClone = Piece.newInstance(this.pieceChar());
  selfClone.captured = this.captured;
  selfClone.hasMoved = this.hasMoved;
  selfClone.movedDouble = this.movedDouble;
  return selfClone;
};

// Make sure input string is in <white Piece> or <black Piece>
Piece.validateChar = function(pieceChar){
  var regex = /^[rnbqkpRNBQKP]$/; 
  if (typeof pieceChar !== 'string'){
    return false;
  }
  return regex.test(pieceChar);
};

// Search the PIECETYPE enumeration and return the object with corresponding charCode.
Piece.piecetypeFromCharcode = function(pieceChar){
  for (var p in PIECETYPE){
    var piece = PIECETYPE[p];
    if (piece.charCode === pieceChar.toLowerCase()){
      return piece;
    }
  }
  return null;
};

