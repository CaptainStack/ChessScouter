/*
This file is the most global function and is what binds the logic and objects to 
DOM elements.
*/
"use strict";
var BOARD_SIZE = 350;
var firstClick;
var secondClick;
var myGame;
$(function(){
    myGame = new Game();
    layoutBoard();
	$("#turnSpace").text("It is " + myGame.whoseTurn() + "'s turn");
    
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
    if(myGame.gameBoard.getPiece(firstX, firstY)){
        firstClick = null;
    }
    var piece = myGame.gameBoard.getPiece(firstX, firstY);
    if(myGame.whoseTurn() == piece.color){
        var secondX = second.context.cellIndex;
        var secondY = second.context.parentNode.rowIndex;
        myGame.gameBoard.movePiece(firstX, firstY, secondX, secondY);
        layoutBoard();
    } else {
        alert('It\'s not your turn!');
    }
}

function layoutBoard(){
    $("#board").empty();
    for(var i = 0; i < myGame.gameBoard.grid.length; i++){
        $("<tr>").attr("id", "tr" + i).addClass("gridLabel").appendTo($("#board"));
         $("<div>").text(i + 1).css("vertical-align", "text-middle").css("line-height", BOARD_SIZE / 8 + 24 + "px").appendTo($("#tr" + i));
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
    $("<th>").addClass("gridLabel").appendTo($("#board"));
    //Change to be dynamic with number of columns
    for(var i = 0; i < 8; i++){
        // $("<th>").text(String.fromCharCode(97 + i).appendTo("#board"));
        $("<th>").text(String.fromCharCode(97 + i)).addClass("gridLabel").appendTo($("#board"));
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
