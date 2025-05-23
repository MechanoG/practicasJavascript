/*List of things to do
-Make the draggeable elements react to a funcion from the body
-Make the function, to be able to drag any draggeable element 
on the screem.
*/
//--Proyecto: Colocar las figuras correstas en su posicion

//Se inicician los canvas de las figuras iniciales
//Circulo, Cuadrado, Triangulo, Corazon Estrella Cruzz
const greyCircle = document.getElementById("greyCircle");
const greySquare = document.getElementById("greySquare");
const greyTriangle = document.getElementById("greyTriangle");
const greyHeart = document.getElementById("greyHeart");
const greyStar = document.getElementById("greyStar");
const greyCross = document.getElementById("greyCross");

//Funcion para crear nuevas piezas
function createPiece(idName){
    const newPiece = document.createElement('canvas');
    newPiece.width = 125;
    newPiece.height = 125;
    newPiece.setAttribute('id', idName);
    newPiece.style.position = "absolute";
    newPiece.style.left =Math.floor(Math.random() * (document.documentElement.clientWidth-newPiece.width + 1))+"px";
    newPiece.style.top =Math.floor(Math.random() * (document.documentElement.clientHeight-newPiece.height +1))+"px";
    
    newPiece.addEventListener('click', (event) =>{
        //Se toma el evento que se clickea
        const target = event.target;
        alert(target.id);
        
    })

    return newPiece;
}

//Se crean los elementos que seran arrastrables por la pantalla
const dragCircle = createPiece('dragCircle');
const dragSquare = createPiece('dragSquare');
const dragTriangle = createPiece('dragTriangle');
const dragHeart = createPiece('dragHeart');
const dragStar = createPiece('dragStar');
const dragCross = createPiece('dragCross');


//Funcion que se encarga de tomar el canvas y dibujar la figura correspondiente
function drawFigure(canvas){
    if(!canvas){
        alert("There is not such a canvas ");
    }
    
    const id = canvas.id
    const lapiz = canvas.getContext("2d");

    switch (canvas.id) {
        case "greyCircle":
                drawCircle(canvas.width/2, canvas.height/2, lapiz, "grey");
            break;
        case "greySquare":
                drawSquare(canvas.width, canvas.height,lapiz, "grey");
            break;
        case "greyHeart":
                drawHeart(canvas.width, canvas.height,lapiz, "grey");
            break;    
        case "greyTriangle":
                drawTriangle(canvas.width, canvas.height,lapiz, "grey");
            break;
        case "greyStar":
                drawStar(canvas.width, canvas.height,lapiz, "grey");
            break;
        case "greyCross":
                drawCross(canvas.width, canvas.height,lapiz, "grey");
            break;
        //Caseos para dibujar los elemetnos a color
        case "dragCircle":
                drawCircle(canvas.width/2, canvas.height/2, lapiz, "orange")
            break;
        case "dragSquare":
                drawSquare(canvas.width, canvas.height,lapiz, "blue");
            break;
        case "dragTriangle":
                drawTriangle(canvas.width, canvas.height,lapiz, "green");
            break;
        case "dragHeart":
                drawHeart(canvas.width, canvas.height,lapiz, "red");
            break;
        case "dragStar":
                drawStar(canvas.width, canvas.height, lapiz, "yellow");
                break;
        case "dragCross":
                drawCross(canvas.width, canvas.height,lapiz, "purple")
        default:
            break;
    }
}

function drawSquare(width, height, pincel, color ){
    pincel.fillStyle = color;
    pincel.fillRect(0,0,width,height);
}

function drawCircle(width, height, pincel, color){
    pincel.beginPath();
    pincel.arc(width, height, width, 0,  2 * Math.PI);   
    pincel.fillStyle = color;
    pincel.fill();
    pincel.stroke();
}

function getHeart(width, height, r, paso){

    let puntos = [];
    for (let a = 0; a < 2 * Math.PI; a+= paso){
        let p = {};
        p.x = width + 16 * r * (Math.sin(a) * Math.sin(a) *Math.sin(a));
        p.y = 
            height - 
            13 * r * Math.cos(a) +
            5 * r * Math.cos(2 * a) +
            2 * r * Math.cos(3 * a) +
            1 * r * Math.cos(4 * a);  
        puntos.push(p); 
    }
    return puntos;  
}

function drawHeart(width, height, pincel, color){
    const canvasX = (width/2); 
    const canvasY = (height/2) - 10;

    let points =  getHeart(canvasX, canvasY, 3.9, 0.05);
    
    //empieza el trazado
    pincel.beginPath();
    //muebe al puntero al primer punto del array
    pincel.moveTo(points[0].x, points[0].y);
    //Dibuja el corazon
    points.forEach( p=> {
        pincel.lineTo(p.x, p.y)
    });
    //Cierra el trazado
    pincel.closePath();
    //Define el color
    pincel.fillStyle = color;
    //Rellena la figura con color
    pincel.fill();
    
    //Dibuja el corazon
    pincel.stroke();
}

function drawTriangle(width, height, pincel, color){
    pincel.beginPath();
    pincel.moveTo((width/2), 0);
    pincel.lineTo(0, height);
    pincel.lineTo(width, height);
    pincel.lineTo((width/2), 0);
    pincel.closePath();
    pincel.fillStyle = color;
    pincel.fill();
    pincel.stroke();
}

function drawTriangle(width, height, pincel, color){
    pincel.beginPath();
    pincel.moveTo((width/2), 0);
    pincel.lineTo(0, height);
    pincel.lineTo(width, height);
    pincel.lineTo((width/2), 0);
    pincel.closePath();
    pincel.fillStyle = color;
    pincel.fill();
    pincel.stroke();
}

function drawStar(width, height, pincel, color){
    pincel.beginPath();
    pincel.moveTo((width/2), 0);
    pincel.lineTo(width*0.15, height);
    pincel.lineTo(width, height*0.38);
    pincel.lineTo(0, height*0.38);
    pincel.lineTo(width*0.85, height );
    pincel.closePath();
    pincel.fillStyle = color;
    pincel.fill();
    pincel.stroke();
}

function drawCross(width, height, pincel, color){
    pincel.fillStyle = color;
    pincel.fillRect((width/3), 0, (width/3), height);
    pincel.fillRect(0, (height/3), width, (height/3));

}

function startPage(){

    drawFigure(greyCircle);
    drawFigure(greySquare);
    drawFigure(greyHeart);
    drawFigure(greyTriangle);
    drawFigure(greyStar);
    drawFigure(greyCross);
    drawFigure(dragCircle);
    drawFigure(dragSquare);
    drawFigure(dragTriangle);
    drawFigure(dragHeart);
    drawFigure(dragStar);
    drawFigure(dragCross);
   
}

startPage();


document.body.appendChild(dragCircle);
document.body.appendChild(dragSquare);
document.body.appendChild(dragTriangle);
document.body.appendChild(dragHeart);
document.body.appendChild(dragStar);
document.body.appendChild(dragCross);
