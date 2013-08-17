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
	if(this.turn % 2 === 0) {
		return "black";
	}else{
		return "white";
	}
}
Game.prototype.otherTurn = function otherTurn(){
	if(this.turn % 2 === 0) {
		return "white";
	}else{
		return "black";
	}
}
Game.prototype.otherPlayer = function otherPlayer(player) {
    if(player === "white"){
        return "black";
    }else{
        return "white"
    }
}

Game.prototype.getPieces = function getPieces(player) {
	var pieceList = [];
	try{
		if(player == "white" || player == "black" || player == "all"){
			for(var i = 0; i < this.gameBoard.grid.length; i++){
				for(var j = 0; j < this.gameBoard.grid[i].length; j++){
					var square = this.gameBoard.grid[i][j];
					if(square.piece !== null) {
						if(square.piece.color == "white" && player == "white"){
							pieceList.push(this.gameBoard.grid[i][j].piece);
						}else if(square.piece.color == "black" && player == "black"){
							pieceList.push(this.gameBoard.grid[i][j].piece);
						}else if(player == "all"){
							pieceList.push(this.gameBoard.grid[i][j].piece);
						}
					}
				}
			}
			return pieceList;
		}else{
			throw new Error("bad input");
		}
	}catch(err) {
		alert(err + "player must be \"black\" or \"white\" or \"all\"");
	}
}
//All pieces have a getAttacks method that is redundant with getLegalMoves. This is because Pawn moves
//differently from how it attacks. For now it's easier but we should get inheritance working so it's less
//stupid.
Game.prototype.getAllLegalAttacks = function getAllLegalAttacks(player) {
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
	}catch(err) {
		alert(err + " player must be \"black\" or \"white\"");
	}
}


//Add try catch behavior
Game.prototype.isInCheck = function isInCheck(player) {
	var pieces = myGame.getPieces(player);
    var king = this.findKing(player);
	var enemyAttacks;
	if(player == "white"){
		enemyAttacks = this.getAllLegalAttacks("black");
	}else{
		enemyAttacks = this.getAllLegalAttacks("white");
	}
	for(var i = 0; i < enemyAttacks.length; i++){
		if(enemyAttacks[i].x == myGame.gameBoard.getPosition(king).x && enemyAttacks[i].y == myGame.gameBoard.getPosition(king).y) {
			return true;
			break;
		}
	}
}
Game.prototype.findKing = function findKing(player) {
    var pieces = this.getPieces(player);
	var king = null;
	var kingFound = false;
    var counter = 0;
	// Loop over the board until the king is found
	while (!kingFound) {
		if (pieces[counter].image == player + "_king.svg") {
			king = pieces[counter];
			kingFound = true;
		}
		counter++;
	}
    if(kingFound) {
        return king;
    }else{
        return null;
    }
}
Game.prototype.isInCheckmate = function isInCheckmate(player) {
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
Game.prototype.isInStalemate = function isInStalemate(player) {
    var pieces = this.getPieces(player);
    var legalMoves = [];
    for(var i = 0; i < pieces.length; i++){
        var pieceMoves = this.pieceLegalMoves(myGame.gameBoard.getPosition(pieces[i]));
        for(var j = 0; j < pieceMoves.length; j++){
            legalMoves.push(pieceMoves[i]);
        }
    }
    if(
        (legalMoves.length === 0 && !this.isInCheck(player)) || 
        ((this.getPieces("white").length === 1 && this.findKing(player) !== null) && (this.getPieces("black").length === 1 && this.findKing(player))) ||
        ((this.getPieces("white").length === 1 && this.getPieces("white")[0] instanceof King) && (this.getPieces("black").length === 1 && this.getPieces("black")[0] instanceof King))
    ) {
        return true;
    }else{
        return false;
    }
}
Game.prototype.insufficientMatingMaterial = function insufficientMatingMaterial(){
    var sufficient = true;
    var whitePieces = this.getPieces("white");
    var blackPieces = this.getPieces("black");
    var allPieces = this.getPieces("all");
    
    if(allPieces.length > 4) {
        return false;
    }else{
        var whiteKnights = 0;
        var whiteBishops = 0;
        var blackKnights = 0;
        var blackBishops = 0;
        var whiteBishopSquareColor = undefined;
        var blackBishopSquareColor = undefined;
        for(var i = 0; i < allPieces.length; i++){
            if(allPieces[i] instanceof Rook || allPieces[i] instanceof Queen || allPieces[i] instanceof Pawn) {
                return false;
            }else{
                var color = allPieces[i].color;
                var type = allPieces[i].type;
                
                switch(type)
                {
                case "bishop":
                    if(color === "black"){
                        blackBishops++;
                        blackBishopSquareColor = this.gameBoard.getPosition(allPieces[i]).x % 2 === this.gameBoard.getPosition(allPieces[i]).y % 2;
                        break;
                    }else{
                        whiteBishops++;
                        whiteBishopSquareColor = this.gameBoard.getPosition(allPieces[i]).x % 2 === this.gameBoard.getPosition(allPieces[i]).y % 2;
                        break;
                    }
                case "knight":
                    if(color === "black"){
                        blackKnights++;
                    }else{
                        whiteKnights++;
                    }
                    break;
                case "king":
                    break;
                }
            }
        }
        if(
            (whiteKnights === 0 && whiteBishops === 0 && blackKnights === 0 && blackBishops === 0) ||
            (whiteKnights === 1 && whiteBishops === 0 && blackKnights === 0 && blackBishops === 0) ||
            (whiteKnights === 0 && whiteBishops === 1 && blackKnights === 0 && blackBishops === 0) ||
            (whiteKnights === 0 && whiteBishops === 0 && blackKnights === 1 && blackBishops === 0) ||
            (whiteKnights === 0 && whiteBishops === 0 && blackKnights === 0 && blackBishops === 1) ||
            ((whiteKnights === 0 && whiteBishops === 1 && blackKnights === 0 && blackBishops === 1) && (blackBishopSquareColor === whiteBishopSquareColor))
        ) {
            return true;
        }
        else{
            return false;
        }
    }    
}

Game.prototype.pieceLegalMoves = function pieceLegalMoves(position) {
    var piece = myGame.gameBoard.grid[position.x][position.y].piece;
    var legalMoves = piece.getLegalMoves(position);
    for(var i = legalMoves.length - 1; i >= 0; i--){
        var foreignContents = myGame.gameBoard.grid[legalMoves[i].x][legalMoves[i].y].piece;
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
Game.prototype.attackedPieces = function attackedPieces(player) {
    var initialAttacks = this.getAllLegalAttacks(this.otherPlayer(player));
    for(var i = initialAttacks.length - 1; i >= 0; i--){
        if(this.gameBoard.grid[initialAttacks[i].x][initialAttacks[i].y].piece == null ||
        this.gameBoard.grid[initialAttacks[i].x][initialAttacks[i].y].piece.color == this.otherPlayer(player)) {
            initialAttacks.splice(i, 1);
        }
    }
    return initialAttacks;
}
Game.prototype.getWhiteForks = function getWhiteForks(){
    var forks = [];
    var pieces = this.getPieces("white");
    for(var i = 0; i < pieces.length; i++){
        var pieceMoves = pieces[i].getLegalMoves(this.gameBoard.getPosition(pieces[i]));
        for(var j = 0; j < pieceMoves.length; j++){
            var initialAttacks = this.attackedPieces("black");
            //Make the move but save information so move can be undone
            
            var piece = pieces[i];
            var oldPosition = this.gameBoard.getPosition(piece);
            var foreignContents = this.gameBoard.grid[pieceMoves[j].x][pieceMoves[j].y].piece;
            this.gameBoard.grid[pieceMoves[j].x][pieceMoves[j].y].piece = piece;
            this.gameBoard.grid[oldPosition.x][oldPosition.y].piece = null;
            
            var afterAttacks = this.attackedPieces("black");
            for (var k = afterAttacks.length - 1; k >= 0; k--) {
                for (var l = initialAttacks.length - 1; l >= 0; l--) {
                    if ((afterAttacks[k].x == initialAttacks[l].x) && (afterAttacks[k].y == initialAttacks[l].y)) {
                        initialAttacks.splice(l, 1);
                        afterAttacks.splice(k, 1);
                        break;
                    }
                }
            }
            //Check if move results in more than 2 pieces under attack
            if(afterAttacks.length >= 2) {
                forks.push(pieceMoves[j]);
            }
            this.gameBoard.grid[oldPosition.x][oldPosition.y].piece = piece;
            this.gameBoard.grid[pieceMoves[j].x][pieceMoves[j].y].piece = foreignContents;
        }
    }
    return forks;
};