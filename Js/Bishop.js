//This file controls the behavior of the bishop pieces on the board.
"use strict";
function Bishop(color) {
    this.color = color;
    this.captured = false;
    this.image = color + "_bishop.svg";
    this.material = 3;
    this.type = "bishop";
    this.symbol = "B";
}

Bishop.prototype.getPosition = function getPosition() {
    for (var i = 0; i < game.board.grid.length; i++) {
        for (var j = 0; j < game.board.grid[i].length; j++) {
            if (game.board.grid[j][i].piece === this) {
                return new Position(j, i);
            }
        }
    }
    return new Position(this.x, this.y);
}

//This method records the possible moves the piece can make and inserts them into number of arrays for easy future acess.
Bishop.prototype.getPotentialMoves = function getPotentialMoves(postion) {
    var x = postion.x;
    var y = postion.y;
    var potentialMoves = [];
    var vectorNorthEast = false;
    var vectorSouthEast = false;
    var vectorNorthWest = false;
    var vectorSouthWest = false;
    var addX = 0
    var addY = 0
    var northEastMoves = [];
    var southEastMoves = [];
    var northWestMoves = [];
    var southWestMoves = [];
    while(vectorNorthEast === false || vectorSouthEast === false || vectorNorthWest === false || vectorSouthWest === false) {
        //North: Y-- South: Y++ East: X-- West: X++ 
        if (vectorNorthEast === false) {
            addY--;
            addX--;
            if (game.board.isOnBoard(new Position(x + addX,y + addY))) {
                northEastMoves.push(new Position (x + addX, y + addY));
            } else {
                addY = 0;
                addX = 0;
                vectorNorthEast = true;
            }
        } else if (vectorSouthEast === false) {
            addY++;
            addX--;
            if (game.board.isOnBoard(new Position(x + addX,y + addY))) {
                southEastMoves.push(new Position (x + addX, y + addY));
            } else {
                addY = 0;
                addX = 0;
                vectorSouthEast = true;
            }
        } else if (vectorNorthWest === false) {
            addY--;
            addX++;
            if (game.board.isOnBoard(new Position(x + addX,y + addY))) {
                northWestMoves.push(new Position (x + addX, y + addY));
            } else {
                addX = 0;
                addY = 0;
                vectorNorthWest = true;
            }
        } else if (vectorSouthWest === false) {
            addX++;
            addY++;
            if (game.board.isOnBoard(new Position(x + addX,y + addY))) {
                southWestMoves.push(new Position (x + addX, y + addY));
            } else {
                addX = 0;
                vectorSouthWest = true;
            }
        }
    }
    potentialMoves.push(northEastMoves);
    potentialMoves.push(southEastMoves);
    potentialMoves.push(northWestMoves);
    potentialMoves.push(southWestMoves);
    return potentialMoves;
}

//This method filters poential moves to produce legal moves.
Bishop.prototype.getLegalMoves = function getLegalMoves(currentPosition) {
    var legalMoves = [];
    var allMoves = this.getPotentialMoves(currentPosition);
    
    for(var i = 0; i < allMoves.length; i++) {
        var currVectorMoves = allMoves[i];
        for(var j = 0; j < currVectorMoves.length; j++) {
            if (game.board.occupiedBy(currVectorMoves[j]) === null) {
                legalMoves.push(currVectorMoves[j]);
            } else if (game.board.occupiedBy(currVectorMoves[j]) !== this.color) {
                legalMoves.push(currVectorMoves[j]);
                break;
            } else {
                break;
            }
        }
    }
    return legalMoves;
}

//This method identifies where the piece can legally attack another piece.
Bishop.prototype.getAttacks = function getAttacks(currentPosition) {
    var legalMoves = [];
    var allMoves = this.getPotentialMoves(currentPosition)
    for(var i = 0; i < allMoves.length; i++) {
        var currVectorMoves = allMoves[i];
        for(var j = 0; j < currVectorMoves.length; j++) {
            if (game.board.occupiedBy(currVectorMoves[j]) === null) {
                legalMoves.push(currVectorMoves[j]);
            } else if (game.board.occupiedBy(currVectorMoves[j]) !== this.color) {
                legalMoves.push(currVectorMoves[j]);
                break;
            } else {
                legalMoves.push(currVectorMoves[j]);
                break;
            }
        }
    }
    return legalMoves;
}

Bishop.prototype.cloneSelf = function cloneSelf() {
    var selfClone = new Bishop(this.color);
    selfClone.color = this.color;
    selfClone.captured = this.captured;
    selfClone.image = this.image;
    selfClone.hasMoved = this.hasMoved;
    selfClone.material = this.material;
    selfClone.type = this.type;
    selfClone.symbol = this.symbol;
    return selfClone;
};