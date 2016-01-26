/// <reference path="phaser.d.ts" />
/// <reference path="settings.ts" />
/// <reference path="circle.ts" />

class GameState extends Phaser.State {

    game: Phaser.Game;
    numOfCircles: number;
    circles: Circle[];
    mat : number[][];
    
    constructor() {
        super();
        
        this.numOfCircles = 2;
        this.circles = [];
    }

    create() {
        this.initGame();
        this.game.time.events.loop(gameSettings.tColorUpdate, this.updateSprites, this);
    }

    initGame() {
        var radius = Math.floor(this.getMaxObjWidth() / 2);
        var c = -1;
        this.circles.length = 0;
        //initialize mat
        this.mat = [];
        for(var i =0; i < gameSettings.numRows; ++i){
            this.mat[i] = [];
            for(var j =0; j< gameSettings.numCols; ++j){
                this.mat[i][j] = -1;
            }
        }
        
        //add 2 rows randomly
        for (var i = 0; i < 2 ; ++i) {
            for(var j = 0; j < gameSettings.numCols; ++j){
                var ctemp = new Circle(this.game,i,j,radius,(++c % colors.length));
                ctemp.makeSprite();
                this.circles.push(ctemp);
                this.mat[i][j] = ctemp.colorIndex;
            }
        }
    }

    update() {
        //see if all the circles have same color
        var colorToCheck = this.circles[0].colorIndex;
        var allSame = true;
        var speed;
        for (var i = 0; i < this.circles.length; ++i) {
            //change game logic here
            if (this.circles[i].colorIndex != colorToCheck) {
                allSame = false;
            }
        }

        if (allSame) {
            //level complete
            this.clearCircles();
            this.numOfCircles++;
            allSame = false;
            this.initGame();
        }
    }

    updateSprites() {
        for (var i = 0; i < this.circles.length; ++i) {
            this.circles[i].update();
        }
    }

    getMaxObjWidth() {
        //as the number of objects increases the size should be changed accordingly
        var maxWidth = gameSettings.getW() / gameSettings.numCols;
        return maxWidth;
    }

    clearCircles() {
        for (var i = 0; i < this.circles.length; ++i) {
            this.circles[i].remove();
        }
        this.circles.length = 0;
    }
}

