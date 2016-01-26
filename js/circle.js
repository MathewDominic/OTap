/// <reference path="phaser.d.ts" />
/// <reference path="settings.ts" />
var Circle = (function () {
    function Circle(game, i, j, radius, colorIndex) {
        this.game = game;
        this.i = i;
        this.j = j;
        this.radius = radius;
        this.colorIndex = colorIndex;
        this.shape = Shape.Circle;
        this.touched = false;
        this.upCount = 0;
        this.x = this.j * 2 * radius;
        this.y = gameSettings.getH() - (this.i * 2 * radius) - 2 * this.radius;
    }
    Circle.prototype.makeSprite = function () {
        this.bmd = this.game.add.bitmapData(this.radius * 2, this.radius * 2);
        this.bmd.circle(this.radius, this.radius, this.radius - 2, colors[this.colorIndex]);
        this.sprite = this.game.add.sprite(this.x, this.y, this.bmd);
        //this.sprite.alpha = 0;
        this.game.add.tween(this.sprite).to({ alpha: 1 }, 2000, "Linear", true);
        this.sprite.inputEnabled = true;
        this.sprite.events.onInputDown.add(this.clicked, this);
    };
    Circle.prototype.clicked = function () {
        this.touched = true;
        this.upCount = 0;
        this.colorIndex = (this.colorIndex + 1) % colors.length;
        this.update();
    };
    Circle.prototype.update = function () {
        if (this.touched) {
            this.upCount++;
            if (this.upCount > (gameSettings.tChange * 1000) / gameSettings.tColorUpdate) {
                this.clicked();
            }
            else {
                var sectorAngle = ((this.upCount * gameSettings.tColorUpdate) / gameSettings.tChange) * 0.360;
                this.bmd.clear();
                this.bmd.circle(this.radius, this.radius, this.radius - 2, colors[this.colorIndex]);
                this.bmd.context.beginPath();
                this.bmd.context.strokeStyle = '#000000';
                this.bmd.context.fillStyle = colors[(this.colorIndex + 1) % colors.length];
                this.bmd.context.moveTo(this.radius, this.radius);
                this.bmd.context.arc(this.radius, this.radius, this.radius - 2, 0, this.toRadians(sectorAngle));
                this.bmd.context.lineTo(this.radius, this.radius);
                this.bmd.context.fill();
                this.bmd.circle(this.radius, this.radius, this.radius - 2 - this.radius / 10, colors[this.colorIndex]);
                this.sprite.loadTexture(this.bmd);
            }
        }
    };
    Circle.prototype.remove = function () {
        this.sprite.destroy();
    };
    Circle.prototype.toRadians = function (deg) {
        return deg * Math.PI / 180;
    };
    return Circle;
})();
