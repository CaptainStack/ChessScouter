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
        if(potentialMoves[i].x < 0 || potentialMoves[i].x > 7 || potentialMoves[i].y < 0 || potentialMoves[i].y > 7){
            potentialMoves.splice(i, 1);
        }
    }
    return potentialMoves;
}
Knight.prototype.getLegalMoves = function getLegalMoves(currentPosition){
    var x = currentPosition.x;
    var y = currentPosition.y;
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