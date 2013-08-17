//This object specifies basic information about pieces.
"use strict";

function Piece(color, type, captured, hasMoved) {
    this.color = color;
    this.type = type;
    this.captured = captured;
    this.hasMoved = hasMoved;
    this.image = color + "_" + type + ".svg";
}
Piece.prototype.setMoved = function setMoved(movedState) {
    this.hasMoved = movedState;
}

Piece.prototype.getLegalMoves = function getLegalMoves(position) {
    var potentialMoves = [];
    for (var i = 0; i < 8; i++) {
        for (var j = 0; j < 8; j++) {
            potentialMoves.push(new Position(i, j));
        }
    }
    return potentialMoves;
};