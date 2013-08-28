// Forsyth–Edwards Notation
"use strict";

// SPEC from http://chessprogramming.wikispaces.com/Forsyth-Edwards+Notation
// <FEN> ::=  <Piece Placement>
// 		' ' <Side to move>
// 		' ' <Castling ability>
// 		' ' <En passant target square>
// 		' ' <Halfmove clock>
// 		' ' <Fullmove counter>
//One FEN string or record consists of six fields separated by a space character. The first four fields of the FEN specification are the same as the first four fields of the EPD specification.
//
// <Piece Placement> ::= <rank8>'/'<rank7>'/'<rank6>'/'<rank5>'/'<rank4>'/'<rank3>'/'<rank2>'/'<rank1>
	// <ranki>       ::= [<digit17>]<piece> {[<digit17>]<piece>} [<digit17>] | '8'
	// <piece>       ::= <white Piece> | <black Piece>
	// <digit17>     ::= '1' | '2' | '3' | '4' | '5' | '6' | '7'
	// <white Piece> ::= 'P' | 'N' | 'B' | 'R' | 'Q' | 'K'
	// <black Piece> ::= 'p' | 'n' | 'b' | 'r' | 'q' | 'k'
//The Piece Placement is determined rank by rank in big-endian order, that is starting at the 8th rank down to the first rank. Each rank is separated by the terminal symbol '/' (slash). One rank, scans piece placement in little-endian file-order from the A to H.
//A decimal digit counts consecutive empty squares, the pieces are identified by a single letter from standard English names for chess pieces as used in the Algebraic chess notation. Uppercase letters are for white pieces, lowercase letters for black pieces.
//
//<Side to move> ::= {'w' | 'b'}
//Side to move is one lowercase letter for either White ('w') or Black ('b').
//
//<Castling ability> ::= '-' | ['K'] ['Q'] ['k'] ['q'] (1..4)
//If neither side can castle, the symbol '-' is used, otherwise each of four individual castling rights for king and queen castling for both sides are indicated by a sequence of one to four letters.
//
//<En passant target square> ::= '-' | <epsquare>
// 		<epsquare>   ::= <fileLetter> <eprank>
// 		<fileLetter> ::= 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h'
// 		<eprank>     ::= '3' | '6'
//The en passant target square is specified after a double push of a pawn, no matter whether an en passant capture is really possible or not [2] [3] [4] . Other moves than double pawn pushes imply the symbol '-' for this FEN field.
//
//<Halfmove Clock> ::= <digit> {<digit>}
// 		<digit> ::= '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'
//The halfmove clock specifies a decimal number of half moves with respect to the 50 move draw rule. It is reset to zero after a capture or a pawn move and incremented otherwise.
//
// <Fullmove counter> ::= <digit19> {<digit>}
// <digit19> ::= '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'
// <digit>   ::= '0' | <digit19>
// The number of the full moves in a game. It starts at 1, and is incremented after each Black's move.

Fen.starting = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

function Fen(fen) {
	// validate input
	if (!Fen.validate(fen)){
		alert('Invalid fen: ' + fen);
		this.fen = null;
		return;
	}
	this.fen = fen;
	// alert('side to move:  __' + this.sideToMove() + '__');
	// alert('castling ability:  __' + this.castlingAbility() + '__');
}

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
// string half move clock
Fen.prototype.halfMoveClock = function(){
	return this.excludePiecePlacement().split(" ")[3];
};
// string full move counter
Fen.prototype.fullMoveCounter = function(){
	return this.excludePiecePlacement().split(" ")[4];
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



// Validates a fen string using regular expression.  
Fen.validate = function(fen){
	var regex = /\s*([rnbqkpRNBQKP1-8]+\/){7}([rnbqkpRNBQKP1-8]+)\s[bw-]\s(([a-hkqA-HKQ]{1,4})|(-))\s(([a-h][36])|(-))\s\d+\s\d+\s*/;

	if (typeof fen !== 'string'){
		return false;
	}
	return regex.test(fen);
};
