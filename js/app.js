
$(document).ready(function() {
    var timer;
    var defaultMenu = document.getElementById('game-board').innerHTML;
    createBoard();

    $('section button').click(function() {
        $('#winner').hide();
        createBoard();
        window.clearInterval(timer);
        var matches = 0;
        var missed = 0;
        var remaining = 8;
        var clickedTiles = [];
        var clickedIMGs = [];
        var clickable = true;
        var startTime = _.now();
        timer = window.setInterval(function () {
            var elapsedSeconds = Math.floor((_.now() - startTime) / 1000);
            $('#elapsed-seconds').text('Timer: ' + elapsedSeconds);
        }, 1000);
            $('#game-board img').click(function () {
                if (clickable) {
                    var img = $(this);
                    var tile = img.data('tile');

                    //console.log(img.attr('src'));

                    if (img.attr('src') == 'img/tile-back.png') {
                        if (clickedTiles.length < 2) {
                            clickedTiles.push(tile);
                            clickedIMGs.push(img);
                        }
                        console.log(clickedTiles);
                        flipImage(img, tile.src);

                        if (clickedTiles.length == 2) {
                            clickable = !clickable;
                            window.setTimeout(function () {
                                if (clickedTiles[0].tileNum == clickedTiles[1].tileNum) {
                                    matches++;
                                    remaining--;
                                    $('#matches').text('Matches: ' + matches);
                                    $('#remaining').text('Remaining ' + remaining);
                                    if (matches == 8) {
                                        window.clearInterval(timer);
                                        $('#winner').show();
                                    }
                                } else {
                                    missed++;
                                    $('#missed').text('Missed: ' + missed);
                                    flipImage(clickedIMGs[0], 'img/tile-back.png');
                                    flipImage(clickedIMGs[1], 'img/tile-back.png');
                                }
                                clickedTiles = [];
                                clickedIMGs = [];
                                clickable = !clickable;
                            }, 1000);
                        }
                    }

                }
            });// onclick of gameboard images

    });
    function createBoard() {
        document.getElementById('game-board').innerHTML = defaultMenu;
        var tiles = [];
        var idx;
        for(idx = 1; idx <= 32; ++idx) {
            tiles.push({
                tileNum: idx,
                src: 'img/tile' + idx + '.jpg'
            });
        }

        console.log(tiles);
        var shuffledTiles = _.shuffle(tiles);
        console.log(shuffledTiles);

        var selectedTiles = shuffledTiles.slice(0, 8);
        console.log(selectedTiles);

        var tilePairs = [];
        _.forEach(selectedTiles, function(tile) {
            tilePairs.push(_.clone(tile));
            tilePairs.push(_.clone(tile));
        });

        tilePairs = _.shuffle(tilePairs);

        console.log(tilePairs);
        var gameBoard = $('#game-board');
        var row = $(document.createElement('div'));
        var img;
        _.forEach(tilePairs, function(tile, elemIndex) {
            if (elemIndex > 0 && 0 == elemIndex % 4) {
                gameBoard.append(row);
                row = $(document.createElement('div'));
            }
            img = $(document.createElement('img'));
            img.attr({
                src: 'img/tile-back.png',
                alt: 'image of tile ' + tile.tileNum
            });
            img.data('tile', tile);
            row.append(img);
        });
        gameBoard.append(row);
    }

    function flipImage(img, source) {
        img.fadeOut(100, function () {
            img.attr('src', source);
            img.fadeIn(100);
        }); //after fadeOut
    }
}); //jQuery Ready Function

