//--Proyecto: Colocar las figuras correstas en su posicion

//Se inicician los canvas de las figuras iniciales
//Circulo, Cuadrado, Triangulo, Corazon Estrella Cruzz
const greyCircle = document.getElementById("greyCircle");
const greySquare = document.getElementById("greySquare");
const greyTriangle = document.getElementById("greyTriangle");
const greyHeart = document.getElementById("greyHeart");
const greyStar = document.getElementById("greyStar");
const greyCross = document.getElementById("greyCross");

//Colores
const gris = "grey";
const red = "red";
const green = "green";
const blue = "blue";


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
/*
drawFigure(greySquare);
drawFigure(greyCircle);
*/

const lapiz = greyHeart.getContext("2d");
lapiz.beginPath();
lapiz.moveTo(150/2, 25);
lapiz.bezierCurveTo(0, 36, 0, 125, 75, 150);
lapiz.stroke();






