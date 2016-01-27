/// <reference path="phaser.d.ts" />
/// <reference path="settings.ts" />
/// <reference path="circle.ts" />

class GameState extends Phaser.State {

    game: Phaser.Game;
    circles: Circle[][];
    mat : number[][];
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
        this.mat = [];
        for(var i =0; i < gameSettings.numRows; ++i){
            this.circles[i] = [];
            this.mat[i] = [];
            for(var j =0; j< gameSettings.numCols; ++j){
                this.circles[i][j] = null;
                this.mat[i][j] = -1;
            }
        }
    }

    update() {
       //game logic
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
        this.mat[toRow][col] = color;
    }
    
    getToRow(col : number){
        var toRow = gameSettings.numRows;
        for(var i = 0; i < gameSettings.numRows; ++i){
          if(this.mat[i][col] == -1){
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

