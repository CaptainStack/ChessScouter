function Board(pieces) {
    "use strict";
    this.pieces = pieces;
}
Board.prototype.showPieces = function showPieces() {
    "use strict";
    /*global alert */
	var message = "The current pieces on the board are: ";
    for (var i = 0; i < this.pieces.length; i++ ) {
        if(!this.pieces[i].captured){
            message += this.pieces[i].color + " " + this.pieces[i].type + ", ";
        }
    }
    alert(message);
}
Board.prototype.testFunction = function testFunction(message) {
    alert(message);
}
Board.prototype.removePiece = function removePiece(id) {
    for(var i = 0; i < this.pieces.length; i++ ){
        if(this.pieces[i].id === id){
            this.pieces[i].captured = true;
            break;
        }
    }
}
//Pass me a square's x and y coordinates and I'll return the piece on that square. Null if not any
//Error thrown if square does not exist.
Board.prototype.getPiece = function getPiece(x, y){
    for (var i = 0; i < this.pieces.length; i++ ) {
        if(this.pieces[i].x == x && this.pieces[i].y == y){
            return this.pieces[i];
        }
    }
    return null;
};
// var temp = [new Piece("white", "pawn", 0, 1, false, false), new Piece("black", "queen", 0, 1, false, false)];
// var gameBoard  =  new Board(temp);