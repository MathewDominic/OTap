var colors = ['#669BF2', '#EA4335', '#FBBC05', '#34A853'];
var Shape;
(function (Shape) {
    Shape[Shape["Circle"] = 0] = "Circle";
    Shape[Shape["Square"] = 1] = "Square";
})(Shape || (Shape = {}));
;
var GameSettings = (function () {
    function GameSettings() {
        this.maxObjs = 50;
        this.tChange = 5;
        this.tColorUpdate = 200;
        this.tNewCircle = 1000;
        this.gWidht = 400;
        this.hHeight = 600;
        this.numRows = 10;
        this.numCols = 10;
        var targetWidth = 480; // the width of the game we want
        var targetHeight = 720;
        var deviceRatio = (window.innerWidth / window.innerHeight);
        var newRatio = (targetHeight / targetWidth) * deviceRatio;
        this.newWidth = targetWidth * newRatio;
        this.newHeight = targetHeight;
        //for dev 
        this.newWidth = this.gWidht;
        this.newHeight = this.hHeight;
    }
    GameSettings.prototype.getW = function () {
        return this.newWidth;
    };
    GameSettings.prototype.getH = function () {
        return this.newWidth;
    };
    return GameSettings;
})();
;
var gameSettings = new GameSettings();
