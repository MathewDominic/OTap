/// <reference path="phaser.d.ts" />
/// <reference path="settings.ts" />
/// <reference path="circle.ts" />

class GameState extends Phaser.State {

    game: Phaser.Game;
    circles: Circle[][];
    radius: number;

    constructor() {
        super();
    }

    create() {
        this.initGame();
        this.game.time.events.loop(gameSettings.tColorUpdate, this.updateSprites, this);
        this.game.time.events.loop(gameSettings.tNewCircle, this.newCircle, this);
    }

    initGame() {
        this.radius = Math.floor(this.getMaxObjWidth() / 2);
        var c = -1;
        //initialize mat
        this.circles = [];
        for (var i = 0; i < gameSettings.numRows; ++i) {
            this.circles[i] = [];
            for (var j = 0; j < gameSettings.numCols; ++j) {
                this.circles[i][j] = null;
            }
        }
    }

    update() {
<<<<<<< HEAD
       //game logic
       //for all the possible winning combinations, pass the [i,j] of circle removed to removeCircle
       //ie., removeCircle(i,j);
       for(var i =0; i < gameSettings.numRows; ++i)
       {

=======
        //game logic
        //for all the possible winning combinations, pass the [i,j] of circle removed to removeCircle
        //ie., removeCircle(i,j);
       
        for (var i = 0; i < gameSettings.numRows; ++i) {
>>>>>>> 4619527391186dacc51c513b4e49583ce338c295
            for(var j =0; j< gameSettings.numCols; ++j)
            {
                if(this.circles[i][j])
                    console.log(i + " " + j + " " +this.circles[i][j].colorIndex)
            }
       } 
       console.log("t");
                
       for(var i =0; i < gameSettings.numRows; ++i)
       {

            for(var j =0; j< gameSettings.numCols; ++j)
            {
                if(this.circles[i][j]!=null && this.circles[i][j+1]!=null && this.circles[i][j+2]!=null)
                {
                    if(this.circles[i][j].colorIndex==this.circles[i][j+1].colorIndex && this.circles[i][j+2].colorIndex==this.circles[i][j+1].colorIndex)
                    {
                            if(this.circles[i][j+3])
                            {
                                if(this.circles[i][j+3].colorIndex=this.circles[i][j].colorIndex)
                                    for(var k=0;k<gameSettings.numCols;k++)
                                    {
                                        if(this.circles[i][k])
                                            this.removeCircle(i,k);
                                    }
                            }
                            else
                            {
                                this.removeCircle(i,j);
                                this.removeCircle(i,j+1);
                                this.removeCircle(i,j+2);
                            }
                        //console.log("hori" + i + " " + j);
                        //if(this.circles[i][j])
                        //console.log(this.circles[i][j].colorIndex);
                        //console.log(this.circles[i][j+1].colorIndex);
                    }
                }
                if(this.circles[i][j]!=null && this.circles[i+1][j]!=null && this.circles[i+2][j]!=null)
                {
                if(this.circles[i][j].colorIndex==this.circles[i+1][j].colorIndex && this.circles[i+2][j].colorIndex==this.circles[i+1][j].colorIndex)
                {
                        this.removeCircle(i,j);
                        this.removeCircle(i+1,j);
                        this.removeCircle(i+2,j);
                    //console.log("verti" + i + " " + j);
                    //if(this.circles[i][j])
                      //  console.log(this.circles[i][j].colorIndex);
                    //console.log(this.circles[i+1][j].colorIndex);
                }
                }
            }
        }
            
       
        //after removing all
        this.checkAndMoveCircles();
    }

    removeCircle(i: number, j: number) {
        //remove the circle
        console.log("test" + i + " " + j);
        this.circles[i][j].remove();
        this.circles[i][j] = null;
        //update circles abouve accordingly :  will be done every frame by checkAndMoveCircles
    }

    checkAndMoveCircles() {
        //from 2nd row check if the circle can be moved down
        for (var i = 1; i < gameSettings.numRows; ++i) {
            for (var j = 0; j < gameSettings.numCols; ++j) {
                if (this.circles[i][j] != null) {
                    if (this.circles[i - 1][j] == null) {
                        this.circles[i][j].changeRow(i - 1);
                        this.circles[i - 1][j] = this.circles[i][j];
                        this.circles[i][j] = null;
                    }
                }
            }
        }
    }

    updateSprites() {
        for (var i = 0; i < gameSettings.numRows; ++i) {
            for (var j = 0; j < gameSettings.numCols; ++j) {
                if (this.circles[i][j] != null) {
                    this.circles[i][j].update();
                }
            }
        }
    }

    newCircle() {
        var color = Math.floor(Math.random() * colors.length);
        var row = gameSettings.numRows - 1;
        var col = Math.floor(Math.random() * gameSettings.numCols);
        var toRow = this.getToRow(col);
        if (toRow == gameSettings.numRows) {
            //game over code
            return;
        }
        var newCirc = new Circle(this.game, toRow, col, this.radius, color);
        newCirc.makeSprite();
        this.circles[toRow][col] = newCirc;
    }

    getToRow(col: number) {
        var toRow = gameSettings.numRows;
        for (var i = 0; i < gameSettings.numRows; ++i) {
            if (this.circles[i][col] == null) {
                //we got an empty cell
                toRow = i;
                break;
            }
        }
        return toRow;
    }

    getMaxObjWidth() {
        //as the number of objects increases the size should be changed accordingly
        var maxWidth = gameSettings.getW() / gameSettings.numCols;
        var maxHeight = gameSettings.getH() / gameSettings.numRows;
        return maxWidth > maxHeight ? maxHeight : maxWidth;
    }

    clearCircles() {
        for (var i = 0; i < gameSettings.numRows; ++i) {
            for (var j = 0; j < gameSettings.numCols; ++j) {
                if (this.circles[i][j] != null) {
                    this.circles[i][j].remove();
                }
            }
        }
        this.circles.length = 0;
    }
}

