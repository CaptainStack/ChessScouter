//This object acts as a data structure that is made up of square that store all the pieces. 
//It has functions that can return information about the board.
"use strict";

function Board() {
    this.promoPosition = null;
    this.lastPiece = null;
    
    var grid = [];
    
    for(var i = 0; i < 8; i++) {
        var row = [];
        for(var j = 0; j < 8; j++) {
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

    for(var i = 2; i < 6; i++) {
        for(var j = 0; j < 8; j++) {
            grid[j][i] = new Square(j, i, null);
        }
    }
    this.grid = grid;
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
    game.moveHistory.push(this.cloneBoard());
    
    this.resetVisualData();
    
    var oldX = oldPosition.x;
    var oldY = oldPosition.y;
    var newX = newPosition.x;
    var newY = newPosition.y;
    var message = null;
    var submitted = null;
    var capture = false;
    var piece = this.grid[oldX][oldY].piece;
    var initialAttacks = game.attackedPieces(game.otherTurn());
    
    if (this.isLegalMove(oldPosition, newPosition)) {
        //Determine if move is a capture (needed for algebraic move history)
        if (this.grid[newX][newY].piece != null) {
            capture = true;
        }
        piece.hasMoved = true;
        piece.movedDouble = this.isMovingDouble(piece, oldPosition, newPosition);
        
        if (piece instanceof Pawn && !this.grid[newPosition.x][newPosition.y].piece) {
            //Check for enpassant. Removed piece is in a different spot than newPosition
            this.grid[oldX][oldY].piece = null;
            this.grid[newX][newY].piece = piece;
            this.grid[newX][oldY].piece = null;
        } else{
            this.grid[oldX][oldY].piece = null;
            this.grid[newX][newY].piece = piece;
        }

        this.completeCastle(piece, oldPosition, newPosition);
        
        if ((newY === 0 || newY === 7) && this.grid[newX][newY].piece instanceof Pawn) {
            $("#promotion").show();
            submitted = false;
            $("#board").off();
            $("#submit").on("click", function() {
                if (this.promoPosition != null) {
                    var pieceType = $("#promotionOptions").val();
                    if (pieceType === "Queen") {
                        this.grid[this.promoPosition.x][this.promoPosition.y].piece = new Queen(game.whoseTurn());
                    } else if (pieceType === "Rook") {
                        this.grid[this.promoPosition.x][this.promoPosition.y].piece = new Rook(game.whoseTurn());
                    } else if (pieceType === "Bishop") {
                        this.grid[this.promoPosition.x][this.promoPosition.y].piece = new Bishop(game.whoseTurn());
                    } else if (pieceType === "Knight") {
                        this.grid[this.promoPosition.x][this.promoPosition.y].piece = new Knight(game.whoseTurn());
                    }
                    
                    $("#promotion").hide();
                    submitted = true;
                    $("#board").on("click", "td", boardClicks);
                    game.turn++;
                    this.promoPosition = null;
                    layoutBoard();
                }
            }.bind(this));
        }
        
        var afterAttacks = game.attackedPieces(game.otherTurn());
        this.addFlair(initialAttacks, afterAttacks);
        this.previousMove = new Position(oldX, oldY);
        this.currentMove = new Position(newX, newY);
        this.addForks();
        
        if (game.whoseTurn() === "white") {
            // $("#moveList").append("<li>" + this.createMoveString(piece, oldPosition, newPosition, capture) + "</li>");
            $("#moveList").append("<tr>" + "<td>" + ($("#moveList").children().length + 1) + "." + "</td>" + "<td>" + this.createMoveString(piece, oldPosition, newPosition, capture) + "</td>" + "<td></td>" + "</tr>");
        } else {
            // $("#moveList").append("<tr>" + "<td>" + this.createMoveString(piece, oldPosition, newPosition, capture) + "</td>" + "</tr>");
            // $("#moveList").children()[$("#moveList").children().length - 1].insertCell(1);
            $("#moveList").children()[$("#moveList").children().length - 1].cells[2].textContent = this.createMoveString(piece, oldPosition, newPosition, capture);
            // $("#moveList").children()[$("#moveList").children().length - 1].textContent += " " + this.createMoveString(piece, oldPosition, newPosition, capture);
        }
        
        if (submitted === null) {
            game.turn++;
        } else {
            this.promoPosition = new Position(newX, newY);
        }
        
        message = this.checkStates();
    } else if (oldX === newX && oldY === newY) {
        this.addForks();
    } else {
        message = 'Invalid Move';
    }
    
    if (message !== null) {
        messageUser(message, true);
    }
    this.sumSquareControl();
    layoutBoard();
    this.lastPiece = piece;
}

Board.prototype.sumSquareControl = function sumSquareControl() {   
    var blackAttacks = game.getAllLegalAttacks("black");
    var whiteAttacks = game.getAllLegalAttacks("white");
    for (var i = 0; i < blackAttacks.length; i++) {
        this.grid[blackAttacks[i].x][blackAttacks[i].y].blackControl++;
    }
    for (var i = 0; i < whiteAttacks.length; i++) {
        this.grid[whiteAttacks[i].x][whiteAttacks[i].y].whiteControl++;
    }
}

Board.prototype.convertFromAlgebra = function convertFromAlgebra(move, moveIndex) {
    //Qxd7+
    // ["+", "x"].forEach(function(character){
        // move.replace(character, "");
    // });
    // var oldPosition = new Position(move.charCodeAt(0) - 97, move.charAt(1));
    var movePosition = new Position(move.charCodeAt(move.length - 2) - 97, 8 - parseInt(move.charAt(move.length - 1)));
    // this.movePiece(oldPosition, newPosition);
    
    var player = "";
    if (moveIndex % 2 === 0) {
        player = "white";
    } else {
        player = "black";
    }
    var validMoves = [];
    var possiblePiece = game.getPieces(player);
    
    for (var i = possiblePiece.length - 1; i >= 0; i--) {
        var pieceMoves = game.pieceLegalMoves(possiblePiece[i].getPosition());
        for (var j = pieceMoves.length - 1; j >= 0; j--) {
            if (pieceMoves[j].x === movePosition.x && pieceMoves[j].y === movePosition.y) {
                validMoves.push(possiblePiece[i]);
            }
        }
    }
    if (validMoves.length > 1) {
        alert("Unclear");
    }
    else if (validMoves.length === 0) {
        alert("No candidate Piece");
    }
    else {
        alert(validMoves[0].type + " to " + movePosition.x + ", " + movePosition.y);
    }
}

Board.prototype.cloneBoard = function cloneBoard() {
    var boardClone = new Board();
    for (var i = 0; i < this.grid.length; i++) {
        for (var j = 0; j < this.grid[i].length; j++) {
            if (this.grid[i][j].piece) {
                boardClone.grid[i][j].piece = this.grid[i][j].piece.cloneSelf();
            } else {
                boardClone.grid[i][j].piece = null;
            }
        }
    }
    if (this.previousMove) {
        boardClone.previousMove = new Position(this.previousMove.x, this.previousMove.y);
    }
    if (this.currentMove) {
        boardClone.currentMove = new Position(this.currentMove.x, this.currentMove.y);
    }
    boardClone.sumSquareControl();
    return boardClone;
}

Board.prototype.undoMove = function undoMove() {
    if (game.moveHistory.length > 0) {
        var currentState = game.moveHistory.pop();
        game.board = currentState;
        
        if (game.whoseTurn() === "white") {
            var moveString = $("#moveList").children()[$("#moveList").children().length - 1].textContent;
            $("#moveList").children()[$("#moveList").children().length - 1].textContent = moveString.substring(moveString.indexOf(" "));
        } else {
            $("#moveList").children()[$("#moveList").children().length - 1].remove();
        }
        game.turn--;
        layoutBoard();
    }
}

Board.prototype.createMoveString = function createMoveString(piece, oldPosition, newPosition, capture, check, promotionType) {
    var moveString = piece.symbol;
    if (capture) {
        if (piece instanceof Pawn) {
            moveString += String.fromCharCode(97 + oldPosition.x);
        }
        moveString += "x";
    }
    game.getPieces(piece.color).forEach(function(otherPiece) {
        if (piece.type === otherPiece.type && piece !== otherPiece && !piece instanceof Pawn) {
            var otherPosition = otherPiece.getPosition();
            otherPiece.getAttacks(otherPosition).forEach(function(otherMove) {
                if (otherMove.x === newPosition.x && otherMove.y === newPosition.y) {
                    if (otherPosition.x !== oldPosition.x) {
                        moveString += String.fromCharCode(97 + oldPosition.x);
                    } else if (otherPosition.y !== oldPosition.y) {
                        moveString += 8 - oldPosition.y;
                    } else {
                        moveString += String.fromCharCode(97 + oldPosition.x) + (8 - oldPosition.y);
                    }
                }
            });
        }
    });
    moveString += String.fromCharCode(97 + newPosition.x) + (8 - newPosition.y);
    if (game.isInCheck(game.otherPlayer(piece.color))) {
        if (game.isInCheckmate(game.otherPlayer(piece.color))) {
            moveString += "#";
        } else {
            moveString += "+";
        }   
    }
    return moveString;
}

Board.prototype.resetVisualData = function resetVisualData() {
    for (var i = 0; i < this.grid.length; i++) {
        for (var j = 0; j < this.grid[i].length; j++) {
            this.grid[i][j].legalMove = false;
            this.grid[i][j].fork = false;
            this.grid[i][j].flair = false;
            this.grid[i][j].blackControl = null;
            this.grid[i][j].whiteControl = null;
        }
    }
}

Board.prototype.isMovingDouble = function isMovingDouble(piece, oldPosition, newPosition) {
    return piece instanceof Pawn && Math.abs(newPosition.y - oldPosition.y) === 2;
}

Board.prototype.completeCastle = function completeCastle(piece, oldPosition, newPosition) {
    if (piece instanceof King && Math.abs(newPosition.x - oldPosition.x) === 2) {
        if (newPosition.x - oldPosition.x === 2) {
            this.grid[5][newPosition.y].piece = this.grid[7][newPosition.y].piece;
            this.grid[7][newPosition.y].piece = null;
        } else if (newPosition.x - oldPosition.x === -2) {
            this.grid[3][newPosition.y].piece = this.grid[0][newPosition.y].piece;
            this.grid[0][newPosition.y].piece = null;
        }
    }
}

Board.prototype.addFlair = function addFlair(initialAttacks, afterAttacks) {
    for (var i = afterAttacks.length - 1; i >= 0; i--) {
        for (var j = initialAttacks.length - 1; j >= 0; j--) {
            if ((afterAttacks[i].x === initialAttacks[j].x) && (afterAttacks[i].y === initialAttacks[j].y)) {
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
    for(var i = 0; i < forks.length; i++) {
        this.grid[forks[i].x][forks[i].y].fork = true;
    }
}

Board.prototype.checkStates = function checkStates() {
    if (game.isInStalemate(game.whoseTurn())) {
        $("#board").off();
        return "Stalemate";
    } else if (game.insufficientMatingMaterial()) {
        $("#board").off();
        return "Insufficient pieces for checkmate. Draw!";
    } else if (game.isInCheck(game.whoseTurn())) {
        if (game.isInCheckmate(game.whoseTurn())) {
            $("#board").off();
            return "Checkmate";
        }
        return "Check";
    } else {
        return "";
    }
}

Board.prototype.occupiedBy = function occupiedBy(position) {
    var x = position.x;
    var y = position.y;
    if (this.getPiece(x, y) === null) {
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
        if (legalMoves[i].x === newPosition.x && legalMoves[i].y === newPosition.y) {
            return true;
        }
    }
    return false;
}

// Returns whether the given position is on the board
Board.prototype.isOnBoard = function isOnBoard(position) {
    return !(position.x < 0 || position.x > 7 || position.y < 0 || position.y > 7);
};