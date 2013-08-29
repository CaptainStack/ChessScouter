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

Pawn.prototype.getPosition = function getPosition() {
    for (var i = 0; i < game.board.grid.length; i++) {
        for (var j = 0; j < game.board.grid[i].length; j++) {
            if (game.board.grid[j][i].piece === this) {
                return new Position(j, i);
            }
        }
    }
    return new Position(this.x, this.y);
}

Pawn.prototype.getPotentialMoves = function getPotentialMoves(position) {
    var x = position.x;
    var y = position.y;
    if (this.color == "white") {
        var potentialMoves = [new Position(x, y - 1)];
        if (!this.hasMoved) {
            potentialMoves.push(new Position(x, y - 2));
        }
        potentialMoves.push(new Position(x - 1, y - 1));
        potentialMoves.push(new Position(x + 1, y - 1));
    } else{
        var potentialMoves = [new Position(x, y + 1)];
        if (!this.hasMoved) {
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
    if (this.color == "white") {
        if (game.board.occupiedBy(new Position(x, y - 1)) == null) {
            potentialMoves.push(new Position(x, y - 1));
            if (!this.hasMoved && game.board.occupiedBy(new Position(x, y - 2)) == null) {
                potentialMoves.push(new Position(x, y - 2));
            }
        }
        if (game.board.occupiedBy(new Position(x - 1, y - 1)) == "black") {
            potentialMoves.push(new Position(x - 1, y - 1));
        }
        if (game.board.occupiedBy(new Position(x + 1, y - 1)) == "black") {
            potentialMoves.push(new Position(x + 1, y - 1));
        }
        if (y == 3 && game.board.lastPiece instanceof Pawn && game.board.lastPiece.getPosition().y == 3 && game.board.lastPiece.movedDouble) {
            if (game.board.lastPiece.getPosition().x == x - 1) {
                potentialMoves.push(new Position(x - 1, y - 1));
            }
            else if (game.board.lastPiece.getPosition().x == this.getPosition().x + 1) {
                potentialMoves.push(new Position(x + 1, y - 1));
            }
        }
    } else {
        if (game.board.occupiedBy(new Position(x, y + 1)) == null) {
            potentialMoves.push(new Position(x, y + 1));
            if (!this.hasMoved && game.board.occupiedBy(new Position(x, y + 2)) == null) {
                potentialMoves.push(new Position(x, y + 2));
            }
        }
        if (game.board.occupiedBy(new Position(x - 1, y + 1)) == "white") {
            potentialMoves.push(new Position(x - 1, y + 1));
        }
        if (game.board.occupiedBy(new Position(x + 1, y + 1)) == "white") {
            potentialMoves.push(new Position(x + 1, y + 1));
        }
        if (y == 4 && game.board.lastPiece instanceof Pawn && game.board.lastPiece.getPosition().y == 4 && game.board.lastPiece.movedDouble) {
            if (game.board.getPosition(game.board.lastPiece).x == x - 1) {
                potentialMoves.push(new Position(x - 1, y + 1));
            }
            else if (game.board.lastPiece.getPosition().x == this.getPosition().x + 1) {
                potentialMoves.push(new Position(x + 1, y + 1));
            }
        }
    }
	for(var i = potentialMoves.length - 1; i >= 0; i--) {
		if (!game.board.isOnBoard(potentialMoves[i])) {
			potentialMoves.splice(i, 1);
		}
	}
    return potentialMoves;
}

Pawn.prototype.getAttacks = function getAttacks(currentPosition) {
	var attacks = [];
    var x = currentPosition.x;
    var y = currentPosition.y;
    if (this.color == "white") {
		attacks.push(new Position(x - 1, y - 1));
		attacks.push(new Position(x + 1, y - 1));
	} else{
		attacks.push(new Position(x - 1, y + 1));
		attacks.push(new Position(x + 1, y + 1));
    }
	for(var i = attacks.length - 1; i >= 0; i--) {
		if (!game.board.isOnBoard(attacks[i])) {
			attacks.splice(i, 1);
		}
	}
    return attacks;
}
Pawn.prototype.cloneSelf = function cloneSelf() {
    var selfClone = new Pawn(this.color);
    selfClone.color = this.color;
    selfClone.captured = this.captured;
    selfClone.image = this.image;
    selfClone.hasMoved = this.hasMoved;
    selfClone.material = this.material;
    selfClone.type = this.type;
    selfClone.symbol = this.symbol;
    return selfClone;
};
