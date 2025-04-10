//window.alert("Prueba¡")

var counter = 0;

document.getElementById("suma").onclick = function () {
     
    counter++;
    document.getElementById("pantalla").textContent=String(counter); 
}

document.getElementById("reset").onclick = function () {
     
    counter= 0;
    document.getElementById("pantalla").textContent=String(counter); 
}

document.getElementById("resta").onclick = function () {
     
    counter--;
    document.getElementById("pantalla").textContent=String(counter); 
}