"use strict";
function Rook(color) {
    this.color = color;
    this.captured = false;
    this.image = color + "_rook.svg";
    this.hasMoved = false;
    this.material = 5;
    this.type = "rook";
    this.symbol = "R";
}

Rook.prototype.getPosition = function getPosition() {
    for (var i = 0; i < game.board.grid.length; i++) {
        for (var j = 0; j < game.board.grid[i].length; j++) {
            if (game.board.grid[j][i].piece === this) {
                return new Position(j, i);
            }
        }
    }
    return new Position(this.x, this.y);
}

Rook.prototype.getPotentialMoves = function getPotentialMoves(position) {
    var x = position.x;
    var y = position.y;
	var potentialMoves = [];
	var vectorNorth = false;
	var vectorSouth = false;
	var vectorEast = false;
	var vectorWest = false;
	var addX = 0
	var addY = 0
    var northMoves = [];
    var southMoves = [];
    var eastMoves = [];
    var westMoves = [];
	while(vectorNorth === false || vectorSouth === false || vectorEast === false || vectorWest === false) {
		if(vectorNorth === false) {
			addY--;
			if( game.board.isOnBoard(new Position(x + addX,y + addY))){
				northMoves.push(new Position (x + addX, y + addY));
			}else {
				addY = 0;
				vectorNorth = true;
			}
		}else if (vectorSouth === false) {
			addY++;
			if( game.board.isOnBoard(new Position(x + addX,y + addY))){
				southMoves.push(new Position (x + addX, y + addY));
			}else {
				addY = 0;
				vectorSouth = true;
			}
		}else if (vectorEast === false) {
            addX--;
			if( game.board.isOnBoard(new Position(x + addX,y + addY))){
				eastMoves.push(new Position (x + addX, y + addY));
			}else {
				addX = 0;
				vectorEast = true;
			}
		}else if (vectorWest === false) {
            addX++;
			if( game.board.isOnBoard(new Position(x + addX,y + addY))){
				westMoves.push(new Position (x + addX, y + addY));
			}else {
				addX = 0;
				vectorWest = true;
			}
		}
	}
    potentialMoves.push(northMoves);
    potentialMoves.push(southMoves);
    potentialMoves.push(eastMoves);
    potentialMoves.push(westMoves);
	return potentialMoves;
}
Rook.prototype.getLegalMoves = function getLegalMoves(currentPosition) {
    var legalMoves = [];
    var allMoves = this.getPotentialMoves(currentPosition);
	
    for(var i = 0; i < allMoves.length; i++){
        var currVectorMoves = allMoves[i];
        for(var j = 0; j < currVectorMoves.length; j++){
            if(game.board.occupiedBy(currVectorMoves[j]) === null) {
                legalMoves.push(currVectorMoves[j]);
            }else if(game.board.occupiedBy(currVectorMoves[j]) !== this.color) {
                legalMoves.push(currVectorMoves[j]);
                break;
            }else{
                break;
            }
        }
    }
    return legalMoves;
}
Rook.prototype.getAttacks = function getAttacks(currentPosition) {
    var legalMoves = [];
    var allMoves = this.getPotentialMoves(currentPosition);
	
    for(var i = 0; i < allMoves.length; i++){
        var currVectorMoves = allMoves[i];
        for(var j = 0; j < currVectorMoves.length; j++){
            if(game.board.occupiedBy(currVectorMoves[j]) === null) {
                legalMoves.push(currVectorMoves[j]);
            }else if(game.board.occupiedBy(currVectorMoves[j]) !== this.color) {
                legalMoves.push(currVectorMoves[j]);
                break;
            }else{
                legalMoves.push(currVectorMoves[j]);
                break;
            }
        }
    }
    return legalMoves;
};