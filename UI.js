/*
This file is the most global function and is what binds the logic and objects to 
DOM elements.
*/
"use strict";
var BOARD_SIZE = 350;
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
    $("#filters").on("click", "input", function() {
        layoutBoard();
    })
});

function movePiece(first, second) {
    var firstX = first.context.cellIndex;
    var firstY = first.context.parentNode.rowIndex;
    if (myGame.gameBoard.getPiece(firstX, firstY)) {
        firstClick = null;
    }
    var piece = myGame.gameBoard.getPiece(firstX, firstY);
    if (myGame.whoseTurn() == piece.color) {
        var secondX = second.context.cellIndex;
        var secondY = second.context.parentNode.rowIndex;
        myGame.gameBoard.movePiece(new Position(firstX, firstY), new Position(secondX, secondY));
        // layoutBoard();
    } else {
        messageUser("It's not your turn!", true);
        // layoutBoard();
    }
}

function boardClicks() {
    var firstX = $(this).context.cellIndex;
    var firstY = $(this).context.parentNode.rowIndex;
    if (firstClick == null && myGame.gameBoard.getPiece(firstX, firstY) !== null && myGame.gameBoard.getPiece(firstX, firstY).color == myGame.whoseTurn()) {
        firstClick = $(this);
        var piece = myGame.gameBoard.getPiece(firstX, firstY);
        var legalMoves = myGame.pieceLegalMoves(new Position(firstX, firstY));
        if ($("#legalMoves").attr("checked") != undefined) {
            for (var i = 0; i < legalMoves.length; i++) {
                if (myGame.gameBoard.grid[legalMoves[i].x][legalMoves[i].y].getContents() === null) {
                    getTableData(legalMoves[i].x, legalMoves[i].y).css("background-image", "url(Assets/blue_dot.svg)");
                } else {
                    getTableData(legalMoves[i].x, legalMoves[i].y).css("background-image", "url(Assets/blue_dot.svg), url(Assets/" + getImage(legalMoves[i].x, legalMoves[i].y) + ")");
                }
            }
        }
    } else if (firstClick !== null) {
        secondClick = $(this);
        movePiece(firstClick, secondClick);
        firstClick = null;
        secondClick = null;
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
                .css("background-image", "url(" + "Assets/" + getImage(j, i) + ")")
                .addClass(occupied(j, i))
                .attr("id", j + "-" + i)
                .css("color", "white")
                .css("width", BOARD_SIZE / 8)
                .css("height", BOARD_SIZE / 8)
                .css("background-position", "center")
                .css("background-repeat", "no-repeat")
                .appendTo("#tr" + i);
        }
    }
    if ($("#space").attr("checked") != undefined) {
        showSpaceControl();
    }
    if ($("#pieceFlair").attr("checked") != undefined) {
        showPieceFlair();
    }
}

function showPieceFlair() {
    for (var i = 0; i < myGame.gameBoard.grid.length; i++) {
        for (var j = 0; j < myGame.gameBoard.grid[i].length; j++) {
            if (myGame.gameBoard.grid[i][j].flair === true) {
                $(getTableData(i, j)).addClass("pieceFlair")
            }
        }
    }
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
    $p.fadeOut(900, function() {
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