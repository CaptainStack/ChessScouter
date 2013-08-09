/*
This file is the most global function and is what binds the logic and objects to 
DOM elements.
*/
"use strict";
var BOARD_SIZE = 400;
var firstClick;
var secondClick;
var myGame;

$(function() {
    myGame = new Game();
    layoutBoard();
    $("#turnSpace").text("It is " + myGame.whoseTurn() + "'s turn");
    var temp = $("#board");
    $("#promotion").hide();
    //Create a seperate method for first click and then another for second click.
    //TODO just pass legal moves to movePiece so you don't need to check twice.
    $("#board").on("click", "td", boardClicks)
    $("#filters").on("click", ".help", alertHelp)
    $("#filters").on("click", "input", function() {
        layoutBoard();
    })
});

function alertHelp(){
        var option = $(this).context.parentNode.innerText.substring(0, $(this).context.parentNode.innerText.length - 2);
        alert(option);
    $.getJSON("Messages.json", function(json) {
        var option = $(this).context.parentNode.innerText.substring(0, $(this).context.parentNode.innerText.length - 2);
        alert(option);
        alert(json[option]);
    });
}

function movePiece(first, second) {
    var firstX = first.x;
    var firstY = first.y;
    if (myGame.gameBoard.getPiece(firstX, firstY)) {
        firstClick = null;
    }
    var piece = myGame.gameBoard.getPiece(firstX, firstY);
    if (myGame.whoseTurn() === piece.color) {
        var secondX = second.x;
        var secondY = second.y;
        myGame.gameBoard.movePiece(new Position(firstX, firstY), new Position(secondX, secondY));
    } else {
        messageUser("It's not your turn!", true);
    }
}

function boardClicks() {
    var firstX = $(this).context.cellIndex;
    var firstY = $(this).context.parentNode.rowIndex;
    if (firstClick == null && myGame.gameBoard.getPiece(firstX, firstY) !== null && myGame.gameBoard.getPiece(firstX, firstY).color == myGame.whoseTurn()) {
        firstClick = $(this);
        firstClick = new Position(firstX, firstY);
        var piece = myGame.gameBoard.getPiece(firstX, firstY);
        var legalMoves = myGame.pieceLegalMoves(new Position(firstX, firstY));
        if ($("#legalMoves").attr("checked") != undefined) {
            for (var i = 0; i < legalMoves.length; i++) {
                myGame.gameBoard.grid[legalMoves[i].x][legalMoves[i].y].legalMove = true;
            }
        }
        layoutBoard();
        getTableData(firstX, firstY).css("border-color", "blue");
    } else if (firstClick !== null) {
        // secondClick = $(this);
        secondClick = new Position($(this).context.cellIndex, $(this).context.parentNode.rowIndex);
        movePiece(firstClick, secondClick);
        firstClick = null;
        secondClick = null;
        layoutBoard();
    } else {
        messageUser("It's not your turn!", true);
    }
}

// 'Update' function updates the visual state of the board
function layoutBoard() {
    $("#board").empty();
    for (var i = 0; i < myGame.gameBoard.grid.length; i++) {
        $("<tr>").attr("id", "tr" + i).addClass("gridLabel").appendTo($("#board"));
        $("<div>").text(8 - i).css("vertical-align", "text-middle").css("line-height", BOARD_SIZE / 8 + 24 + "px").appendTo($("#tr" + i));
        for (var j = 0; j < myGame.gameBoard.grid[i].length; j++) {
            $("<td>")
                .addClass(occupied(j, i))
                .attr("id", j + "-" + i)
                .css("color", "white")
                .css("width", BOARD_SIZE / 8)
                .css("height", BOARD_SIZE / 8)
                .css("background-position", "center")
                .css("background-repeat", "no-repeat")
                .appendTo("#tr" + i)
                .css("background-image", getBackgroundImageString(new Position(j, i)));
        }
    }
    if ($("#space").attr("checked") != undefined) {
        showSpaceControl();
    }
    if ($("#pieceFlair").attr("checked") != undefined) {
        showPieceFlair();
    }
    showLastMove();
}
function showPieceFlair() {
    for (var i = 0; i < myGame.gameBoard.grid.length; i++) {
        for (var j = 0; j < myGame.gameBoard.grid[i].length; j++) {
            if (myGame.gameBoard.grid[i][j].flair === true) {
                $(getTableData(i, j)).addClass("pieceFlair");
            }
        }
    }
}
function showLastMove() {
    for (var i = 0; i < myGame.gameBoard.grid.length; i++) {
        for (var j = 0; j < myGame.gameBoard.grid[i].length; j++) {
            if (myGame.gameBoard.grid[i][j].previous === true) {
                $(getTableData(i, j)).attr("id", "previous");
            }
            if (myGame.gameBoard.grid[i][j].current === true) {
                $(getTableData(i, j)).attr("id", "current");
            }
        }
    }
}
function getBackgroundImageString(position){
    var piece = "";
    var dot = "";
    var fork = "";
    if(myGame.gameBoard.grid[position.x][position.y].legalMove){
        dot = "url(Assets/blue_dot.svg)";
    }
    if ($("#forks").attr("checked") != undefined && myGame.gameBoard.grid[position.x][position.y].fork === true) {
        if(dot === ""){
            fork = "url(Assets/white_fork.svg)";
        }else{
            fork = ", url(Assets/white_fork.svg)";
        }
    }
    if(myGame.gameBoard.getPiece(position.x, position.y) != null){
        if(dot !== "" || fork !== ""){
            piece = ", url(Assets/" + myGame.gameBoard.getPiece(position.x, position.y).image + ")";
        }else{
            piece = "url(Assets/" + myGame.gameBoard.getPiece(position.x, position.y).image + ")";
        }
    }
    if(fork !== ""){
        var backgroundPosition = "bottom right";
        if(dot !== ""){
            backgroundPosition = "center center, " + backgroundPosition;
        }
        if(piece !== ""){
            backgroundPosition += ", center center";
        }
        getTableData(position.x, position.y).css("background-position", backgroundPosition);
    }
    return dot + fork + piece;
}
function showSpaceControl() {
    var blackAttacks = myGame.getAllLegalAttacks("black");
    for (var i = 0; i < blackAttacks.length; i++) {
        getTableData(blackAttacks[i].x, blackAttacks[i].y).css("background-color", "lightpink");
    }
    var whiteAttacks = myGame.getAllLegalAttacks("white");
    for (var i = 0; i < whiteAttacks.length; i++) {
        if ($(getTableData(whiteAttacks[i].x, whiteAttacks[i].y)).css("background-color") == "rgb(255, 182, 193)" || $(getTableData(whiteAttacks[i].x, whiteAttacks[i].y)).css("background-color") == "rgb(204, 255, 51)") {
            getTableData(whiteAttacks[i].x, whiteAttacks[i].y).css("background-color", "#CCFF33");
        } else {
            getTableData(whiteAttacks[i].x, whiteAttacks[i].y).css("background-color", "lightgreen");
        }
    }
    $("#turnSpace").text("It is " + myGame.whoseTurn() + "'s turn");
}

function getText(x, y) {
    if (myGame.gameBoard.getPiece(x, y) !== null && !myGame.gameBoard.getPiece(x, y).captured) {
        return myGame.gameBoard.getPiece(x, y).getSymbol();
    } else {
        return "";
    }
}

function getImage(x, y) {
    if (myGame.gameBoard.getPiece(x, y) !== null && !myGame.gameBoard.getPiece(x, y).captured) {
        return myGame.gameBoard.getPiece(x, y).getImage();
    } else {
        return "";
    }
}

// send a message to the user
function messageUser(message, important) {
    var $messages = $('#messages');
    $messages.empty();
    var $p = $('<p>').text(message);
    if (important) $p.addClass('important');
    $messages.append($p);
    $p.fadeOut(7000, function() {
        $(this).remove();
    });
}

function getBackgroundColor(x, y) {
    if ((x % 2 == 0 && y % 2 == 0) || (x % 2 !== 0 && y % 2 !== 0)) {
        return "white";
    } else {
        return "lightgrey";
    }
}

function occupied(x, y) {
    return myGame.gameBoard.getPiece(x, y);
}

function getTableData(x, y) {
    return $("#" + x + "-" + y);
}