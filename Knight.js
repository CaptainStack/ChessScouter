"use strict";
function Knight(color) {
	this.color = color;
	this.captured = false;
	this.image = color + "_knight.svg";
    this.material = 3;
    this.type = "knight"
    this.symbol = "N";
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
	for(var i = potentialMoves.length - 1; i >= 0; i--){
		if(!myGame.gameBoard.isOnBoard(potentialMoves[i])){
			potentialMoves.splice(i, 1);
		}
	}
	return potentialMoves;
}
Knight.prototype.getLegalMoves = function getLegalMoves(currentPosition){
	var legalMoves = this.getPotentialMoves(currentPosition);
	for(var i = legalMoves.length - 1; i >= 0; i--){
		if(myGame.gameBoard.occupiedBy(legalMoves[i]) == this.color){
			legalMoves.splice(i, 1);
		}
	}
	return legalMoves;
}
Knight.prototype.getAttacks = function getAttacks(currentPosition){
	return this.getPotentialMoves(currentPosition);
};