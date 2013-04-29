//This object initializes a board and pieces and manages the state of the game.
"use strict";
function Game() {    
    this.turn = 1;
    
    var grid = [];
    for(var i = 0; i < 8; i++){
        var row = [];
        for(var j = 0; j < 8; j++){        
            row[j] = new Square(i, j, null);
        }
        grid[i] = row;
    }
    grid[0][0] = new Square(0, 0, new Piece("black", "rook", false, false));
    grid[1][0] = new Square(1, 0, new Piece("black", "knight", false, false));
    grid[2][0] = new Square(2, 0, new Piece("black", "bishop", false, false));
    grid[3][0] = new Square(3, 0, new Piece("black", "queen", false, false));
    grid[4][0] = new Square(4, 0, new Piece("black", "king", false, false));
    grid[5][0] = new Square(5, 0, new Piece("black", "bishop", false, false));
    grid[6][0] = new Square(6, 0, new Piece("black", "knight", false, false));
    grid[7][0] = new Square(7, 0, new Piece("black", "rook", false, false));
    
    grid[0][1] = new Square(0, 1, new Piece("black", "pawn", false, false));
    grid[1][1] = new Square(1, 1, new Piece("black", "pawn", false, false));
    grid[2][1] = new Square(2, 1, new Piece("black", "pawn", false, false));
    grid[3][1] = new Square(3, 1, new Piece("black", "pawn", false, false));
    grid[4][1] = new Square(4, 1, new Piece("black", "pawn", false, false));
    grid[5][1] = new Square(5, 1, new Piece("black", "pawn", false, false));
    grid[6][1] = new Square(6, 1, new Piece("black", "pawn", false, false));
    grid[7][1] = new Square(7, 1, new Piece("black", "pawn", false, false));
    
    grid[0][6] = new Square(0, 6, new Piece("white", "pawn", false, false));
    grid[1][6] = new Square(1, 6, new Piece("white", "pawn", false, false));
    grid[2][6] = new Square(2, 6, new Piece("white", "pawn", false, false));
    grid[3][6] = new Square(3, 6, new Piece("white", "pawn", false, false));
    grid[4][6] = new Square(4, 6, new Piece("white", "pawn", false, false));
    grid[5][6] = new Square(5, 6, new Piece("white", "pawn", false, false));
    grid[6][6] = new Square(6, 6, new Piece("white", "pawn", false, false));
    grid[7][6] = new Square(7, 6, new Piece("white", "pawn", false, false));
    
    grid[0][7] = new Square(0, 7, new Piece("white", "rook", false, false));
    grid[1][7] = new Square(1, 7, new Piece("white", "knight", false, false));
    grid[2][7] = new Square(2, 7, new Piece("white", "bishop", false, false));
    grid[3][7] = new Square(3, 7, new Piece("white", "queen", false, false));
    grid[4][7] = new Square(4, 7, new Piece("white", "king", false, false));
    grid[5][7] = new Square(5, 7, new Piece("white", "bishop", false, false));
    grid[6][7] = new Square(6, 7, new Piece("white", "knight", false, false));
    grid[7][7] = new Square(7, 7, new Piece("white", "rook", false, false));

    this.gameBoard = new Board(grid);
}
Game.prototype.whoseTurn = function whoseTurn(){
    if(this.turn % 2 === 0){
        return "black";
    }else{
        return "white";
    }
}
Game.prototype.makeMove = function makeMove(){
    if(whoseTurn() == "white"){
        
    }else{
    
    }
    this.turn++;
};