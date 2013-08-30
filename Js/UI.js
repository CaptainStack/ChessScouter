/*
This file is the most global function and is what binds the logic and objects to 
DOM elements.
*/
"use strict";
var BOARD_SIZE = 400;
var firstClick;
var secondClick;
var game;

$(function() {
    game = new Game();
    game.board.sumSquareControl();
    layoutBoard();
    $("#turnSpace").text("It is " + game.whoseTurn() + "'s turn");
    var temp = $("#board");
    $("#promotion").hide();
    //Create a seperate method for first click and then another for second click.
    //TODO just pass legal moves to movePiece so you don't need to check twice.
    $("#board").on("click", "td", boardClicks);
    $(".help").click(alertHelp);
    $("#moveHistory").on("click", "button", downloadPgn);
    $("#filters").on("click", "input", function() {
        layoutBoard();
    })
    
    //Watch for ctrl + z for undo
    var ctrlDown = false;
    var ctrlKey = 17, zKey = 90, yKey = 89;
    
    $(document).keydown(function(e) {
        if (e.keyCode == ctrlKey) ctrlDown = true;
    }).keyup(function(e){
        if (e.keyCode == ctrlKey) ctrlDown = false;
    });
    
    $(document).keydown(function(e){
        if (ctrlDown && (e.keyCode == zKey)){
            game.board.undoMove();
        }
    });
});

function downloadPgn () {
    var pgn = "";
    for (var i = 0; i < $("#moveList").children().length; i++) {
        pgn += (i + 1) + ". " + $("#moveList").children()[i].textContent + " ";
    }
    
    if (pgn != "") {
        var b = new Blob([pgn], {type: 'pgn'});
        var fileURL = URL.createObjectURL(b);
        
        var a = document.createElement('a'),
        e = document.createEvent("MouseEvents");  // simulated click
        e.initMouseEvent("click", true, false, self, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        a.setAttribute('href', fileURL);
        a.setAttribute('target', '_blank');           // fallback behaviour
        a.setAttribute('download', 'ChessScouterGame.pgn'); // file name
        a.dispatchEvent(e);                           // download
    } else {
        alert("PGN has no contents yet. Make some moves and try again");
    }
}

function alertHelp() {
    var text = $(this).context.parentNode.textContent;
    var option = $(this).attr("id");
    $.getJSON("Js/Messages.json", function(json) {
        alert(json[option]);
    });
}

function movePiece(first, second) {
    var firstX = first.x;
    var firstY = first.y;
    if (game.board.getPiece(firstX, firstY)) {
        firstClick = null;
    }
    var piece = game.board.getPiece(firstX, firstY);
    if (game.whoseTurn() === piece.color) {
        var secondX = second.x;
        var secondY = second.y;
        game.board.movePiece(new Position(firstX, firstY), new Position(secondX, secondY));
    } else {
        messageUser("It's not your turn!", true);
    }
}

function boardClicks() {
    var firstX = $(this).context.cellIndex;
    var firstY = $(this).context.parentNode.rowIndex;
    if (firstClick == null && game.board.getPiece(firstX, firstY) !== null && game.board.getPiece(firstX, firstY).color == game.whoseTurn()) {
        firstClick = $(this);
        firstClick = new Position(firstX, firstY);
        var piece = game.board.getPiece(firstX, firstY);
        var legalMoves = game.pieceLegalMoves(new Position(firstX, firstY));
        if ($("#legalMoves").attr("checked") != undefined) {
            for (var i = 0; i < legalMoves.length; i++) {
                game.board.grid[legalMoves[i].x][legalMoves[i].y].legalMove = true;
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
    $("#turnSpace").text("It is " + game.whoseTurn() + "'s turn");
    $("#board").empty();
    for (var i = 0; i < game.board.grid.length; i++) {
        $("<tr>").attr("id", "tr" + i).addClass("gridLabel").appendTo($("#board"));
        $("<div>").text(8 - i).css("vertical-align", "text-middle").css("line-height", BOARD_SIZE / 8 + 24 + "px").appendTo($("#tr" + i));
        for (var j = 0; j < game.board.grid[i].length; j++) {
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
    for (var i = 0; i < game.board.grid.length; i++) {
        for (var j = 0; j < game.board.grid[i].length; j++) {
            if (game.board.grid[i][j].flair === true) {
                $(getTableData(i, j)).addClass("pieceFlair");
            }
        }
    }
}

function showSpaceControl() {
    for (var i = 0; i < 8; i++) {
        for (var j = 0; j < 8; j++) {
            var square = getTableData(i, j);
            if (!game.board.grid[i][j].whiteControl && !game.board.grid[i][j].blackControl) {
                var control = null;
            } else {
                var control = game.board.grid[i][j].whiteControl - game.board.grid[i][j].blackControl;
            }
            console.log(i + " " + j + " " + control);
            var color = calculateColor(control);
            square.css("background-color", color);
        }
    }
}

function showLastMove() {
    if (game.previousMove){
        $(getTableData(game.previousMove.x, game.previousMove.y)).attr("id", "previous");
    }
    if (game.currentMove) {
        $(getTableData(game.currentMove.x, game.currentMove.y)).attr("id", "current");
    }
}

function getBackgroundImageString(position) {
    var piece = "";
    var dot = "";
    var fork = "";
    if (game.board.grid[position.x][position.y].legalMove) {
        dot = "url(Assets/blue_dot.svg)";
    }
    if ($("#forks").attr("checked") != undefined && game.board.grid[position.x][position.y].fork === true) {
        if (dot === "") {
            fork = "url(Assets/white_fork.svg)";
        } else{
            fork = ", url(Assets/white_fork.svg)";
        }
    }
    if (game.board.getPiece(position.x, position.y) != null) {
        if (dot !== "" || fork !== "") {
            piece = ", url(Assets/" + game.board.getPiece(position.x, position.y).image + ")";
        } else{
            piece = "url(Assets/" + game.board.getPiece(position.x, position.y).image + ")";
        }
    }
    if (fork !== "") {
        var backgroundPosition = "bottom right";
        if (dot !== "") {
            backgroundPosition = "center center, " + backgroundPosition;
        }
        if (piece !== "") {
            backgroundPosition += ", center center";
        }
        getTableData(position.x, position.y).css("background-position", backgroundPosition);
    }
    return dot + fork + piece;
}

function showSimpleSpaceControl() {
    var blackAttacks = game.getAllLegalAttacks("black");
    for (var i = 0; i < blackAttacks.length; i++) {
        getTableData(blackAttacks[i].x, blackAttacks[i].y).css("background-color", "lightpink");
    }
    var whiteAttacks = game.getAllLegalAttacks("white");
    for (var i = 0; i < whiteAttacks.length; i++) {
        if ($(getTableData(whiteAttacks[i].x, whiteAttacks[i].y)).css("background-color") == "rgb(255, 182, 193)" || $(getTableData(whiteAttacks[i].x, whiteAttacks[i].y)).css("background-color") == "rgb(204, 255, 51)") {
            getTableData(whiteAttacks[i].x, whiteAttacks[i].y).css("background-color", "#CCFF33");
        } else {
            getTableData(whiteAttacks[i].x, whiteAttacks[i].y).css("background-color", "lightgreen");
        }
    }
    
}

function calculateColor (scale) {
    // alert(scale);
    if (scale == 0) {
        return "#F0E68C";
    }
    else if (scale == 1) {
        return "#CCF5CC";
    }
    else if (scale == 2) {
        return "#99EB99"
    }
    else if (scale == 3) {
        return "#66E066"
    }
    else if (scale == 4) {
        return "#33D633"
    }
    else if (scale > 4) {
        return "#00CC00"
    }
    else if (scale == -1) {
        return "#FFCCCC";
    }
    else if (scale == -2) {
        return "#FF9999";
    }
    else if (scale == -3) {
        return "#FF6666";
    }
    else if (scale == -4) {
        return "#FF3333";
    }
    else if (scale < -4) {
        return "#FF0000";
    }
}

// send a message to the user
function messageUser(message, important) {
    if (message !== null) {
        var $messages = $('#messages');
        $messages.empty();
        var $p = $('<p>').text(message);
        if (important) $p.addClass('important');
        $messages.append($p);
        $p.fadeOut(7000, function() {
            $(this).remove();
        });
    }
}

function getBackgroundColor(x, y) {
    if ((x % 2 == 0 && y % 2 == 0) || (x % 2 !== 0 && y % 2 !== 0)) {
        return "white";
    } else {
        return "lightgrey";
    }
}

function occupied(x, y) {
    return game.board.getPiece(x, y);
}

function getTableData(x, y) {
    return $("#" + x + "-" + y);
}