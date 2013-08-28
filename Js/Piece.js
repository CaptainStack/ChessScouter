//Base class for the various chess pieces
// See http://www.pasz.com/articles/JSInheritance.html for inheritance approach used here.

"use strict";
// Enumeration of pieces independent of piece colour.
var PIECETYPES = {
	PAWN:  {value: 0, name: 'pawn', material: 1, charCode: 'p'},
	KNIGHT:  {value: 1, name: 'knight', material:  3, charCode: 'n'},
	BISHOP:  {value: 2, name: 'bishop', material: 3, charCode: 'b'},
	ROOK:  {value: 3, name: 'rook', material: 5, charCode: 'r'},
	QUEEN: {value: 4, name: 'queen', material: 9, charCode: 'q'},
	KING:  {value: 5, name: 'king', material: 100, charCode: 'k'}
};

function Piece(pieceChar){
	this.init(pieceChar);
};

Piece.prototype.init = function(pieceChar){
// <white Piece> ::= 'P' | 'N' | 'B' | 'R' | 'Q' | 'K'
// <black Piece> ::= 'p' | 'n' | 'b' | 'r' | 'q' | 'k'
	if (!Piece.validateChar(pieceChar)){
		alert('Invalid input to Piece.init:  ' + pieceChar);
		return;
	}
	
	this.pieceChar = pieceChar;
	
	
	// Populate instance variables to maintain compatibility with subclasses of Piece.  
	// TODO:  refactor into methods (calculated instance values)?   and/or get rid of them entirely.
	
	var colourIsWhite = pieceChar.toLowerCase() !== pieceChar
	if (colourIsWhite){
		this.color = "white";
	}else{
		this.color = "black";
	}
	
	this.captured = false;
	this.hasMoved = false;  
	this.image = this.imageFileName();	
	this.material = this.material();
	this.type = this.name();
	
	this.symbol = this.pieceChar.toUpperCase();  	
};

Piece.piecetypeFromCharcode = function(pieceChar){
	for (var p in PIECETYPES){
		var piece = PIECETYPES[p];
		if (piece.charCode === pieceChar.toLowerCase()){
			return piece;
		}
	}
	return null;
};

Piece.prototype.name = function(){
	var pieceType = Piece.piecetypeFromCharcode(this.pieceChar.toLowerCase());
	if (pieceType){
		return pieceType.name;
	}
	return null;
};

Piece.prototype.imageFileName = function(){
	return this.color + "_" + this.name() + ".svg";
};

Piece.prototype.material = function(){
	var pieceType = Piece.piecetypeFromCharcode(this.pieceChar.toLowerCase());
	if (pieceType){
		return pieceType.material;
	}
	return null;
};

Piece.validateChar = function(pieceChar){
	var regex = /^[rnbqkpRNBQKP]$/; 
	if (typeof pieceChar !== 'string'){
		return false;
	}
	return regex.test(pieceChar);
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

Piece.prototype.clone = function () {
    var selfClone = new Piece(this.pieceChar);
    selfClone.color = this.color;
    selfClone.captured = this.captured;
    selfClone.image = this.image;
    selfClone.hasMoved = this.hasMoved;
    selfClone.material = this.material;
    selfClone.type = this.type;
    selfClone.symbol = this.symbol;
    return selfClone;
};


