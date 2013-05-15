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
Game.prototype.otherTurn = function otherTurn(){
	if(this.turn % 2 === 0){
		return "white";
	}else{
		return "black";
	}
}
Game.prototype.otherPlayer = function otherPlayer(player){
    if(player === "white"){
        return "black";
    }else{
        return "white"
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
					if(square.getContents() !== null){
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
			throw new Error("bad input");
		}
	}catch(err){
		alert(err + "player must be \"black\" or \"white\" or \"all\"");
	}
}
//All pieces have a getAttacks method that is redundant with getLegalMoves. This is because Pawn moves
//differently from how it attacks. For now it's easier but we should get inheritance working so it's less
//stupid.
Game.prototype.getAllLegalAttacks = function getAllLegalAttacks(player){
	try{
		var attacks = [];
		if(player == "white" || player == "black"){
			var pieces = this.getPieces(player);
			for(var i = 0; i < pieces.length; i++){
				var pieceAttack = pieces[i].getAttacks(this.gameBoard.getPosition(pieces[i]));
				for(var j = 0; j < pieceAttack.length; j++){
					attacks.push(pieceAttack[j]);
				}
			}
			return attacks;
		}else{
			throw "bad input";
		}
	}catch(err){
		alert(err + " player must be \"black\" or \"white\"");
	}
}


//Add try catch behavior
Game.prototype.isInCheck = function isInCheck(player) {
	var pieces = myGame.getPieces(player);
	var king = null;
	var counter = 0;
	var kingFound = false;

	// Loop over the board until the king is found
	while (!kingFound) {
		if (pieces[counter].getImage() == player + "_king.svg") {
			king = pieces[counter];
			kingFound = true;
		}
		counter++;
	}

	var enemyAttacks;
	if(player == "white"){
		enemyAttacks = this.getAllLegalAttacks("black");
	}else{
		enemyAttacks = this.getAllLegalAttacks("white");
	}
	for(var i = 0; i < enemyAttacks.length; i++){
		if(enemyAttacks[i].x == myGame.gameBoard.getPosition(king).x && enemyAttacks[i].y == myGame.gameBoard.getPosition(king).y){
			// alert("You're in check!");
			return true;
			break;
		}
	}
}
Game.prototype.isInCheckmate = function isInCheckmate(player){
    var pieces = this.getPieces(player);
    var legalMoves = [];
    for(var i = 0; i < pieces.length; i++){
        var pieceMoves = this.pieceLegalMoves(myGame.gameBoard.getPosition(pieces[i]));
        for(var j = 0; j < pieceMoves.length; j++){
            legalMoves.push(pieceMoves[i]);
        }
    }
    if(legalMoves.length === 0 && this.isInCheck(player)){
        return true;
    }else{
        return false;
    }
}
Game.prototype.isInStalemate = function isInStalemate(player){
    var pieces = this.getPieces(player);
    var legalMoves = [];
    for(var i = 0; i < pieces.length; i++){
        var pieceMoves = this.pieceLegalMoves(myGame.gameBoard.getPosition(pieces[i]));
        for(var j = 0; j < pieceMoves.length; j++){
            legalMoves.push(pieceMoves[i]);
        }
    }
    if(legalMoves.length === 0 && !this.isInCheck(player)){
        return true;
    }else{
        return false;
    }
}
Game.prototype.clone = function clone(){
    var gameClone = new Game();
    for(var i = 0; i < this.gameBoard.grid.length; i++){
        for(var j = 0; j < this.gameBoard.grid[i].length; j++){
            if(myGame.gameBoard.grid[i][j].getContents() !== null){
                var pieceClone = jQuery.extend(true, {}, myGame.gameBoard.grid[i][j].getContents());
                gameClone.gameBoard.grid[i][j].piece = pieceClone;
            }else{
                gameClone.gameBoard.grid[i][j].piece = null;
            }
        }
    }
    return gameClone;
}
Game.prototype.pieceLegalMoves = function pieceLegalMoves(position){
    var piece = myGame.gameBoard.grid[position.x][position.y].piece;
    var legalMoves = piece.getLegalMoves(position);
    for(var i = legalMoves.length - 1; i >= 0; i--){
        var foreignContents = myGame.gameBoard.grid[legalMoves[i].x][legalMoves[i].y].getContents();
        myGame.gameBoard.grid[position.x][position.y].piece = null;
        myGame.gameBoard.grid[legalMoves[i].x][legalMoves[i].y].piece = piece;
        if(this.isInCheck(myGame.whoseTurn())){
            myGame.gameBoard.grid[position.x][position.y].piece = piece;
            myGame.gameBoard.grid[legalMoves[i].x][legalMoves[i].y].piece = foreignContents;
            legalMoves.splice(i, 1);
        }else{
            myGame.gameBoard.grid[position.x][position.y].piece = piece;
            myGame.gameBoard.grid[legalMoves[i].x][legalMoves[i].y].piece = foreignContents;
        }
    }
    return legalMoves;
}
Game.prototype.attackedPieces = function attackedPieces(player){
    var initialAttacks = this.getAllLegalAttacks(this.otherPlayer(player));
    for(var i = initialAttacks.length - 1; i >= 0; i--){
        if(this.gameBoard.grid[initialAttacks[i].x][initialAttacks[i].y].getContents() == null ||
        this.gameBoard.grid[initialAttacks[i].x][initialAttacks[i].y].getContents().color == this.otherPlayer(player)){
            initialAttacks.splice(i, 1);
        }
    }
    return initialAttacks;
};