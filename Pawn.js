"use strict";
function Pawn(color) {
    this.color = color;
    this.captured = false;
    this.hasMoved = false;
    this.image = color + "_pawn.svg";
}
Pawn.prototype.getColor = function getColor(){
    return this.color;
}
Pawn.prototype.getImage = function getImage(){
    return this.image;
}
Pawn.prototype.isCaptured = function isCaptured(){
    return this.captured;
}
Pawn.prototype.setMoved = function setMoved(movedState){
    this.hasMoved = movedState;
}
Pawn.prototype.getPotentialMoves = function getPotentialMoves(position){
    var x = position.x;
    var y = position.y;
    if(this.color == "white"){
        var potentialMoves = [new Position(x, y - 1)];
        if(!this.hasMoved){
            potentialMoves.push(new Position(x, y - 2));
        }
    }else{
        var potentialMoves = [new Position(x, y + 1)];
        if(!this.hasMoved){
            potentialMoves.push(new Position(x, y + 2));
        }
    }
    return potentialMoves;
}
Pawn.prototype.getLegalMoves = function getLegalMoves(currentPosition){
    var potentialMoves = [];
    var x = currentPosition.x;
    var y = currentPosition.y;
    if(this.color == "white"){
        if(myGame.gameBoard.occupiedBy(new Position(x, y - 1)) == null){
            potentialMoves.push(new Position(x, y - 1));
            if(!this.hasMoved && myGame.gameBoard.occupiedBy(new Position(x, y - 2)) == null){
                potentialMoves.push(new Position(x, y - 2));
            }
        }
        if(myGame.gameBoard.occupiedBy(new Position(x - 1, y - 1)) == "black"){
            potentialMoves.push(new Position(x - 1, y - 1));
        }
        if(myGame.gameBoard.occupiedBy(new Position(x + 1, y - 1)) == "black"){
            potentialMoves.push(new Position(x + 1, y - 1));
        }
    }else{
        if(myGame.gameBoard.occupiedBy(new Position(x, y + 1)) == null){
            potentialMoves.push(new Position(x, y + 1));
            if(!this.hasMoved && myGame.gameBoard.occupiedBy(new Position(x, y + 2)) == null){
                potentialMoves.push(new Position(x, y + 2));
            }
        }
        if(myGame.gameBoard.occupiedBy(new Position(x - 1, y + 1)) == "white"){
            potentialMoves.push(new Position(x - 1, y + 1));
        }
        if(myGame.gameBoard.occupiedBy(new Position(x + 1, y + 1)) == "white"){
            potentialMoves.push(new Position(x + 1, y + 1));
        }
    }
    return potentialMoves;
};