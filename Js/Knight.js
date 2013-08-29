"use strict";

var Knight = function(color){
  if (color === 'white'){
    this.init('N');
  }else{
    this.init('n');
  }
};
Knight.prototype = new Piece;

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
};

Knight.prototype.getLegalMoves = function getLegalMoves(currentPosition) {
  var legalMoves = this.getPotentialMoves(currentPosition);
  for(var i = legalMoves.length - 1; i >= 0; i--) {
    if (game.board.occupiedBy(legalMoves[i]) == this.color()) {
      legalMoves.splice(i, 1);
    }
  }
  return legalMoves;
};

Knight.prototype.getAttacks = function getAttacks(currentPosition) {
  return this.getPotentialMoves(currentPosition);
};
