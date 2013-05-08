//This object initializes a board and pieces and manages the state of the game.
"use strict";
function Game() {    
	this.turn = 1;

	var grid = [];
	for(var i = 0; i < 8; i++){
		var row = [];
		for(var j = 0; j < 8; j++){        
			row[j] = new Square(i, j, null);
		}
		grid[i] = row;
	}
	grid[0][0] = new Square(0, 0, new Rook("black"));
	grid[1][0] = new Square(1, 0, new Knight("black"));
	grid[2][0] = new Square(2, 0, new Bishop("black"));
	grid[3][0] = new Square(3, 0, new Queen("black"));
	grid[4][0] = new Square(4, 0, new King("black"));
	grid[5][0] = new Square(5, 0, new Bishop("black"));
	grid[6][0] = new Square(6, 0, new Knight("black"));
	grid[7][0] = new Square(7, 0, new Rook("black"));

	grid[0][1] = new Square(0, 1, new Pawn("black"));
	grid[1][1] = new Square(1, 1, new Pawn("black"));
	grid[2][1] = new Square(2, 1, new Pawn("black"));
	grid[3][1] = new Square(3, 1, new Pawn("black"));
	grid[4][1] = new Square(4, 1, new Pawn("black"));
	grid[5][1] = new Square(5, 1, new Pawn("black"));
	grid[6][1] = new Square(6, 1, new Pawn("black"));
	grid[7][1] = new Square(7, 1, new Pawn("black"));

	grid[0][6] = new Square(0, 6, new Pawn("white"));
	grid[1][6] = new Square(1, 6, new Pawn("white"));
	grid[2][6] = new Square(2, 6, new Pawn("white"));
	grid[3][6] = new Square(3, 6, new Pawn("white"));
	grid[4][6] = new Square(4, 6, new Pawn("white"));
	grid[5][6] = new Square(5, 6, new Pawn("white"));
	grid[6][6] = new Square(6, 6, new Pawn("white"));
	grid[7][6] = new Square(7, 6, new Pawn("white"));

	grid[0][7] = new Square(0, 7, new Rook("white"));
	grid[1][7] = new Square(1, 7, new Knight("white"));
	grid[2][7] = new Square(2, 7, new Bishop("white"));
	grid[3][7] = new Square(3, 7, new Queen("white"));
	grid[4][7] = new Square(4, 7, new King("white"));
	grid[5][7] = new Square(5, 7, new Bishop("white"));
	grid[6][7] = new Square(6, 7, new Knight("white"));
	grid[7][7] = new Square(7, 7, new Rook("white"));

	for(var i = 2; i < 6; i++){
		for(var j = 0; j < 8; j++){
			grid[j][i] = new Square(j, i, null);
		}
	}

	this.gameBoard = new Board(grid);
}
Game.prototype.whoseTurn = function whoseTurn(){
	if(this.turn % 2 === 0){
		return "black";
	}else{
		return "white";
	}
}
Game.prototype.makeMove = function makeMove(){
	if(whoseTurn() == "white"){
		
	}else{
		
	}
	this.turn++;
}
Game.prototype.getPieces = function getPieces(player){
	var pieceList = [];
	try{
		if(player == "white" || player == "black" || player == "all"){
			for(var i = 0; i < this.gameBoard.grid.length; i++){
				for(var j = 0; j < this.gameBoard.grid[i].length; j++){
					var square = this.gameBoard.grid[i][j];
					if(square.getContents() != null){
						if(square.getContents().getColor() == "white" && player == "white"){
							pieceList.push(this.gameBoard.grid[i][j].getContents());
						}else if(square.getContents().getColor() == "black" && player == "black"){
							pieceList.push(this.gameBoard.grid[i][j].getContents());
						}else if(player == "all"){
							pieceList.push(this.gameBoard.grid[i][j].getContents());
						}
					}
				}
			}
			return pieceList;
		}else{
			throw "bad input";
		}
	}catch(err){
		alert(err + "player must be \"black\" or \"white\" or \"all\"");
	}
}
Game.prototype.getAllLegalAttacks = function getAllLegalAttacks(player){
	try{
		if(player == "white"){
			
		}else if (player == "black"){
		}else{
			throw "bad input";
		}
	}catch(err){
		alert("player must be \"black\" or \"white\"");
	}
};