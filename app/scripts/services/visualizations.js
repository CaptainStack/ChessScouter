angular.module('ChessScouterApp')
    .factory('visualizations', function(forks, legalMoves, pieceFlair, pins, spaceControl) {
        return function(game, x, y) {
            // return visualizations for the piece located at (x, y) in the game

            return {
                forks: forks(game, x, y),
                pins: pins(game, x, y)
                // etc
            };
        }
    });