/// <reference path="phaser.d.ts" />
/// <reference path="settings.ts" />
/// <reference path="circle.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GameState = (function (_super) {
    __extends(GameState, _super);
    function GameState() {
        _super.call(this);
        this.numOfCircles = 2;
        this.circles = [];
    }
    GameState.prototype.create = function () {
        this.initGame();
        this.game.time.events.loop(gameSettings.tColorUpdate, this.updateSprites, this);
    };
    GameState.prototype.initGame = function () {
        var radius = Math.floor(this.getMaxObjWidth() / 2);
        var c = -1;
        this.circles.length = 0;
        //initialize mat
        this.mat = [];
        for (var i = 0; i < gameSettings.numRows; ++i) {
            this.mat[i] = [];
            for (var j = 0; j < gameSettings.numCols; ++j) {
                this.mat[i][j] = -1;
            }
        }
        //add 2 rows randomly
        for (var i = 0; i < 2; ++i) {
            for (var j = 0; j < gameSettings.numCols; ++j) {
                var ctemp = new Circle(this.game, i, j, radius, (++c % colors.length));
                ctemp.makeSprite();
                this.circles.push(ctemp);
                this.mat[i][j] = ctemp.colorIndex;
            }
        }
    };
    GameState.prototype.update = function () {
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
    };
    GameState.prototype.updateSprites = function () {
        for (var i = 0; i < this.circles.length; ++i) {
            this.circles[i].update();
        }
    };
    GameState.prototype.getMaxObjWidth = function () {
        //as the number of objects increases the size should be changed accordingly
        var maxWidth = gameSettings.getW() / gameSettings.numCols;
        return maxWidth;
    };
    GameState.prototype.clearCircles = function () {
        for (var i = 0; i < this.circles.length; ++i) {
            this.circles[i].remove();
        }
        this.circles.length = 0;
    };
    return GameState;
})(Phaser.State);
