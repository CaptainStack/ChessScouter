"use strict"

$(document).ready(function(){
    layoutBoard();
	$("#turnSpace").html("It is " + myGame.getTurn() + "'s turn");
    $("#submitMove").click(changeTurnHeading);    
});

function changeTurnHeading(){
    myGame.makeMove();
	$("#turnSpace").html("It is " + myGame.getTurn() + "'s turn");
    // updateBoard();
}

function layoutBoard(){
	for(var i = 0; i < 64; i++){
		$("<div>")
			//.text(getText(i))
            // .css("background-image", "url("+ "Assets/"+ getImage(i) + ")")
            .css("background-image", "url("+ "Assets/"+ getImage(i) + ")")
            .css("background-position", "center")
            .css("background-repeat", "no-repeat")
            .css("background-color", getBackgroundColor(i))
			.css("left", i%8 * 100 + "px")
			.css("top", parseInt(i/8) * 100 + "px")
			.addClass("puzzlepiece")
			.appendTo($("#board"));
	}
}

function getText(id){
    var y = Math.floor(id/8);
    var x = Math.floor(id%8);
    if(myGame.gameBoard.getPiece(x, y) != null && !myGame.gameBoard.getPiece(x, y).captured){
        return myGame.gameBoard.getPiece(x, y).getSymbol();
    }else{
        return "";
    }
}
function getImage(id){
    var y = Math.floor(id/8);
    var x = Math.floor(id%8);
    if(myGame.gameBoard.getPiece(x, y) != null && !myGame.gameBoard.getPiece(x, y).captured){
        return myGame.gameBoard.getPiece(x, y).getImage();
    }else{
        return "";
    }
}
function getBackgroundColor(id){
    var y = Math.floor(id/8);
    var x = Math.floor(id%8);
    if((y%2 == 0 && x%2 == 0) || (y%2 != 0 && x%2 != 0)){
        return "whire";
    }else{
        return "lightgrey";
    }
}