"use strict";


// var Knight = function(color){
	// if (color === 'white'){
		// this.init('N');
	// }else{
		// this.init('n');
	// }
// }
// Knight.prototype = new Piece;

function Knight(color) {
	this.color = color;
	this.captured = false;
	this.image = color + "_knight.svg";
    this.material = 3;
    this.type = "knight"
    this.symbol = "N";
}


// Knight.prototype.getPosition = function getPosition() {
    // for (var i = 0; i < game.board.grid.length; i++) {
        // for (var j = 0; j < game.board.grid[i].length; j++) {
            // if (game.board.grid[j][i].piece === this) {
                // return new Position(j, i);
            // }
        // }
    // }
    // return new Position(this.x, this.y);
// }

Knight.prototype.getPotentialMoves = function getPotentialMoves(position) {
	var x = position.x;
	var y = position.y;
	var potentialMoves = [
						new Position(x - 2, y + 1), 
						new Position(x - 2, y - 1), 
						new Position(x + 1, y - 2), 
						new Position(x - 1, y - 2), 
						new Position(x + 2, y + 1), 
						new Position(x + 2, y - 1), 
						new Position(x - 1, y + 2), 
						new Position(x + 1, y + 2)
						];
	for(var i = potentialMoves.length - 1; i >= 0; i--) {
		if (!game.board.isOnBoard(potentialMoves[i])) {
			potentialMoves.splice(i, 1);
		}
	}
	return potentialMoves;
}

Knight.prototype.getLegalMoves = function getLegalMoves(currentPosition) {
	var legalMoves = this.getPotentialMoves(currentPosition);
	for(var i = legalMoves.length - 1; i >= 0; i--) {
		if (game.board.occupiedBy(legalMoves[i]) == this.color) {
			legalMoves.splice(i, 1);
		}
	}
	return legalMoves;
}

Knight.prototype.getAttacks = function getAttacks(currentPosition) {
	return this.getPotentialMoves(currentPosition);
}

// Knight.prototype.cloneSelf = function cloneSelf() {
    // var selfClone = new Knight(this.color);
    // selfClone.color = this.color;
    // selfClone.captured = this.captured;
    // selfClone.image = this.image;
    // selfClone.hasMoved = this.hasMoved;
    // selfClone.material = this.material;
    // selfClone.type = this.type;
    // selfClone.symbol = this.symbol;
    // return selfClone;
// };
