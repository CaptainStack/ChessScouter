//This object acts as a data structure that is made up of square that store all the pieces. 
//It has functions that can return information about the board.
"use strict";
function Board(grid) {    
    this.grid = grid;
}
Board.prototype.showPieces = function showPieces() {    
	var message = "The current pieces on the board are: ";
    for (var i = 0; i < this.grid.length; i++ ) {
        for(var j = 0; j < this.grid[i].length; j++){
            if(this.grid[j][i].piece !== null && !this.grid[j][i].piece.captured){
                message += this.grid[j][i].piece.color + " " + this.grid[j][i].piece.type + ", ";
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
Board.prototype.getPiece = function getPiece(x, y){
    if(this.isOnBoard(new Position(x, y))){
        return this.grid[x][y].getContents();
    }else{
        return null;
    }
}
//TODO change parameters to Positions instead of coordinates.
//TODO If destination is enemy piece, don't null out, but set to captured and move out of the way.
Board.prototype.movePiece = function movePiece(oldPosition, newPosition){
	var oldX = oldPosition.x;
	var oldY = oldPosition.y;
	var newX = newPosition.x;
	var newY = newPosition.y;
    var piece = this.grid[oldX][oldY].piece;
    var legalMoves = myGame.pieceLegalMoves(oldPosition);
    var moved = false;
    for(var i = 0; i < legalMoves.length; i++){
        if(legalMoves[i].x == newX && legalMoves[i].y == newY){
            this.grid[oldX][oldY].piece = null;
            this.grid[newX][newY].piece = piece;
            this.grid[newX][newY].piece.setMoved(true);
            moved = true;
            myGame.turn++;
            layoutBoard();
            if(myGame.isInCheckmate(myGame.whoseTurn())){
                alert("checkmate!");
            }else if(myGame.isInCheck(myGame.whoseTurn())){
                alert("check!");
            }
        }
    }
    if(!moved){
        alert("that's not a legal move!");
    }
}
Board.prototype.occupiedBy = function occupiedBy(position){
    var x = position.x;
    var y = position.y;
    if(this.getPiece(x, y) == null){
        return null;
    }else{
        return this.getPiece(x, y).getColor();
    }
}

// Returns whether the given position is on the board
Board.prototype.isOnBoard = function isOnBoard(position){
	return !(position.x < 0 || position.x > 7 || position.y < 0 || position.y > 7);
}
Board.prototype.getPosition = function getPosition(piece){
    for (var i = 0; i < this.grid.length; i++ ) {
        for(var j = 0; j < this.grid[i].length; j++){
            if(this.grid[j][i].piece === piece){
                return new Position(j, i);
            }
        }
    }
	
	return new Position(piece.x, piece.y);
}
Board.prototype.getKing = function getKing(player){
	if(player == "white"){
	}else{
	}
}
Board.prototype.testMove = function testMove(testBoard, oldPosition, newPosition){
	var oldX = oldPosition.x;
	var oldY = oldPosition.y;
	var newX = newPosition.x;
	var newY = newPosition.y;
    var piece = testBoard.gameBoard.grid[oldX][oldY].piece;

	testBoard.gameBoard.grid[oldX][oldY].piece = null;
	testBoard.gameBoard.grid[newX][newY].piece = piece;
	// myGame.isInCheck(myGame.whoseTurn());
};
