//This object acts as a data structure that is made up of square that store all the pieces. 
//It has functions that can return information about the board.
"use strict";

function Board() {
    this.promoPosition = undefined;
    this.lastPiece = undefined;
    
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
    
    this.grid = grid;
}

Board.prototype.showPieces = function showPieces() {
    var message = "The current pieces on the board are: ";
    for (var i = 0; i < this.grid.length; i++) {
        for (var j = 0; j < this.grid[i].length; j++) {
            if (this.grid[j][i].piece !== null && !this.grid[j][i].piece.captured) {
                message += this.grid[j][i].piece.color + " " + this.grid[j][i].piece.type + ", ";
            }
        }
    }
    alert(message);
}

Board.prototype.removePiece = function removePiece(id) {
    for (var i = 0; i < this.grid.length; i++) {
        if (this.grid[i].id === id) {
            this.grid[i].captured = true;
            break;
        }
    }
}

//Pass me a square's x and y coordinates and I'll return the piece on that square. Null if not any
Board.prototype.getPiece = function getPiece(x, y) {
    if (this.isOnBoard(new Position(x, y))) {
        return this.grid[x][y].piece;
    } else {
        return null;
    }
}

//TODO If destination is enemy piece, don't null out, but set to captured and move out of the way.
Board.prototype.movePiece = function movePiece(oldPosition, newPosition) {
    this.removeFlair();
    this.removeForks();
    var oldX = oldPosition.x;
    var oldY = oldPosition.y;
    var newX = newPosition.x;
    var newY = newPosition.y;
    var message = undefined;
    var submitted = undefined;
    var capture = false;
    var piece = this.grid[oldX][oldY].piece;
    var initialAttacks = game.attackedPieces(game.otherTurn());
    if (this.isLegalMove(oldPosition, newPosition)) {
        if (this.grid[newX][newY].piece != null) {
            capture = true;
        }
        if (piece instanceof Pawn && !this.grid[newX][newY].piece) {
            this.grid[oldX][oldY].piece = null;
            this.grid[newX][newY].piece = piece;
            this.grid[newX][oldY].piece = null;
        } else{
            this.grid[oldX][oldY].piece = null;
            this.grid[newX][newY].piece = piece;
        }
        this.grid[newX][newY].piece.hasMoved = true;
        piece.movedDouble = this.isMovingDouble(piece, oldPosition, newPosition);
        if (this.isCastling(piece, oldPosition, newPosition)){
            if (newX - oldX === 2) {
                this.grid[5][newY].piece = this.grid[7][newY].piece;
                this.grid[7][newY].piece = null;
            }else if (newX - oldX === -2) {
                this.grid[3][newY].piece = this.grid[0][newY].piece;
                this.grid[0][newY].piece = null;
            }
        }
        if ((newY === 0 || newY === 7) && this.grid[newX][newY].piece.image.indexOf("pawn") !== -1) {
            $("#promotion").show();
            submitted = false;
            $("#board").off();
            $("#submit").on("click", function() {
                if (game.board.promoPosition != undefined) {
                    var pieceType = $("#promotionOptions").val();
                    if (pieceType === "Queen") {
                        game.board.grid[game.board.promoPosition.x][game.board.promoPosition.y].piece = new Queen(game.whoseTurn());
                    } else if (pieceType === "Rook") {
                        game.board.grid[game.board.promoPosition.x][game.board.promoPosition.y].piece = new Rook(game.whoseTurn());
                    } else if (pieceType === "Bishop") {
                        game.board.grid[game.board.promoPosition.x][game.board.promoPosition.y].piece = new Bishop(game.whoseTurn());
                    } else if (pieceType === "Knight") {
                        game.board.grid[game.board.promoPosition.x][game.board.promoPosition.y].piece = new Knight(game.whoseTurn());
                    }
                    $("#promotion").hide();
                    submitted = true;
                    $("#board").on("click", "td", boardClicks);
                    game.turn++;
                    game.board.promoPosition = undefined;
                    layoutBoard();
                }
            });
        }
        
        var afterAttacks = game.attackedPieces(game.otherTurn());
        this.addFlair(initialAttacks, afterAttacks);
        this.grid[oldX][oldY].previous = true;
        this.grid[newX][newY].current = true;
        this.addForks();
        if (game.whoseTurn() == "white") {
            $("#moveList").append("<li>" + this.createMoveString(piece, oldPosition, newPosition, capture) + "</li>");
        } 
        else{
            $("#moveList").children()[$("#moveList").children().length - 1].textContent += " " + this.createMoveString(piece, oldPosition, newPosition, capture);
        }
        if (submitted === undefined) {
            game.turn++;
        } else {
            this.promoPosition = new Position(newX, newY);
        }
        layoutBoard();
        message = this.checkStates();
    } else if (oldX == newX && oldY == newY) {
        layoutBoard();
        message = '';
    }
    else {
        layoutBoard();
        message = 'That is an illegal move!';
    }
    if (message !== undefined) {
        messageUser(message, true);
    }
    this.removeLegalMoves();
    this.lastPiece = piece;
}

Board.prototype.createMoveString = function createMoveString (piece, oldPosition, newPosition, capture, check, promotionType) {
    var moveString = piece.symbol;
    if (capture) {
        if (piece instanceof Pawn) {
            moveString += String.fromCharCode(97 + oldPosition.x);
        }
        moveString += "x";
    }
    game.getPieces(piece.color).forEach(function (otherPiece) {
        if (piece.type === otherPiece.type && piece !== otherPiece && piece.type != "pawn") {
            var otherPosition = otherPiece.getPosition();
            otherPiece.getAttacks(otherPosition).forEach(function(otherMove) {
                if (otherMove.x == newPosition.x && otherMove.y == newPosition.y) {
                    if (otherPosition.x !== oldPosition.x) {
                        moveString += String.fromCharCode(97 + oldPosition.x);
                    } else if (otherPosition.y !== oldPosition.y) {
                        moveString += 8 - oldPosition.y;
                    } else {
                        moveString += String.fromCharCode(97 + oldPosition.x) + (8 - oldPosition.y);
                    }
                }
            })
        }
    });
    moveString += String.fromCharCode(97 + newPosition.x) + (8 - newPosition.y);
    if (game.isInCheck(game.otherPlayer(piece.color))) {
        if (game.isInCheckmate(game.otherPlayer(piece.color))) {
            moveString += "#";
        }else {
            moveString += "+";
        }   
    }
    return moveString;
}

Board.prototype.removeLegalMoves = function removeLegalMoves() {
    for (var i = 0; i < this.grid.length; i++) {
        for (var j = 0; j < this.grid[i].length; j++) {
            this.grid[i][j].legalMove = false;
        }
    }
}

Board.prototype.removeForks = function removeForks() {
    for (var i = 0; i < this.grid.length; i++) {
        for (var j = 0; j < this.grid[i].length; j++) {
            this.grid[i][j].fork = false;
        }
    }
}

Board.prototype.isMovingDouble = function isMovingDouble(piece, oldPosition, newPosition) {
    return piece instanceof Pawn && Math.abs(newPosition.y - oldPosition.y) === 2;
}
Board.prototype.isCastling = function isCastling(piece, oldPosition, newPosition) {
    return piece instanceof King && Math.abs(newPosition.x - oldPosition.x) === 2;
}

Board.prototype.addFlair = function addFlair(initialAttacks, afterAttacks) {
    for (var i = afterAttacks.length - 1; i >= 0; i--) {
        for (var j = initialAttacks.length - 1; j >= 0; j--) {
            if ((afterAttacks[i].x == initialAttacks[j].x) && (afterAttacks[i].y == initialAttacks[j].y)) {
                initialAttacks.splice(j, 1);
                afterAttacks.splice(i, 1);
                break;
            }
        }
    }
    for (var i = 0; i < afterAttacks.length; i++) {
        this.grid[afterAttacks[i].x][afterAttacks[i].y].flair = true;
    }
}

Board.prototype.addForks = function addForks() {
    var forks = game.getWhiteForks();
    for(var i = 0; i < forks.length; i++){
        this.grid[forks[i].x][forks[i].y].fork = true;
    }
}

Board.prototype.checkStates = function checkStates() {
    if (game.isInStalemate(game.whoseTurn())) {
        $("#board").off();
        return "stalemate!";
    } else if (game.insufficientMatingMaterial()){
        $("#board").off();
        return "Insufficient pieces for checkmate. Draw!";
    } else if (game.isInCheck(game.whoseTurn())) {
        if (game.isInCheckmate(game.whoseTurn())) {
            $("#board").off();
            return "checkmate!";
        }
        return "check!";
    } else {
        return "normal";
    }
}

Board.prototype.occupiedBy = function occupiedBy(position) {
    var x = position.x;
    var y = position.y;
    if (this.getPiece(x, y) == null) {
        return null;
    } else {
        return this.getPiece(x, y).color;
    }
}

Board.prototype.isLegalMove = function isLegalMove(oldPosition, newPosition) {
    var piece = this.grid[oldPosition.x][oldPosition.y].piece;
    var legalMoves = game.pieceLegalMoves(oldPosition);
    var moved = false;
    var initialAttacks = game.attackedPieces(game.otherTurn());
    for (var i = 0; i < legalMoves.length; i++) {
        if (legalMoves[i].x == newPosition.x && legalMoves[i].y == newPosition.y) {
            return true;
        }
    }
    return false;
}

// Returns whether the given position is on the board
Board.prototype.isOnBoard = function isOnBoard(position) {
    return !(position.x < 0 || position.x > 7 || position.y < 0 || position.y > 7);
}

Board.prototype.removeFlair = function removeFlair() {
    for (var i = 0; i < this.grid.length; i++) {
        for (var j = 0; j < this.grid[i].length; j++) {
            this.grid[i][j].flair = false;
            this.grid[i][j].current = false;
            this.grid[i][j].previous = false;
        }
    }
};