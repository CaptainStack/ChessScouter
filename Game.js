"use strict";
function Game() {    
    this.turn = 1;
    var temp = [    
    new Piece(0, "black", "rook", 0, 0, false, false),
    new Piece(1, "black", "knight", 1, 0, false, false),
    new Piece(2, "black", "bishop", 2, 0, false, false),
    new Piece(3, "black", "queen", 3, 0, false, false),
    new Piece(4, "black", "king", 4, 0, false, false),
    new Piece(5, "black", "bishop", 5, 0, false, false),
    new Piece(6, "black", "knight", 6, 0, false, false),
    new Piece(7, "black", "rook", 7, 0, false, false),
    new Piece(8, "black", "pawn", 0, 1, false, false),
    new Piece(9, "black", "pawn", 1, 1, false, false),
    new Piece(10, "black", "pawn", 2, 1, false, false),
    new Piece(11, "black", "pawn", 3, 1, false, false),
    new Piece(12, "black", "pawn", 4, 1, false, false),
    new Piece(13, "black", "pawn", 5, 1, false, false),
    new Piece(14, "black", "pawn", 6, 1, false, false),
    new Piece(15, "black", "pawn", 7, 1, false, false),

    new Piece(16, "white", "rook", 0, 7, false, false),
    new Piece(17, "white", "knight", 1, 7, false, false),
    new Piece(18, "white", "bishop", 2, 7, false, false),
    new Piece(19, "white", "queen", 3, 7, false, false),
    new Piece(20, "white", "king", 4, 7, false, false),
    new Piece(21, "white", "bishop", 5, 7, false, false),
    new Piece(22, "white", "knight", 6, 7, false, false),
    new Piece(23, "white", "rook", 7, 7, false, false),
    
    new Piece(24, "white", "pawn", 0, 6, false, false),
    new Piece(25, "white", "pawn", 1, 6, false, false),
    new Piece(26, "white", "pawn", 2, 6, false, false),
    new Piece(27, "white", "pawn", 3, 6, false, false),
    new Piece(28, "white", "pawn", 4, 6, false, false),
    new Piece(29, "white", "pawn", 5, 6, false, false),
    new Piece(30, "white", "pawn", 6, 6, false, false),
    new Piece(31, "white", "pawn", 7, 6, false, false)
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