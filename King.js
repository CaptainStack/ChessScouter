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
King.prototype.getPotentialMoves = function getPotentialMoves(x, y){

}
King.prototype.getLegalMoves = function getLegalMoves(currentPosition){
    var x = currentPosition.x;
    var y = currentPosition.y;
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
    for(var i = potentialMoves.length - 1; i >= 0; i--){
        if(potentialMoves[i].x < 0 || 
            potentialMoves[i].x > 7 || 
            potentialMoves[i].y < 0 || 
            potentialMoves[i].y > 7 || 
            myGame.gameBoard.occupiedBy(new Position(potentialMoves[i].x, potentialMoves[i].y)) == myGame.whoseTurn())
        {
            potentialMoves.splice(i, 1);
        }
    }
    return potentialMoves;
};