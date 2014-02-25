"use strict";
function King(color) {
    this.color = color;
    this.captured = false;
    this.image = color + "_king.svg";
    this.hasMoved = false;
    this.material = 100;
    this.type = "king";
    this.symbol = "K";
}

King.prototype.getPosition = function getPosition() {
    for (var i = 0; i < game.board.grid.length; i++) {
        for (var j = 0; j < game.board.grid[i].length; j++) {
            if (game.board.grid[j][i].piece === this) {
                return new Position(j, i);
            }
        }
    }
    return new Position(this.x, this.y);
}

King.prototype.getPotentialMoves = function getPotentialMoves(startPosition) {
    var x = startPosition.x;
    var y = startPosition.y;
    var potentialMoves = [
                        new Position(x, y + 1), 
                        new Position(x, y - 1),
                        new Position(x + 1, y),
                        new Position(x - 1, y),
                        new Position(x + 1, y + 1),
                        new Position(x + 1, y - 1),
                        new Position(x - 1, y + 1),
                        new Position(x - 1, y - 1)
                        ];
    for(var i = potentialMoves.length - 1; i >= 0; i--) {
        if (!game.board.isOnBoard(potentialMoves[i])) {
            potentialMoves.splice(i, 1);
        }
    }
    return potentialMoves;
}

King.prototype.getLegalMoves = function getLegalMoves(currentPosition) {
    var legalMoves = this.getPotentialMoves(currentPosition);
    
    for(var i = legalMoves.length - 1; i >= 0; i--) {
        if (game.board.occupiedBy(new Position(legalMoves[i].x, legalMoves[i].y)) === this.color) {
            legalMoves.splice(i, 1);
        }
    }
    
    //Castling logic
    if (this.color === "white" && !game.isInCheck("white") && !this.hasMoved) {
        if (
            game.board.grid[5][7].piece === null && 
            game.board.grid[6][7].piece === null && 
            game.board.grid[7][7].piece !== null &&
            !game.board.grid[7][7].piece.hasMoved && 
            game.board.grid[7][7].piece.image === "white_rook.svg"
        ) {
            var throughCheck = false;
            var otherAttacks = game.getAllLegalAttacks("black");
            for(var i = 0; i < otherAttacks.length; i++) {
                if ((otherAttacks[i].x === 5 && otherAttacks[i].y === 7) || (otherAttacks[i].x === 6 && otherAttacks[i].y === 7)) {
                    throughCheck = true;
                }
            }
            if (!throughCheck) {
                legalMoves.push(new Position(6, 7));
            }
        }
        if (
            game.board.grid[1][7].piece === null && 
            game.board.grid[2][7].piece === null && 
            game.board.grid[3][7].piece === null && 
            game.board.grid[0][7].piece !== null &&
            !game.board.grid[0][7].piece.hasMoved &&
            game.board.grid[0][7].piece.image === "white_rook.svg"
        ) {
            var throughCheck = false;
            var otherAttacks = game.getAllLegalAttacks("black");
            for(var i = 0; i < otherAttacks.length; i++) {
                if ((otherAttacks[i].x === 1 && otherAttacks[i].y === 7) || (otherAttacks[i].x === 2 && otherAttacks[i].y === 7) || (otherAttacks[i].x === 3 && otherAttacks[i].y === 7)) {
                    throughCheck = true;
                }
            }
            if (!throughCheck) {
                legalMoves.push(new Position(2, 7));
            }
        }
    } else if (this.color === "black" && !game.isInCheck("black") && !this.hasMoved) {
        if (
            game.board.grid[5][0].piece === null && 
            game.board.grid[6][0].piece === null && 
            game.board.grid[7][0].piece !== null &&
            !game.board.grid[7][0].piece.hasMoved && 
            game.board.grid[7][0].piece.image === "black_rook.svg"
        ) {
            var throughCheck = false;
            var otherAttacks = game.getAllLegalAttacks("white");
            for(var i = 0; i < otherAttacks.length; i++) {
                if ((otherAttacks[i].x === 5 && otherAttacks[i].y === 0) || (otherAttacks[i].x === 6 && otherAttacks[i].y === 0)) {
                    throughCheck = true;
                }
            }
            if (!throughCheck) {
                legalMoves.push(new Position(6, 0));
            }
        }
        if (
            game.board.grid[1][0].piece === null && 
            game.board.grid[2][0].piece === null && 
            game.board.grid[3][0].piece === null && 
            game.board.grid[0][0].piece !== null &&
            !game.board.grid[0][0].piece.hasMoved && 
            game.board.grid[0][0].piece.image === "black_rook.svg"
        ) {
            var throughCheck = false;
            var otherAttacks = game.getAllLegalAttacks("white");
            for(var i = 0; i < otherAttacks.length; i++) {
                if ((otherAttacks[i].x === 1 && otherAttacks[i].y === 0) || (otherAttacks[i].x === 2 && otherAttacks[i].y === 0) || (otherAttacks[i].x === 3 && otherAttacks[i].y === 0)) {
                    throughCheck = true;
                }
            }
            if (!throughCheck) {
                legalMoves.push(new Position(2, 0));
            }
        }
    }
    return legalMoves;
}

King.prototype.getAttacks = function getAttacks(currentPosition) {
    return this.getPotentialMoves(currentPosition);
}

King.prototype.cloneSelf = function cloneSelf() {
    var selfClone = new King(this.color);
    selfClone.color = this.color;
    selfClone.captured = this.captured;
    selfClone.image = this.image;
    selfClone.hasMoved = this.hasMoved;
    selfClone.material = this.material;
    selfClone.type = this.type;
    selfClone.symbol = this.symbol;
    return selfClone;
};