"use strict";
function Piece(color, type, captured, hasMoved) {    
    this.color = color;
    this.type = type;
    this.captured = captured;
    this.hasMoved = hasMoved;
    this.image = color + "_" + type + ".svg";
}
Piece.prototype.getImage = function getImage(){
    return this.image;
}
Piece.prototype.isCaptured = function isCaptured(){
    return this.captured;
};