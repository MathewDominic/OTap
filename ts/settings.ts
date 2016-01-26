var colors : string[] = ['#669BF2','#EA4335','#FBBC05','#34A853'];
enum Shape { Circle, Square};
class GameSettings {
    
    public  maxObjs : number = 50;
    public  tChange : number = 5;
    public  tColorUpdate : number = 200;
    public  gWidht : number = 400;
    public  hHeight : number = 600;
    public  numRows : number = 10;
    public  numCols : number = 5;
    
    newWidth : number;
    newHeight : number;
    
    
    constructor() {
       
        var targetWidth: number = 480; // the width of the game we want
        var targetHeight: number = 720;
        var deviceRatio: number = (window.innerWidth / window.innerHeight);
        var newRatio: number = (targetHeight / targetWidth) * deviceRatio;

        this.newWidth = targetWidth * newRatio;
        this.newHeight = targetHeight;
        
        //for dev 
        this.newWidth = this.gWidht;
        this.newHeight = this.hHeight;
    }
    
    public getW() {
        return this.newWidth;
    }
    
    public getH(){
        return this.newWidth;
    }   
};

var gameSettings = new GameSettings();