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
    }
    GameState.prototype.create = function () {
        this.initGame();
        this.game.time.events.loop(gameSettings.tColorUpdate, this.updateSprites, this);
        this.game.time.events.loop(gameSettings.tNewCircle, this.newCircle, this);
    };
    GameState.prototype.initGame = function () {
        var radius = Math.floor(this.getMaxObjWidth() / 2);
        var c = -1;
        //initialize mat
        this.circles = [];
        for (var i = 0; i < gameSettings.numRows; ++i) {
            this.circles[i] = [];
            for (var j = 0; j < gameSettings.numCols; ++j) {
                this.circles[i][j] = new Circle(this.game, i, j, radius, -1);
            }
        }
        //add 2 rows randomly
        for (var i = 0; i < 2; ++i) {
            for (var j = 0; j < gameSettings.numCols; ++j) {
                this.circles[i][j].colorIndex = (++c % colors.length);
                this.circles[i][j].makeSprite();
            }
        }
    };
    GameState.prototype.update = function () {
        //see if all the circles have same color
        var colorToCheck = this.circles[0][0].colorIndex;
        var allSame = false;
        var speed;
        for (var i = 0; i < this.circles.length; ++i) {
        }
        if (allSame) {
            //level complete
            this.clearCircles();
            allSame = false;
            this.initGame();
        }
    };
    GameState.prototype.updateSprites = function () {
        for (var i = 0; i < gameSettings.numRows; ++i) {
            for (var j = 0; j < gameSettings.numCols; ++j) {
                this.circles[i][j].update();
            }
        }
    };
    GameState.prototype.newCircle = function () {
        var row = gameSettings.numRows - 1;
        var col = Math.floor(Math.random() * gameSettings.numCols);
        var toCol = this.getToRow(col);
    };
    GameState.prototype.getToRow = function (col) {
        var toRow = gameSettings.numRows - 1;
        for (var i = 0; i < gameSettings.numRows; ++i) {
        }
        return toRow;
    };
    GameState.prototype.getMaxObjWidth = function () {
        //as the number of objects increases the size should be changed accordingly
        var maxWidth = gameSettings.getW() / gameSettings.numCols;
        var maxHeight = gameSettings.getH() / gameSettings.numRows;
        return maxWidth > maxHeight ? maxHeight : maxWidth;
    };
    GameState.prototype.clearCircles = function () {
        for (var i = 0; i < gameSettings.numRows; ++i) {
            for (var j = 0; j < gameSettings.numCols; ++j) {
                this.circles[i][j].remove();
            }
        }
        this.circles.length = 0;
    };
    return GameState;
})(Phaser.State);
