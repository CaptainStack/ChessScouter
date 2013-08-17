"use strict";
function Pawn(color) {
    this.color = color;
    this.captured = false;
    this.hasMoved = false;
    this.image = color + "_pawn.svg";
    this.material = 1;
    this.type = "pawn";
    this.symbol = "";
    this.movedDouble = false;
}

Pawn.prototype.isCaptured = function isCaptured() {
    return this.captured;
}
Pawn.prototype.setMoved = function setMoved(movedState) {
    this.hasMoved = movedState;
}
Pawn.prototype.getPotentialMoves = function getPotentialMoves(position) {
    var x = position.x;
    var y = position.y;
    if(this.color == "white") {
        var potentialMoves = [new Position(x, y - 1)];
        if(!this.hasMoved) {
            potentialMoves.push(new Position(x, y - 2));
        }
        potentialMoves.push(new Position(x - 1, y - 1));
        potentialMoves.push(new Position(x + 1, y - 1));
    }else{
        var potentialMoves = [new Position(x, y + 1)];
        if(!this.hasMoved) {
            potentialMoves.push(new Position(x, y + 2));
        }
        potentialMoves.push(new Position(x - 1, y + 1));
        potentialMoves.push(new Position(x + 1, y + 1));
    }
    return potentialMoves;
}
Pawn.prototype.getLegalMoves = function getLegalMoves(currentPosition) {
    var potentialMoves = [];
    var x = currentPosition.x;
    var y = currentPosition.y;
    if(this.color == "white"){
        if(myGame.gameBoard.occupiedBy(new Position(x, y - 1)) == null) {
            potentialMoves.push(new Position(x, y - 1));
            if(!this.hasMoved && myGame.gameBoard.occupiedBy(new Position(x, y - 2)) == null) {
                potentialMoves.push(new Position(x, y - 2));
            }
        }
        if(myGame.gameBoard.occupiedBy(new Position(x - 1, y - 1)) == "black") {
            potentialMoves.push(new Position(x - 1, y - 1));
        }
        if(myGame.gameBoard.occupiedBy(new Position(x + 1, y - 1)) == "black") {
            potentialMoves.push(new Position(x + 1, y - 1));
        }
        if(y == 3 && myGame.gameBoard.lastPiece instanceof Pawn && myGame.gameBoard.getPosition(myGame.gameBoard.lastPiece).y == 3 && myGame.gameBoard.lastPiece.movedDouble) {
            if(myGame.gameBoard.getPosition(myGame.gameBoard.lastPiece).x == x - 1) {
                potentialMoves.push(new Position(x - 1, y - 1));
            }
            else if(myGame.gameBoard.getPosition(myGame.gameBoard.lastPiece).x == myGame.gameBoard.getPosition(this).x + 1) {
                potentialMoves.push(new Position(x + 1, y - 1));
            }
        }
    } else {
        if(myGame.gameBoard.occupiedBy(new Position(x, y + 1)) == null) {
            potentialMoves.push(new Position(x, y + 1));
            if(!this.hasMoved && myGame.gameBoard.occupiedBy(new Position(x, y + 2)) == null) {
                potentialMoves.push(new Position(x, y + 2));
            }
        }
        if(myGame.gameBoard.occupiedBy(new Position(x - 1, y + 1)) == "white") {
            potentialMoves.push(new Position(x - 1, y + 1));
        }
        if(myGame.gameBoard.occupiedBy(new Position(x + 1, y + 1)) == "white") {
            potentialMoves.push(new Position(x + 1, y + 1));
        }
        if(y == 4 && myGame.gameBoard.lastPiece instanceof Pawn && myGame.gameBoard.getPosition(myGame.gameBoard.lastPiece).y == 4 && myGame.gameBoard.lastPiece.movedDouble) {
            if(myGame.gameBoard.getPosition(myGame.gameBoard.lastPiece).x == x - 1) {
                potentialMoves.push(new Position(x - 1, y + 1));
            }
            else if(myGame.gameBoard.getPosition(myGame.gameBoard.lastPiece).x == myGame.gameBoard.getPosition(this).x + 1) {
                potentialMoves.push(new Position(x + 1, y + 1));
            }
        }
    }
	// var thisPosition = myGame.gameBoard.getPosition(this);
	for(var i = potentialMoves.length - 1; i >= 0; i--) {
		if(!myGame.gameBoard.isOnBoard(potentialMoves[i])) {
			potentialMoves.splice(i, 1);
		}
	}
    return potentialMoves;
}

Pawn.prototype.getAttacks = function getAttacks(currentPosition) {
	var attacks = [];
    var x = currentPosition.x;
    var y = currentPosition.y;
    if(this.color == "white"){
		attacks.push(new Position(x - 1, y - 1));
		attacks.push(new Position(x + 1, y - 1));
	}else{
		attacks.push(new Position(x - 1, y + 1));
		attacks.push(new Position(x + 1, y + 1));
    }
	for(var i = attacks.length - 1; i >= 0; i--){
		if(!myGame.gameBoard.isOnBoard(attacks[i])) {
			attacks.splice(i, 1);
		}
	}
    return attacks;
};