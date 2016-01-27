/// <reference path="phaser.d.ts" />
/// <reference path="settings.ts" />
/// <reference path="circle.ts" />

class GameState extends Phaser.State {

    game: Phaser.Game;
    circles: Circle[][];
    radius : number;
    
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
        for(var i =0; i < gameSettings.numRows; ++i){
            this.circles[i] = [];
            for(var j =0; j< gameSettings.numCols; ++j){
                this.circles[i][j] = null;
            }
        }
    }

    update() {
       //game logic
       //for all the possible winning combinations, pass the [i,j] of circle removed to removeCircle
       //ie., removeCircle(i,j);
       
       //after removing all
       this.checkAndMoveCircles();
    }
    
    removeCircle(i : number, j : number){
        //remove the circle
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
            for(var j =0; j < gameSettings.numCols; ++j){
                if(this.circles[i][j] != null){
                    this.circles[i][j].update();   
                }
            }
        }
    }
    
    newCircle() {
        var color = Math.floor(Math.random() * colors.length);
        var row = gameSettings.numRows-1;
        var col = Math.floor(Math.random() * gameSettings.numCols);
        var toRow = this.getToRow(col);
        if(toRow == gameSettings.numRows){
            //game over code
            return;
        }
        var newCirc = new Circle(this.game, toRow, col, this.radius,color);
        newCirc.makeSprite();
        this.circles[toRow][col] = newCirc;
    }
    
    getToRow(col : number){
        var toRow = gameSettings.numRows;
        for(var i = 0; i < gameSettings.numRows; ++i){
          if(this.circles[i][col] == null){
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
            for( var j = 0; j < gameSettings.numCols; ++j){
                if(this.circles[i][j] != null ){
                  this.circles[i][j].remove();   
                }
            }            
        }
        this.circles.length = 0;
    }
}

