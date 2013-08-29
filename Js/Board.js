//This object acts as a data structure that is made up of square that store all the pieces. 
//It has functions that can return information about the board.
"use strict";


function Board(fenString) {
  this.promoPosition = null;
  this.lastPiece = null;

  if (typeof fenString !== 'string'){
    // TODO: don't silently set to starting position on input error
    fenString = Fen.starting;
  }

  var fen = new Fen(fenString);

  var grid = new Array(8);
  for (var x=0;x<8;x++){grid[x] = new Array(8);}

  for(var file = 0; file < 8; file++) {
    for(var rank = 0; rank < 8; rank++) {
      if (fen.pieceAt(file, rank) === '.'){
        grid[file][rank] = new Square(file, rank, null);
      }else{
        grid[file][rank] = new Square(file, rank, Piece.newInstance(fen.pieceAt(file,rank)));
      }
    }
  }

  this.grid = grid;
};


//Testing function. No real purpose.
Board.prototype.showPieces = function showPieces() {
  var message = "The current pieces on the board are: ";
  for (var i = 0; i < this.grid.length; i++) {
    for (var j = 0; j < this.grid[i].length; j++) {
      if (this.grid[j][i].piece !== null && !this.grid[j][i].piece.captured) {
        message += this.grid[j][i].piece.color() + " " + this.grid[j][i].piece.name() + ", ";
      }
    }
  }
  alert(message);
};

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
};

//TODO If destination is enemy piece, don't null out, but set to captured and move out of the way.
Board.prototype.movePiece = function movePiece(oldPosition, newPosition) {
  game.moveHistory.push(this.cloneBoard());
  
  this.removeFlair();
  this.removeForks();
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
    
    this.grid[oldX][oldY].piece = null;
    this.grid[newX][newY].piece = piece;
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
          
          // TODO:  figure out why boardClick was being wired up again here - was causing the function to be called twice even though user only clicked once.
          // $("#board").on("click", "td", boardClicks);
          game.turn++;
          this.promoPosition = null;
          layoutBoard();
        }
      }.bind(this));
    }
    
    var afterAttacks = game.attackedPieces(game.otherTurn());
    this.addFlair(initialAttacks, afterAttacks);
    this.grid[oldX][oldY].previous = true;
    this.grid[newX][newY].current = true;
    this.addForks();
    
    if (game.whoseTurn() == "white") {
        $("#moveList").append("<li>" + this.createMoveString(piece, oldPosition, newPosition, capture) + "</li>");
    } else {
      // maybe the white move is not there... if so, add an ellipsis before adding black's move
      var whitesMove = $("#moveList").children()[$("#moveList").children().length - 1];
      if (!whitesMove){
        $("#moveList").append("<li>" + '..' + "</li>");
      }
      $("#moveList").children()[$("#moveList").children().length - 1].textContent += " " + this.createMoveString(piece, oldPosition, newPosition, capture);
      
    }
    
    if (submitted === null) {
        game.turn++;
    } else {
        this.promoPosition = new Position(newX, newY);
    }
    
    message = this.checkStates();
  } else if (oldX == newX && oldY == newY) {
    //Cancel selection
  } else {
    message = 'That is an illegal move!';
  }
  
  if (message !== null) {
    messageUser(message, true);
  }
  
  layoutBoard();
  this.removeLegalMoves();
  this.lastPiece = piece;
};

Board.prototype.convertFromAlgebra = function convertFromAlgebra(move) {
  ["+", "x", "B", "K", "N", "Q", "R"].forEach(function(character){
      move.replace(character, "");
  });
  var oldPosition = new Position(move.charCodeAt(0) - 97, move.charAt(1));
  var newPosition = new Position(move.charCodeAt(move.length - 2) - 97, move.charAt(move.length - 1));
  this.movePiece(oldPosition, newPosition);
};

Board.prototype.cloneBoard = function cloneBoard() {
  var boardClone = new Board();
  for (var i = 0; i < this.grid.length; i++) {
    for (var j = 0; j < this.grid[i].length; j++) {
      var thisPiece = this.grid[i][j].piece;
      if (thisPiece) {
          // boardClone.grid[i][j].piece = this.grid[i][j].piece.cloneSelf();
        boardClone.grid[i][j].piece = thisPiece.cloneSelf();
      } else {
        boardClone.grid[i][j].piece = null;
      }
    }
  }
  return boardClone;
};

Board.prototype.undoMove = function undoMove() {
  if (game.moveHistory.length > 0) {
    var currentState = game.moveHistory.pop();
    game.board = currentState;
    game.moveRedos.push(currentState);
    
    if (game.whoseTurn() == "white") {
      var moveString = $("#moveList").children()[$("#moveList").children().length - 1].textContent;
      $("#moveList").children()[$("#moveList").children().length - 1].textContent = moveString.substring(moveString.indexOf(" "));
    } else {
      $("#moveList").children()[$("#moveList").children().length - 1].remove();
    }
    game.turn--;
    layoutBoard();
  }
};

Board.prototype.createMoveString = function createMoveString(piece, oldPosition, newPosition, capture, check, promotionType) {
  var moveString = piece.symbol();
  if (capture) {
    if (piece instanceof Pawn) {
      moveString += String.fromCharCode(97 + oldPosition.x);
    }
    moveString += "x";
  }
  game.getPieces(piece.color()).forEach(function(otherPiece) {
    if (piece.name() === otherPiece.name() && piece !== otherPiece && !piece instanceof Pawn) {
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
      });
    }
  });
  moveString += String.fromCharCode(97 + newPosition.x) + (8 - newPosition.y);
  if (game.isInCheck(game.otherPlayer(piece.color()))) {
    if (game.isInCheckmate(game.otherPlayer(piece.color()))) {
      moveString += "#";
    } else {
      moveString += "+";
    }   
  }
  return moveString;
};

Board.prototype.removeLegalMoves = function removeLegalMoves() {
  for (var i = 0; i < this.grid.length; i++) {
    for (var j = 0; j < this.grid[i].length; j++) {
      this.grid[i][j].legalMove = false;
    }
  }
};

Board.prototype.removeForks = function removeForks() {
  for (var i = 0; i < this.grid.length; i++) {
    for (var j = 0; j < this.grid[i].length; j++) {
      this.grid[i][j].fork = false;
    }
  }
};

Board.prototype.isMovingDouble = function isMovingDouble(piece, oldPosition, newPosition) {
  return piece instanceof Pawn && Math.abs(newPosition.y - oldPosition.y) === 2;
};

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
};

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
};

Board.prototype.addForks = function addForks() {
  var forks = game.getWhiteForks();
  for(var i = 0; i < forks.length; i++) {
    this.grid[forks[i].x][forks[i].y].fork = true;
  }
};

Board.prototype.checkStates = function checkStates() {
  if (game.isInStalemate(game.whoseTurn())) {
      $("#board").off();
      return "stalemate!";
  } else if (game.insufficientMatingMaterial()) {
      $("#board").off();
      return "Insufficient pieces for checkmate. Draw!";
  } else if (game.isInCheck(game.whoseTurn())) {
      if (game.isInCheckmate(game.whoseTurn())) {
        $("#board").off();
        return "checkmate!";
      }
      return "check!";
  } else {
    return null;
  }
};

Board.prototype.occupiedBy = function occupiedBy(position) {
  var x = position.x;
  var y = position.y;
  if (this.getPiece(x, y) == null) {
    return null;
  } else {
    return this.getPiece(x, y).color();
  }
};

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
};

// Returns whether the given position is on the board
Board.prototype.isOnBoard = function isOnBoard(position) {
  return !(position.x < 0 || position.x > 7 || position.y < 0 || position.y > 7);
};

Board.prototype.removeFlair = function removeFlair() {
  for (var i = 0; i < this.grid.length; i++) {
    for (var j = 0; j < this.grid[i].length; j++) {
      this.grid[i][j].flair = false;
      this.grid[i][j].current = false;
      this.grid[i][j].previous = false;
    }
  }
};

