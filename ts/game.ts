/// <reference path="phaser.d.ts" />
/// <reference path="settings.ts" />
/// <reference path="circle.ts" />
/// <reference path="MenuState.ts" />
/// <reference path="GameState.ts" />

class Game{
    game : Phaser.Game;
    constructor(){

        
        //update num rows
        
        this.game = new Phaser.Game(gameSettings.getW(),gameSettings.getH(),Phaser.AUTO,'', {create : this.create});
    }
    
    create(){
        this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.game.physics.startSystem(Phaser.Physics.P2JS);
        this.game.stage.backgroundColor = '#000000';

        this.game.state.add("MenuState", MenuState, true);
        this.game.state.add("GameState", GameState, false);
    }
}

window.onload = () => {
    var game = new Game();
}