console.log("I like pizza");

window.alert("Esto es una alerta")

//Comentario//

document.getElementById("myH1").textContent='Hello';
document.getElementById("myP").textContent='I like pizza';
/*

Esto 
es 
un 
comentario

*/

/*
Variable
1. Declaration let x;
2. assignament
*/

let x;
let y;

let student = false;

let age = 25;

x=1213;
y= 12.3685;

console.log(`Prueba variable $${x}`)

console.log(typeof x);

let fullName = "Jesus Saavedra";

document.getElementById("p1").textContent = `Your name is ${fullName}`;
document.getElementById("p2").textContent = `Your age is ${age}`;
document.getElementById("p3").textContent = `You are a student: ${student}`;

//let username;
//username = window.prompt("What`your username");
//console.log(username);

let username;
document.getElementById("mybutton").onclick = function (){
    username = document.getElementById("myText").value;
    console.log(username);
    document.getElementById("myheader").textContent = username;
}