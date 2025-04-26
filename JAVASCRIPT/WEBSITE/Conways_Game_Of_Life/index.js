//Conway Game of Life//

//Apareance and behabeour of a single cell//

class Cell{
    //Defaulto size and color for each cell
    static width = 10;
    static height = 10;
    static colorAlive = '#ff8080'
    static colorDead = '#303030'

    constructor (contex, gridX, gridY)
    {
        this.contex = context;

        //Store the posotopm of this cell in the grid
        this.gridX = gridX;
        this.gridY = gridY;

        //Make random cell alive.
        this.isAlive = Math.random() > 0.5;
    }

    draw(){
        //Draw a square, let the state determine color
        this.contex.fillStyle = this.isAlive ? Cell.colorAlive : Cell.colorDead;
        this.contex.fillRect(this.gridX * Cell.width, this.gridY * Cell.height, Cell.width, Cell.height);
    }
}

class GameWorld {
    static  numColums = 75;
    static  numRows = 40;

    constructor(canvasId){
        this.canvas
    }




}

//Build a grid with a lot of cells

this.gameObjects = [];

createGrid()
{
    for (let y=0; y < GameWorld.numRows; y++){
        for (let x=0; x < GameWorld.numColums; x++){
            this.gameObjects.push(new Cell (this.contex, x ,y));
        }
    }
}

//Add game lop
window.requestAnimationFrame(() => this.gameLoop());

gameLoop()
{
    //Chec the surroundings of each cell and update the state
    this.updateCells();

    //Clear screen.
    this.contex.clearRect(0, 0, this.canvas.width, this.canvas.heigth);

    //Draw all gameobjects
    this.gameObjects.forEach((gameObject) => {
        gameObject.draw()
    });

    //The loop function has reached it's end, keep requesting new frames
    setTimeout ( () => {
        Window.requestAnimationFrame(() => this.gameLoop());
    }, 100);
}


