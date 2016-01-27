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
        this.radius = Math.floor(this.getMaxObjWidth() / 2);
        var c = -1;
        //initialize mat
        this.circles = [];
        this.mat = [];
        for (var i = 0; i < gameSettings.numRows; ++i) {
            this.circles[i] = [];
            this.mat[i] = [];
            for (var j = 0; j < gameSettings.numCols; ++j) {
                this.circles[i][j] = null;
                this.mat[i][j] = -1;
            }
        }
    };
    GameState.prototype.update = function () {
        //game logic
    };
    GameState.prototype.updateSprites = function () {
        for (var i = 0; i < gameSettings.numRows; ++i) {
            for (var j = 0; j < gameSettings.numCols; ++j) {
                if (this.circles[i][j] != null) {
                    this.circles[i][j].update();
                }
            }
        }
    };
    GameState.prototype.newCircle = function () {
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
        this.mat[toRow][col] = color;
    };
    GameState.prototype.getToRow = function (col) {
        var toRow = gameSettings.numRows;
        for (var i = 0; i < gameSettings.numRows; ++i) {
            if (this.mat[i][col] == -1) {
                //we got an empty cell
                toRow = i;
                break;
            }
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
                if (this.circles[i][j] != null) {
                    this.circles[i][j].remove();
                }
            }
        }
        this.circles.length = 0;
    };
    return GameState;
})(Phaser.State);
