/// <reference path="phaser.d.ts" />
/// <reference path="settings.ts" />

class MenuState extends Phaser.State {
    
    game : Phaser.Game;
    playSprite : Phaser.Sprite;
    radius : number;
   
    constructor(){
        super();  
        this.radius = gameSettings.getW()/5;
    }
    
    create () {
        var bmd = this.game.add.bitmapData(this.radius*2, this.radius*2);
        bmd.circle(this.radius, this.radius, this.radius, "#EA4335");
        
        this.playSprite = this.game.add.sprite(gameSettings.getW()/2 - this.radius, gameSettings.getH()/2 - this.radius, bmd);
        //this.sprite.alpha = 0;
        //this.game.add.tween(this.playSprite).to({alpha:1}, 2000,"Linear",true);
        this.playSprite.inputEnabled = true;
        this.playSprite.events.onInputDown.add(this.clicked, this);
    }
    
    clicked (){
        this.game.state.start("GameState", true);
    }
}