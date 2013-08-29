//This object initializes a board and manages the state of the game.
"use strict";
function Game(fenString) {
  var fen = new Fen(fenString);
  if (fen.whiteToMove()){
    this.turn = 1;
  }else{
    this.turn = 2;
  }
  // this.turn = 1;
  this.board = new Board(fenString);
  this.moveHistory = [];
};

Game.prototype.whoseTurn = function whoseTurn() {
	if (this.turn % 2 === 0) {
		return "black";
	} else {
		return "white";
	}
};

Game.prototype.otherTurn = function otherTurn() {
	if (this.turn % 2 === 0) {
		return "white";
	} else {
		return "black";
	}
};

Game.prototype.otherPlayer = function otherPlayer(player) {
    if (player === "white") {
      return "black";
    } else {
      return "white"
    }
};

Game.prototype.getPieces = function getPieces(player) {
	var pieceList = [];
	try {
    if (player == "white" || player == "black" || player == "all") {
      for(var i = 0; i < this.board.grid.length; i++) {
        for(var j = 0; j < this.board.grid[i].length; j++) {
          var piece = this.board.grid[i][j].piece;
          if (piece) {
            if (piece.color() == "white" && player == "white") {
              pieceList.push(piece);
            } else if (piece.color() == "black" && player == "black") {
              pieceList.push(piece);
            } else if (player == "all") {
              pieceList.push(piece);
            }
          }
        }
      }
      return pieceList;
    } else {
      throw new Error("bad input");
    }
  } catch(err) {
    alert(err + "player must be \"black\" or \"white\" or \"all\"");
  }
};

//All pieces have a getAttacks method that is redundant with getLegalMoves. This is because Pawn moves
//differently from how it attacks. For now it's easier but we should get inheritance working so it's less
//stupid.
Game.prototype.getAllLegalAttacks = function getAllLegalAttacks(player) {
	try {
		var attacks = [];
		if (player == "white" || player == "black") {
			var pieces = this.getPieces(player);
			for(var i = 0; i < pieces.length; i++) {
				var pieceAttack = pieces[i].getAttacks(pieces[i].getPosition());
				for(var j = 0; j < pieceAttack.length; j++) {
					attacks.push(pieceAttack[j]);
				}
			}
			return attacks;
		} else {
			throw "bad input";
		}
	} catch(err) {
		alert(err + " player must be \"black\" or \"white\"");
	}
};

Game.prototype.isInCheck = function isInCheck(player) {
	var pieces = game.getPieces(player);
    var king = this.findKing(player);
	var enemyAttacks;
	if (player == "white") {
		enemyAttacks = this.getAllLegalAttacks("black");
	} else {
		enemyAttacks = this.getAllLegalAttacks("white");
	}
	for(var i = 0; i < enemyAttacks.length; i++) {
		if (enemyAttacks[i].x == king.getPosition().x && enemyAttacks[i].y == king.getPosition().y) {
			return true;
			break;
		}
	}
};

Game.prototype.findKing = function findKing(player) {
  var pieces = this.getPieces(player);
  var king = null;
  var kingFound = false;
  var counter = 0;
	// Loop over the board until the king is found
	while (!kingFound) {
		if (pieces[counter].imageFileName() == player + "_king.svg") {
			king = pieces[counter];
			kingFound = true;
		}
		counter++;
	}
  if (kingFound) {
      return king;
  } else {
      return null;
  }
};

Game.prototype.isInCheckmate = function isInCheckmate(player) {
  var pieces = this.getPieces(player);
  var legalMoves = [];
  for(var i = 0; i < pieces.length; i++) {
    var pieceMoves = this.pieceLegalMoves(pieces[i].getPosition());
    for(var j = 0; j < pieceMoves.length; j++) {
      legalMoves.push(pieceMoves[i]);
    }
  }
  if (legalMoves.length === 0 && this.isInCheck(player)) {
    return true;
  } else {
    return false;
  }
};

Game.prototype.isInStalemate = function isInStalemate(player) {
  var pieces = this.getPieces(player);
  var legalMoves = [];
  for(var i = 0; i < pieces.length; i++) {
    var pieceMoves = this.pieceLegalMoves(pieces[i].getPosition());
    for(var j = 0; j < pieceMoves.length; j++) {
        legalMoves.push(pieceMoves[i]);
    }
  }
  if (
      (legalMoves.length === 0 && !this.isInCheck(player)) || 
      ((this.getPieces("white").length === 1 && this.findKing(player) !== null) && (this.getPieces("black").length === 1 && this.findKing(player))) ||
      ((this.getPieces("white").length === 1 && this.getPieces("white")[0] instanceof King) && (this.getPieces("black").length === 1 && this.getPieces("black")[0] instanceof King))
  ) {
    return true;
  } else {
    return false;
  }
};

Game.prototype.insufficientMatingMaterial = function insufficientMatingMaterial() {
  var sufficient = true;
  var whitePieces = this.getPieces("white");
  var blackPieces = this.getPieces("black");
  var allPieces = this.getPieces("all");
  
  if (allPieces.length > 4) {
    return false;
  } else {
    var whiteKnights = 0;
    var whiteBishops = 0;
    var blackKnights = 0;
    var blackBishops = 0;
    var whiteBishopSquareColor = undefined;
    var blackBishopSquareColor = undefined;
    for(var i = 0; i < allPieces.length; i++) {
      if (allPieces[i] instanceof Rook || allPieces[i] instanceof Queen || allPieces[i] instanceof Pawn) {
        return false;
      } else {
        var color = allPieces[i].color();
        var type = allPieces[i].name();
        
        switch(type)
        {
        case "bishop":
          if (color === "black") {
            blackBishops++;
            blackBishopSquareColor = allPieces[i].getPosition().x % 2 === allPieces[i].getPosition().y % 2;
            break;
          } else {
            whiteBishops++;
            whiteBishopSquareColor = allPieces[i].getPosition().x % 2 === allPieces[i].getPosition().y % 2;
            break;
          }
        case "knight":
          if (color === "black") {
              blackKnights++;
          } else {
              whiteKnights++;
          }
          break;
        case "king":
          break;
        }
      }
    }
    if (
        (whiteKnights === 0 && whiteBishops === 0 && blackKnights === 0 && blackBishops === 0) ||
        (whiteKnights === 1 && whiteBishops === 0 && blackKnights === 0 && blackBishops === 0) ||
        (whiteKnights === 0 && whiteBishops === 1 && blackKnights === 0 && blackBishops === 0) ||
        (whiteKnights === 0 && whiteBishops === 0 && blackKnights === 1 && blackBishops === 0) ||
        (whiteKnights === 0 && whiteBishops === 0 && blackKnights === 0 && blackBishops === 1) ||
        ((whiteKnights === 0 && whiteBishops === 1 && blackKnights === 0 && blackBishops === 1) && (blackBishopSquareColor === whiteBishopSquareColor))
    ) {
        return true;
    }
    else {
        return false;
    }
  }    
};

Game.prototype.pieceLegalMoves = function pieceLegalMoves(position) {
  var piece = game.board.grid[position.x][position.y].piece;
  var legalMoves = piece.getLegalMoves(position);
  for(var i = legalMoves.length - 1; i >= 0; i--) {
    var foreignContents = game.board.grid[legalMoves[i].x][legalMoves[i].y].piece;
    game.board.grid[position.x][position.y].piece = null;
    game.board.grid[legalMoves[i].x][legalMoves[i].y].piece = piece;
    if (this.isInCheck(game.whoseTurn())) {
      game.board.grid[position.x][position.y].piece = piece;
      game.board.grid[legalMoves[i].x][legalMoves[i].y].piece = foreignContents;
      legalMoves.splice(i, 1);
    } else {
      game.board.grid[position.x][position.y].piece = piece;
      game.board.grid[legalMoves[i].x][legalMoves[i].y].piece = foreignContents;
    }
  }
  return legalMoves;
};

Game.prototype.attackedPieces = function attackedPieces(player) {
  var initialAttacks = this.getAllLegalAttacks(this.otherPlayer(player));
  for(var i = initialAttacks.length - 1; i >= 0; i--) {
    if (this.board.grid[initialAttacks[i].x][initialAttacks[i].y].piece == null ||
    this.board.grid[initialAttacks[i].x][initialAttacks[i].y].piece.color() == this.otherPlayer(player)) {
      initialAttacks.splice(i, 1);
    }
  }
  return initialAttacks;
};

Game.prototype.getWhiteForks = function getWhiteForks() {
  var forks = [];
  var pieces = this.getPieces("white");
  for(var i = 0; i < pieces.length; i++) {
    var pieceMoves = pieces[i].getLegalMoves(pieces[i].getPosition());
    for(var j = 0; j < pieceMoves.length; j++) {
      var initialAttacks = this.attackedPieces("black");
      //Make the move but save information so move can be undone
      var piece = pieces[i];
      var oldPosition = piece.getPosition();
      var foreignContents = this.board.grid[pieceMoves[j].x][pieceMoves[j].y].piece;
      this.board.grid[pieceMoves[j].x][pieceMoves[j].y].piece = piece;
      this.board.grid[oldPosition.x][oldPosition.y].piece = null;
      
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
      if (afterAttacks.length >= 2) {
        forks.push(pieceMoves[j]);
      }
      this.board.grid[oldPosition.x][oldPosition.y].piece = piece;
      this.board.grid[pieceMoves[j].x][pieceMoves[j].y].piece = foreignContents;
    }
  }
  return forks;
};
