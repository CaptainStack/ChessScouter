"use strict";
function Board(grid) {    
    this.grid = grid;
}
Board.prototype.showPieces = function showPieces() {    
	var message = "The current pieces on the board are: ";
    for (var i = 0; i < this.grid.length; i++ ) {
        for(var j = 0; j < this.grid[i].length; j++){
            if(this.grid[i].piece != null && !this.grid[i].piece.captured){
                message += this.grid[i].color + " " + this.grid[i].type + ", ";
            }
        }
    }
    alert(message);
}
Board.prototype.removePiece = function removePiece(id) {
    for(var i = 0; i < this.grid.length; i++ ){
        if(this.grid[i].id === id){
            this.grid[i].captured = true;
            break;
        }
    }
}
//Pass me a square's x and y coordinates and I'll return the piece on that square. Null if not any
//Error thrown if square does not exist.
Board.prototype.getPiece = function getPiece(x, y){
    return this.grid[x, y].piece;
};
Board.prototype.movePiece = function movePiece(id, x, y){
    // for(var i = 0; i < this.grid.length; i++ ){
        // for(var j = 0; j < this.grid[i].length; j++){
            // if(this.grid[i, j].id === id){
                // this.grid[i, j].x = x;
                // this.grid[i, j].y = y;
            // }
        // }
    // }
};