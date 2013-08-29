// Forsyth–Edwards Notation
"use strict";

// Find FEN spec at http://chessprogramming.wikispaces.com/Forsyth-Edwards+Notation

var Fen = function(fen){
  // validate input
  if (!Fen.validate(fen)){
    alert('Invalid fen: ' + fen);
    this.fen = null;
    return;
  }
  this.fen = fen;
}
Fen.starting = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

// returns the portion of the fen string representing piece placement 
Fen.prototype.piecePlacement = function(){
  return this.fen.substring(0, this.fen.indexOf(" "));
};

Fen.prototype.excludePiecePlacement = function(){
  return this.fen.substring(this.fen.indexOf(" ") + 1);
};

// string sideToMove
Fen.prototype.sideToMove = function(){
  return this.excludePiecePlacement().substring(0, 1);
};
// string castling ability
Fen.prototype.castlingAbility = function(){
  return this.excludePiecePlacement().split(" ")[1];
};
// string en passant square
Fen.prototype.enPassantTargetSquare = function(){
  return this.excludePiecePlacement().split(" ")[2];
};

// int half move clock
Fen.prototype.halfMoveClock = function(){
  return parseInt(this.excludePiecePlacement().split(" ")[3], 10);
};

// int full move counter
Fen.prototype.fullMoveCounter = function(){
  return parseInt(this.excludePiecePlacement().split(" ")[4], 10);
};

Fen.prototype.canWhiteCastleKingside = function(){return this.canCastle('K');};
Fen.prototype.canWhiteCastleQueenside = function(){return this.canCastle('Q');};
Fen.prototype.canBlackCastleKingside = function(){return this.canCastle('k');};
Fen.prototype.canBlackCastleQueenside = function(){return this.canCastle('q');};

// kqChar is 'K', 'k', 'Q', or 'q' for white kingside, black kingside, white queenside, black queenside respectively.
Fen.prototype.canCastle = function(kqChar){
  return this.castlingAbility().indexOf(kqChar) > -1;
};

// boolean whiteToMove
Fen.prototype.whiteToMove = function(){
  return this.sideToMove() === 'w';
};

// Get array of rows from this.fen
Fen.prototype.getRows = function(){
  // return this.fen.substring(0, this.fen.indexOf(" ")).split('/');
  return this.piecePlacement().split('/');
};

// Returns the piece (represented as a single character) at board position file, rank  
Fen.prototype.pieceAt = function(file, rank){
  var grid = this.arrPiecePlacement();
  return grid[file][rank];
};

// (using same convention as in Board.js with column(file) index first, i.e. (0,0)===a8; (1,0) ===b8; (7,7) === h1)
Fen.prototype.arrPiecePlacement = function(){
  var grid = new Array(8);
  for (var x=0;x<8;x++){
    grid[x] = new Array(8);
  }
  var file,rank;
  var ranks = this.getRows();
  for (rank=0;rank<8;rank++){
    var currentRow = ranks[rank];
    file = 0;
    // read characters in currentRow one at a time, removing each as we go
    while (currentRow.length > 0){
      var nextChar = currentRow.substring(0,1);
      if (/^[1-8]$/.test(nextChar)){ 
        // if next char in string is a digit, fill grid with that many blank pieces.
        for (var j=0; j< parseInt(nextChar, /* radix:= */ 10); j++){
          grid[file][rank] = '.';
          file = file + 1;
        }
      }else{
        // character is not a digit; should be a valid pieceChar
        if (Piece.validateChar(nextChar)){
          grid[file][rank] = nextChar;
          file = file + 1;
        }else{
          throw new Error('invalid FEN');
        }
      }
      
      //remove first character from currentRow
      currentRow = currentRow.substring(1);

    }
  }
  return grid;
};

// Validates a fen string using regular expression.  
Fen.validate = function(fen){
  var regex = /\s*([rnbqkpRNBQKP1-8]+\/){7}([rnbqkpRNBQKP1-8]+)\s[bw-]\s(([a-hkqA-HKQ]{1,4})|(-))\s(([a-h][36])|(-))\s\d+\s\d+\s*/;

  if (typeof fen !== 'string'){
    return false;
  }
  return regex.test(fen);
};
