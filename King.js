"use strict";
function King(color) {
    this.color = color;
    this.captured = false;
    this.image = color + "_king.svg";
}
King.prototype.getColor = function getColor(){
    return this.color;
}
King.prototype.getImage = function getImage(){
    return this.image;
}
King.prototype.isCaptured = function isCaptured(){
    return this.captured;
}
King.prototype.setMoved = function setMoved(movedState){
    this.hasMoved = movedState;
}
King.prototype.getPotentialMoves = function getPotentialMoves(startPosition){
	var x = startPosition.x;
	var y = startPosition.y;
	var potentialMoves = [
						new Position(x, y + 1), 
						new Position(x, y - 1),
						new Position(x + 1, y),
						new Position(x - 1, y),
						new Position(x + 1, y + 1),
						new Position(x + 1, y - 1),
						new Position(x - 1, y + 1),
						new Position(x - 1, y - 1)
						];
	for(var i = potentialMoves.length; i > potentialMoves.length; i--){
		if(!myGame.gameBoard.isOnBoard(potentialMoves[i])){
			potentialMoves.splice(i, 1);
		}
	}
}
King.prototype.getLegalMoves = function getLegalMoves(currentPosition){
    var legalMoves = this.getPotentialMoves(currentPosition);
    for(var i = legalMoves.length - 1; i >= 0; i--){
        if(myGame.gameBoard.occupiedBy(new Position(potentialMoves[i].x, potentialMoves[i].y)) == myGame.whoseTurn()){
            potentialMoves.splice(i, 1);
        }
    }
    return potentialMoves;
};