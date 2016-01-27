/// <reference path="phaser.d.ts" />
/// <reference path="settings.ts" />

class Circle {
    game : Phaser.Game
    x : number;
    y : number;
    i : number;
    j : number;
    radius : number;
    colorIndex : number;
    shape : Shape;
    sprite : Phaser.Sprite;
    touched : boolean;
    upCount : number;
    bmd : Phaser.BitmapData
    
    
    constructor (game :Phaser.Game, i : number, j : number, radius : number, colorIndex : number) {
        this.game = game;
        this.i = i;
        this.j = j;
        this.radius = radius;
        this.colorIndex = colorIndex;
        
        this.shape = Shape.Circle;
        this.touched = false;
        this.upCount = 0;
        
        this.x = this.j * 2 * this.radius;
        this.y = gameSettings.getH() - (this.i * 2 * this.radius) - 2 * this.radius;
    }
    
    makeSprite  () {
        this.bmd = this.game.add.bitmapData(this.radius*2, this.radius*2);
        if(this.colorIndex != -1){
            this.bmd.circle(this.radius, this.radius, this.radius-2, colors[this.colorIndex]);
        }
        
        this.sprite = this.game.add.sprite(this.x, 0 , this.bmd);
        this.sprite.inputEnabled = true;
        this.sprite.events.onInputDown.add(this.clicked, this);
        this.moveSprite(this.y);
        //this.sprite.alpha = 0;
        //this.game.add.tween(this.sprite).to({alpha:1}, 2000,"Linear",true);
    }
    
    moveSprite(toY : number){
        this.game.add.tween(this.sprite).to({y:toY},2000, "Linear",true);
    }
    
    changeRow(row : number){
        this.i = row;
        this.y = gameSettings.getH() - (this.i * 2 * this.radius) - 2 * this.radius;
        this.moveSprite(this.y);
    }
    
    
    clicked () {
        if(this.colorIndex == -1){
            return;
        }
        this.touched = true;
        this.upCount = 0;
        this.colorIndex = (this.colorIndex + 1) % colors.length;
        this.update();
    }
    
    update () {
        if(this.colorIndex == -1){
            //no need to draw circle, return
            return;
        }
        if(this.touched){
            this.upCount++;
            if(this.upCount > (gameSettings.tChange * 1000)/gameSettings.tColorUpdate){
                this.clicked();
            }
            else{
                var sectorAngle = ((this.upCount*gameSettings.tColorUpdate)/gameSettings.tChange)*0.360;
                this.bmd.clear();
                this.bmd.circle(this.radius, this.radius, this.radius-2, colors[this.colorIndex]);
                this.bmd.context.beginPath();
                this.bmd.context.strokeStyle = '#000000';
                this.bmd.context.fillStyle = colors[(this.colorIndex+1)%colors.length];
                this.bmd.context.moveTo(this.radius,this.radius);
                this.bmd.context.arc(this.radius,this.radius,this.radius-2,0,this.toRadians(sectorAngle));
                this.bmd.context.lineTo(this.radius,this.radius);
                this.bmd.context.fill();
                this.bmd.circle(this.radius, this.radius, this.radius -2 - this.radius/6, colors[this.colorIndex]);
                this.sprite.loadTexture(this.bmd);
            }
        }
    }
    
    remove () {
        this.sprite.destroy();
    }
    
    toRadians  (deg : number) {
        return deg * Math.PI / 180;
    }
}