/// <reference path="phaser.d.ts" />
/// <reference path="settings.ts" />
/// <reference path="circle.ts" />
/// <reference path="MenuState.ts" />
/// <reference path="GameState.ts" />
var Game = (function () {
    function Game() {
        //update num rows
        this.game = new Phaser.Game(gameSettings.getW(), gameSettings.getH(), Phaser.AUTO, '', { create: this.create });
    }
    Game.prototype.create = function () {
        this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.game.physics.startSystem(Phaser.Physics.P2JS);
        this.game.stage.backgroundColor = '#000000';
        this.game.state.add("MenuState", MenuState, true);
        this.game.state.add("GameState", GameState, false);
    };
    return Game;
})();
window.onload = function () {
    var game = new Game();
};
