"use strict";
function Piece(id, color, type, x, y, captured, hasMoved) {    
    this.color = color;
    this.type = type;
    this.x = x;
    this.y = y;
    this.captured = captured;
    this.hasMoved = hasMoved;
    this.id = id;
    this.image = color + "_" + type + ".svg";
}
Piece.prototype.movePiece = function movePiece(newX, newY) {
    this.x = newX;
    this.y = newY;
    alert("you moved me! to " + this.x + " " + this.y);
}
Piece.prototype.getSymbol = function getSymbol(){
    if(this.type.charAt(0) != "k"){
        return this.type.charAt(0).toUpperCase();
    }else{
        return this.type.substring(0, 2).toUpperCase();
    }
}
Piece.prototype.getImage = function getImage(){
    if(this.type.charAt(0) != "k"){
        return this.image;
    }else{
        return this.image;
    }
}
Piece.prototype.isCaptured = function isCaptured(){
    return this.captured;
};