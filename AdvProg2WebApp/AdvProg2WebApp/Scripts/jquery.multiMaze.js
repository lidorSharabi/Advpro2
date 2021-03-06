﻿/*
    *@description: responsible tho draw and clean maze canvas
 */

(function ($) {
    $.fn.mazeList = function (games) {
        var x = document.getElementById("games");
        x.options.length = 0;
        for (i = 0; i < games.length; i++) {
            var option = document.createElement("option");
            option.text = games[i];
            x.add(option);
        }
        return this;
    };

    $.fn.mazeBoard = function (hubCon, name, rows, cols, mazeData,
        startRow, startCol,
        exitRow, exitCol,
        playerImage,
        exitImage) {
        document.title = name;
        var myCanvas = this[0];
        var context = myCanvas.getContext("2d");
        var cellWidth = myCanvas.width / cols;
        var cellHeight = myCanvas.height / rows;
        var colPlayerPos = startCol;
        var rowPlayerPos = startRow;
        var counter = 0;
        var indexInMaze = 0;

        clearCanvas();
        drawMaze();
        addKeyboardListener();

        /*
        *@description: clear all the canvas
        */
        function clearCanvas() {
            context.clearRect(0, 0, myCanvas.width, myCanvas.height);
        }

        /*
        *@description: draw the maze on the canvas
        */
        function drawMaze() {
            for (var i = 0; i < rows; i++) {
                for (var j = 0; j < cols; j++) {
                    if (mazeData[counter] === '1') {
                        context.fillRect(cellWidth * j, cellHeight * i, cellWidth, cellHeight);
                    }
                    if (i === startRow && j === startCol) {
                        playerImage.onload = function () {
                            context.drawImage(playerImage, cellWidth * startCol, cellHeight * startRow, cellWidth, cellHeight);
                        };
                        indexInMaze = counter;
                    }
                    if (i === exitRow && j === exitCol) {
                        exitImage.onload = function () {
                            context.drawImage(exitImage, cellWidth * exitCol, cellHeight * exitRow, cellWidth, cellHeight);
                        };
                    }
                    counter++;
                }
            }
        }

        /*
        *@description: move user right/left/up/down and check if he wons
        */
        function moveSelection(e) {
            switch (e.keyCode) {
                case 37:
                    if ((colPlayerPos - 1) >= 0 && mazeData[indexInMaze - 1] === '0') {
                        clearPlayer();
                        colPlayerPos -= 1;
                        indexInMaze -= 1;
                        drawPlayer();
                        hubCon.server.playMove(name, "left");
                    }
                    checkIfWon();
                    break;
                case 39:
                    if ((colPlayerPos + 1) < cols && mazeData[indexInMaze + 1] === '0') {
                        clearPlayer();
                        colPlayerPos += 1;
                        indexInMaze += 1;
                        drawPlayer();
                        hubCon.server.playMove(name, "right");
                    }
                    checkIfWon();
                    break;
                case 38:
                    if ((rowPlayerPos - 1) >= 0 && mazeData[indexInMaze - cols] === '0') {
                        clearPlayer();
                        rowPlayerPos -= 1;
                        indexInMaze -= cols;
                        drawPlayer();
                        hubCon.server.playMove(name, "up");
                    }
                    checkIfWon();
                    break;
                case 40:
                    if ((rowPlayerPos + 1) < rows && mazeData[indexInMaze + cols] === '0') {
                        clearPlayer();
                        rowPlayerPos += 1;
                        indexInMaze += cols;
                        drawPlayer();
                        hubCon.server.playMove(name, "down");
                    }
                    checkIfWon();
                    break;
            }
        }

        /*
        *@description: remove player image from canvas
        */
        function clearPlayer() {
            context.clearRect(colPlayerPos * cellWidth, rowPlayerPos * cellHeight, cellWidth, cellHeight);
        }

        /*
        *@description: draw user image on vanvas
        */
        function drawPlayer() {
            context.drawImage(playerImage, colPlayerPos * cellWidth, rowPlayerPos * cellHeight, cellWidth, cellHeight);
        }

        /*
        *@description: chaeck if the user won,
        *in case he does show won image
        */
        function checkIfWon() {
            if (colPlayerPos === exitCol && rowPlayerPos === exitRow) {
                context.clearRect(0, 0, myCanvas.width, myCanvas.height);
                var winning_image = new Image();
                winning_image.src = "Images/Image.png";
                winning_image.onload = function () {
                    context.drawImage(winning_image, 100, 150, myCanvas.width - 200, myCanvas.height - 200);
                };
                context.font = "32px Arial";
                context.fillText("You Won!", 75, 100);
                //call http request to add current user one victory
                var usersUrl = "api/Users/";
                var userName = sessionStorage.getItem('userName');
                var user = {
                    UserNameId: 0,
                    Losses: 0,
                    Victories: 0,
                    MailAddress: 0,
                    Password: 0
                };
                //get the user detials and add to him one victory
                $.get(usersUrl, { id: userName }).done(function (data) {
                    user.UserNameId = data.UserNameId;
                    user.Losses = data.Losses;
                    user.Victories = data.Victories + 1;
                    user.MailAddress = data.MailAddress;
                    user.Password = data.Password;
                    /*
                    *add user one victory
                    *save the updated details of the user in DB
                    */
                    $.post(usersUrl + "Update", user).done(function (data) {
                        document.getElementById("cd-user-modal").classList.remove('is-visible');
                    }).fail(function (response) {
                        alert('Something went worng with server...');
                    });

                }).fail(function (response) {
                    alert('Something went worng with server...');
                });
                removeKeyboardListener();
                hubCon.server.endOfGame(name);
            }
        }

        /*
        *@description: remove keyboard listener for maze movement
        */
        function removeKeyboardListener() {
            myCanvas.onkeydown = null;
        }

        /*
        *@description: add keyboard listener for maze movement
        */
        function addKeyboardListener() {
            myCanvas.onkeydown = moveSelection.bind(this);
        }

        return this;
    };

    $.fn.opponentMazeBoard = function (name, rows, cols, mazeData,
        startRow, startCol,
        exitRow, exitCol,
        oplayerImage,
        oexitImage) {
        var myCanvas = this[0];
        var context = myCanvas.getContext("2d");
        var cellWidth = myCanvas.width / cols;
        var cellHeight = myCanvas.height / rows;
        var colPlayerPos = startCol;
        var rowPlayerPos = startRow;
        var counter = 0;
        var indexInMaze = 0;

        clearCanvas();
        drawMaze();

        function clearCanvas() {
            context.clearRect(0, 0, myCanvas.width, myCanvas.height);
        }

        /*
        *@description: draw maze on canvas
        */
        function drawMaze() {
            for (var i = 0; i < rows; i++) {
                for (var j = 0; j < cols; j++) {
                    if (mazeData[counter] === '1') {
                        context.fillRect(cellWidth * j, cellHeight * i, cellWidth, cellHeight);
                    }
                    if (i === startRow && j === startCol) {

                        indexInMaze = counter;
                    }
                    counter++;
                }
            }
        }
        oplayerImage.onload = function () {
            context.drawImage(oplayerImage, cellWidth * startCol, cellHeight * startRow, cellWidth, cellHeight);
        };
        oexitImage.onload = function () {
            context.drawImage(oexitImage, cellWidth * exitCol, cellHeight * exitRow, cellWidth, cellHeight);
        };

        /*
        *@description: move user left
        */
        $.fn.moveLeft = function () {
            clearPlayer();
            colPlayerPos -= 1;
            indexInMaze -= 1;
            drawPlayer();
            return this;
        };

        /*
        *@description: move user right
        */
        $.fn.moveRight = function () {
            clearPlayer();
            colPlayerPos += 1;
            indexInMaze += 1;
            drawPlayer();
            return this;
        };

        /*
        *@description: move user up
        */
        $.fn.moveUp = function () {
            clearPlayer();
            rowPlayerPos -= 1;
            indexInMaze -= cols;
            drawPlayer();
            return this;
        };

        /*
        *@description: move user down
        */
        $.fn.moveDown = function () {
            clearPlayer();
            rowPlayerPos += 1;
            indexInMaze += cols;
            drawPlayer();
            return this;
        };

         /*
        *@description: remove player image from canvas
        */
        function clearPlayer() {
            context.clearRect(colPlayerPos * cellWidth, rowPlayerPos * cellHeight, cellWidth, cellHeight);
        }

        /*
        *@description: draw user image on vanvas
        */
        function drawPlayer() {
            context.drawImage(oplayerImage, colPlayerPos * cellWidth, rowPlayerPos * cellHeight, cellWidth, cellHeight);
        }

        return this;
    };

})(jQuery);