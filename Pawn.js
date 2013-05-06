"use strict";
function Pawn(color) {
    this.color = color;
    this.captured = false;
    this.hasMoved = false;
    this.image = color + "_Pawn.svg";
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
Pawn.prototype.getPotentialMoves = function getPotentialMoves(x, y){
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
Pawn.prototype.getLegalMoves = function getLegalMoves(oldX, newX, oldY, newY){
    if(this.color == "white"){
        
    }else{
        
    }
};