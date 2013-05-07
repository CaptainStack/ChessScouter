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
    var northMoves = [];
    var southMoves = [];
    var eastMoves = [];
    var westMoves = [];
	while(vectorNorth == false || vectorSouth == false || vectorEast == false || vectorWest == false){
		if(vectorNorth == false) {
			addY--;
			if( myGame.gameBoard.isOnBoard(new Position(x + addX,y + addY))){
				northMoves.push(new Position (x + addX, y + addY));
			}else {
				addY = 0;
				vectorNorth = true;
			}
		}else if (vectorSouth == false) {
			addY++;
			if( myGame.gameBoard.isOnBoard(new Position(x + addX,y + addY))){
				southMoves.push(new Position (x + addX, y + addY));
			}else {
				addY = 0;
				vectorSouth = true;
			}
		}else if (vectorEast == false){
            addX--;
			if( myGame.gameBoard.isOnBoard(new Position(x + addX,y + addY))){
				eastMoves.push(new Position (x + addX, y + addY));
			}else {
				addX = 0;
				vectorEast = true;
			}
		}else if (vectorWest == false){
            addX++;
			if( myGame.gameBoard.isOnBoard(new Position(x + addX,y + addY))){
				westMoves.push(new Position (x + addX, y + addY));
			}else {
				addX = 0;
				vectorWest = true;
			}
		}
	}
    potentialMoves.push(northMoves);
    potentialMoves.push(southMoves);
    potentialMoves.push(eastMoves);
    potentialMoves.push(westMoves);
	return potentialMoves;
}
Rook.prototype.getLegalMoves = function getLegalMoves(currentPosition){
    var legalMoves = [];
    var allMoves = this.getPotentialMoves(currentPosition.x, currentPosition.y)
    for(var i = 0; i < allMoves.length; i++){
        var currVectorMoves = allMoves[i];
        for(var j = 0; j < currVectorMoves.length; j++){
            if(myGame.gameBoard.occupiedBy(currVectorMoves[j]) == null){
                legalMoves.push(currVectorMoves[j]);
            }else if(myGame.gameBoard.occupiedBy(currVectorMoves[j]) != myGame.whoseTurn()){
                legalMoves.push(currVectorMoves[j]);
                break;
            }else{
                break;
            }
        }
    }
    return legalMoves;
};