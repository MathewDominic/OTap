/// <reference path="phaser.d.ts" />
/// <reference path="settings.ts" />
/// <reference path="circle.ts" />

class GameState extends Phaser.State {

    game: Phaser.Game;
    circles: Circle[][];
    
    constructor() {
        super();
    }

    create() {
        this.initGame();
        this.game.time.events.loop(gameSettings.tColorUpdate, this.updateSprites, this);
        this.game.time.events.loop(gameSettings.tNewCircle, this.newCircle, this);
    }

    initGame() {
        var radius = Math.floor(this.getMaxObjWidth() / 2);
        var c = -1;
        //initialize mat
        this.circles = [];
        for(var i =0; i < gameSettings.numRows; ++i){
            this.circles[i] = [];
            for(var j =0; j< gameSettings.numCols; ++j){
                this.circles[i][j] = new Circle(this.game, i,j,radius,-1);
            }
        }
        
        //add 2 rows randomly
        for (var i = 0; i < 2 ; ++i) {
            for(var j = 0; j < gameSettings.numCols; ++j){
                this.circles[i][j].colorIndex = (++c % colors.length);
                this.circles[i][j].makeSprite();
            }
        }
    }

    update() {
        //see if all the circles have same color
        var colorToCheck = this.circles[0][0].colorIndex;
        var allSame = false;
        var speed;
        for (var i = 0; i < this.circles.length; ++i) {
            //change game logic here
            //if (this.circles[i].colorIndex != colorToCheck) {
              //  allSame = false;
           // }
        }

        if (allSame) {
            //level complete
            this.clearCircles();
            allSame = false;
            this.initGame();
        }
    }

    updateSprites() {
        for (var i = 0; i < gameSettings.numRows; ++i) {
            for(var j =0; j < gameSettings.numCols; ++j){
                this.circles[i][j].update();
            }
        }
    }
    
    newCircle() {
        var row = gameSettings.numRows-1;
        var col = Math.floor(Math.random() * gameSettings.numCols);
        var toCol = this.getToRow(col);
    }
    
    getToRow(col : number){
        var toRow = gameSettings.numRows - 1;
        for(var i = 0; i < gameSettings.numRows; ++i){
          
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
                this.circles[i][j].remove();
            }            
        }
        this.circles.length = 0;
    }
}

