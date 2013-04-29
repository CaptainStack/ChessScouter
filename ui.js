"use strict";
var BOARD_SIZE = 350;
var firstClick;
var secondClick;
var myGame;
$(function(){
    myGame = new Game();
    layoutBoard();
	$("#turnSpace").text("It is " + myGame.whoseTurn() + "'s turn");
    $("#submitMove").click(changeTurnHeading);
    
    $("#board").on("click", "td", function() {
        if(firstClick == null){
            firstClick = $(this);
        }else{
            secondClick = $(this);
            movePiece(firstClick, secondClick);
            firstClick = null;
            secondClick = null;
        }
    })
});

function movePiece(first, second){
    var firstX = first.context.cellIndex;
    var firstY = first.context.parentNode.rowIndex;
    var piece = myGame.gameBoard.getPiece(firstX, firstY);
    if(myGame.whoseTurn() == piece.color){
        var secondX = second.context.cellIndex;
        var secondY = second.context.parentNode.rowIndex;
        myGame.gameBoard.movePiece(firstX, firstY, secondX, secondY);
        layoutBoard();
    } else {
        alert('It\'s not your turn');
    }
    // myGame.gameBoard.removePiece(myGame.gameBoard.getPiece(div.context.cellIndex, div.context.parentNode.rowIndex).id);
    // layoutBoard();
}

function changeTurnHeading(){
    myGame.makeMove();
	$("#turnSpace").html("It is " + myGame.whoseTurn() + "'s turn");
}

function layoutBoard(){
    $("#board").empty();
    for(var i = 0; i < myGame.gameBoard.grid.length; i++){
        $("<tr>").attr("id", "tr" + i).appendTo($("#board"));
        for(var j = 0; j < myGame.gameBoard.grid[i].length; j++){
            $("<td>")
            .css("background-image", "url("+ "Assets/"+ getImage(j, i) + ")")
            .addClass(occupied(j ,i))
            .css("color", "white")
            .css("width", BOARD_SIZE / 8)
            .css("height", BOARD_SIZE / 8)
            .css("background-position", "center")
            .css("background-repeat", "no-repeat")
            .appendTo("#tr" + i);
        }
    }
    $("#turnSpace").text("It is " + myGame.whoseTurn() + "'s turn");
}

function getText(x, y){
    if(myGame.gameBoard.getPiece(x, y) != null && !myGame.gameBoard.getPiece(x, y).captured){
        return myGame.gameBoard.getPiece(x, y).getSymbol();
    }else{
        return "";
    }
}
function getImage(x, y){
    if(myGame.gameBoard.getPiece(x, y) != null && !myGame.gameBoard.getPiece(x, y).captured){
        return myGame.gameBoard.getPiece(x, y).getImage();
    }else{
        return "";
    }
}
function getBackgroundColor(x, y){
    if((x%2 == 0 && y%2 == 0) || (x%2 != 0 && y%2 != 0)){
        return "white";
    }else{
        return "lightgrey";
    }
}
function occupied(x, y){
    return myGame.gameBoard.getPiece(x, y);
}