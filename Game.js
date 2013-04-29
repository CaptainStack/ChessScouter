"use strict";
function Game() {    
    this.turn = 1;

    
    // temp[6];
    var temp = [    
    new Piece("black", "rook", 0, 0, false, false),
    new Piece("black", "knight", 1, 0, false, false),
    new Piece("black", "bishop", 2, 0, false, false),
    new Piece("black", "queen", 3, 0, false, false),
    new Piece("black", "king", 4, 0, false, false),
    new Piece("black", "bishop", 5, 0, false, false),
    new Piece("black", "knight", 6, 0, false, false),
    new Piece("black", "rook", 7, 0, false, false),
    new Piece("black", "pawn", 0, 1, false, false),
    new Piece("black", "pawn", 1, 1, false, false),
    new Piece("black", "pawn", 2, 1, false, false),
    new Piece("black", "pawn", 3, 1, false, false),
    new Piece("black", "pawn", 4, 1, false, false),
    new Piece("black", "pawn", 5, 1, false, false),
    new Piece("black", "pawn", 6, 1, false, false),
    new Piece("black", "pawn", 7, 1, false, false),

    new Piece("white", "rook", 0, 7, false, false),
    new Piece("white", "knight", 1, 7, false, false),
    new Piece("white", "bishop", 2, 7, false, false),
    new Piece("white", "queen", 3, 7, false, false),
    new Piece("white", "king", 4, 7, false, false),
    new Piece("white", "bishop", 5, 7, false, false),
    new Piece("white", "knight", 6, 7, false, false),
    new Piece("white", "rook", 7, 7, false, false),
    
    new Piece("white", "pawn", 0, 6, false, false),
    new Piece("white", "pawn", 1, 6, false, false),
    new Piece("white", "pawn", 2, 6, false, false),
    new Piece("white", "pawn", 3, 6, false, false),
    new Piece("white", "pawn", 4, 6, false, false),
    new Piece("white", "pawn", 5, 6, false, false),
    new Piece("white", "pawn", 6, 6, false, false),
    new Piece("white", "pawn", 7, 6, false, false)
    ];
    
    var grid = [];
    for(var i = 0; i < 8; i++){
        var row = [];
        for(var j = 0; j < 8; j++){        
            row[j] = new Square(i, j, null);
        }
        grid[i] = row;
    }
    console.log(grid);
    for(var i = 0; i < temp.length; i++){
        var piece = temp[i];
        var x = piece.getPosition().x;
        var y = piece.getPosition().y;
        grid[x, y] = new Square(x, y, piece);
    }
    this.gameBoard = new Board(grid);
}
Game.prototype.getTurn = function getTurn(){
    if(this.turn % 2 === 0){
        return "black";
    }else{
        return "white";
    }
}
Game.prototype.makeMove = function makeMove(){
    this.turn++;
};
var myGame = new Game();