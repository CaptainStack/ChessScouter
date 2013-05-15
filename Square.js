//This data structure represents one square on a chessboard and
//holds information such as its position and what piece (if any) occupies it.
"use strict";
function Square(x, y, piece) {
	this.x = x;
	this.y = y
	this.piece = piece;
    this.flair = false;
}
Square.prototype.getContents = function getContents(){
	if(this.piece != null){
		return this.piece;
	}else{
		return null;
	}
};