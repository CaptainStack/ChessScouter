<!DOCTYPE html>
<html>
    <head>
        <title>Chess Scouter</title>
        <link href="http://webster.cs.washington.edu/astack/Chess%20Scouter/icon.gif" type="image/gif" rel="shortcut icon" />
		<meta name="description" content="a visual way to learn chess strategy" />
		<meta charset="utf-8" />
        
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js" type="text/javascript"></script>
        
        <script src="Js/Square.js" type="text/javascript"></script>
        <script src="Js/Position.js" type="text/javascript"></script>
        <script src="Js/Piece.js" type="text/javascript"></script> 
		
        <script src="Js/Knight.js" type="text/javascript"></script>
        <script src="Js/Pawn.js" type="text/javascript"></script>
        <script src="Js/King.js" type="text/javascript"></script>
        <script src="Js/Rook.js" type="text/javascript"></script>
        <script src="Js/Queen.js" type="text/javascript"></script>
        <script src="Js/Bishop.js" type="text/javascript"></script>
		
        <script src="Js/Board.js" type="text/javascript"></script>
        <script src="Js/Game.js" type="text/javascript"></script>
        <script src="Js/UI.js" type="text/javascript"></script>  
        <script src="Js/Fen.js" type="text/javascript"></script>     		
                   		
                
        <link href="Style.css" type="text/css" rel="stylesheet" />
    </head>
    <body>
        <h1>Chess Scouter</h1>
        <h2 id="turnSpace"></h2> 
        <div id="moveHistory">
            <h3>Move History <button id="pgn">PGN</button></h3>
            <ol id="moveList">
            </ol>
        </div>
        <div id="gameSpace">
            <table>
                <tbody id="board">
                </tbody>
    
                    <div id="promotion">
                        <p>What would you like to promote your pawn to?</p> 
                        <select id="promotionOptions">
                            <option value="Queen">Queen</option>
                            <option value="Rook">Rook</option>
                            <option value="Bishop">Bishop</option>
                            <option value="Knight">Knight</option>
                        </select>
                        <input type="submit" id="submit">
                    </div>
                    <tr id="rowLabel">
                        <th></th>
                        <th class="gridLabel">a</th>
                        <th class="gridLabel">b</th>
                        <th class="gridLabel">c</th>
                        <th class="gridLabel">d</th>
                        <th class="gridLabel">e</th>
                        <th class="gridLabel">f</th>
                        <th class="gridLabel">g</th>
                        <th class="gridLabel">h</th>
                    </tr>
            </table>
        </div>
        <div id="filters">
            <h3>Visualizations</h3>
            <p><label><input id="space" type="checkbox" checked="checked">Space Control</label><label class="help"> [?]</label></p>
            <p><label><input id="legalMoves" type="checkbox" checked="checked">Legal Moves</label><label class="help"> [?]</label></p>
            <p><label><input id="pieceFlair" type="checkbox" checked="checked">Piece Flair</label><label class="help"> [?]</label></p>
            <p><label><input id="forks" type="checkbox" checked="checked">Forks</label><label class="help"> [?]</label></p>
            <p><label><input id="pins" type="checkbox" checked="checked">Pins</label><label class="help"> [?]</label></p>
        </div>

        <!-- Messages to the user go here, -->
        <div id="messages">
            
        </div>
        <footer>
            <p>More details <a href="https://skydrive.live.com/redir?resid=666E5F71337212EE!49641&authkey=!AINMLdzODOMEjoE">here</a> </p>
            <p>Project Poster <a href="poster.pdf">here</a> </p>
            <p>View code on <a href="https://github.com/CaptainStack/ChessScouter">GitHub</a>
            <p>Send feedback to ChessScouter@outlook.com </p>
        </footer>
    </body>
</html>
