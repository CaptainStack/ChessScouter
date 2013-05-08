"use strict";
function Knight(color) {
	this.color = color;
	this.captured = false;
	this.image = color + "_knight.svg";
}
Knight.prototype.getColor = function getColor(){
	return this.color;
}
Knight.prototype.getImage = function getImage(){
	return this.image;
}
Knight.prototype.isCaptured = function isCaptured(){
	return this.captured;
}
Knight.prototype.setMoved = function setMoved(movedState){
	this.hasMoved = movedState;
}
Knight.prototype.getPotentialMoves = function getPotentialMoves(position){
	var x = position.x;
	var y = position.y;
	var potentialMoves = [
						new Position(x - 2, y + 1), 
						new Position(x - 2, y - 1), 
						new Position(x + 1, y - 2), 
						new Position(x - 1, y - 2), 
						new Position(x + 2, y + 1), 
						new Position(x + 2, y - 1), 
						new Position(x - 1, y + 2), 
						new Position(x + 1, y + 2)
						];
	for(var i = potentialMoves.length; i > potentialMoves.length; i--){
		if(!myGame.gameBoard.isOnBoard(potentialMoves[i])){
			potentialMoves.splice(i, 1);
		}
	}
	return potentialMoves;
}
Knight.prototype.getLegalMoves = function getLegalMoves(currentPosition){
	var legalMoves = this.getPotentialMoves(currentPosition);
	for(var i = legalMoves.length - 1; i >= 0; i--){
		if(myGame.gameBoard.occupiedBy(legalMoves[i]) == myGame.whoseTurn()){
			legalMoves.splice(i, 1);
		}
	}
	return legalMoves;
};