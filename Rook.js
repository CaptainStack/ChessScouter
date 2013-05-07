"use strict";
function Rook(color) {
    this.color = color;
    this.captured = false;
    this.image = color + "_rook.svg";
}
Rook.prototype.getColor = function getColor(){
    return this.color;
}
Rook.prototype.getImage = function getImage(){
    return this.image;
}
Rook.prototype.isCaptured = function isCaptured(){
    return this.captured;
}
Rook.prototype.setMoved = function setMoved(movedState){
    this.hasMoved = movedState;
}
Rook.prototype.getPotentialMoves = function getPotentialMoves(x, y){
	var potentialMoves = []
	var vectorNorth = false;
	var vectorSouth = false;
	var vectorEast = false;
	var vectorWest = false
	var addX = 0
	var addY = 0
	while(vectorNorth == false || vectorSouth == false || vectorEast == false || vectorWest == false) {
		if(vectorNorth == false) {
			addY--;
			if( myGame.gameBoard.isOnBoard(new Position(x + addX,y + addY))) {
				potentialMoves.push(new Position (x + addX, y + addY));
			} else {
				addY = 0;
				vectorNorth = true;
			}
		} else if (vectorSouth == false) {
			addY++;
			if( myGame.gameBoard.isOnBoard(new Position(x + addX,y + addY))) {
				potentialMoves.push(new Position (x + addX, y + addY));
			} else {
				addY = 0;
				vectorSouth = true;
			}
		} else if (vectorEast == false) {
			addX--;
			if( myGame.gameBoard.isOnBoard(new Position(x + addX,y + addY))) {
				potentialMoves.push(new Position (x + addX, y + addY));
			} else {
				addX = 0;
				vectorEast = true;
			}
		
		} else if (vectorWest == false) {
			addX++;
			if( myGame.gameBoard.isOnBoard(new Position(x + addX,y + addY))) {
				potentialMoves.push(new Position (x + addX, y + addY));
			} else {
				addX = 0;
				vectorWest = true;
			}
		
		}
		// if(vectorNorth == false && myGame.gameBoard.isOnBoard(addX + 1,y) ) {
			// addX++;
			// potentialMoves.push(new Position (addX, y));
		// } else {
			// addX = 0;
			// vectorNorth = true;
		// } 
	}
	
	return potentialMoves;
	
    // var potentialMoves = [
                            // new Position(x - 2, y + 1), 
                            // new Position(x - 2, y - 1), 
                            // new Position(x + 1, y - 2), 
                            // new Position(x - 1, y - 2), 
                            // new Position(x + 2, y + 1), 
                            // new Position(x + 2, y - 1), 
                            // new Position(x - 1, y + 2), 
                            // new Position(x + 1, y + 2)
                        // ];
    for(var i = potentialMoves.length; i > potentialMoves.length; i--){
        if(potentialMoves[i].x < 0 || potentialMoves[i].x > 7 || potentialMoves[i].y < 0 || potentialMoves[i].y > 7){
            potentialMoves.splice(i, 1);
        }
    }
    return potentialMoves;
}
Rook.prototype.getLegalMoves = function getLegalMoves(currentPosition){
    return this.getPotentialMoves(currentPosition.x, currentPosition.y);
};