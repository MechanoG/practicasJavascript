/*

star - inicia conteo
 inicia con 00:00:00:00


stop - inicia el conteo
    -Mantiene el numero en el contador
    -si se vuelve a presionar start, continua desde

restart - devuelve el contador a 0

*/

const display = document.getElementById("display")
let timer = null;
let starTime = 0;
let elapsedTime = 0;
let isRunning = false; 

function star(){
    if (isRunning){
        starTime = Date.now() - elapsedTime;
        timer = setInterval(update, 10);
        isRunning = true;
        
    }


}

function stop(){
    
}

function reset(){

}

function update(){

    const currentTime = Date.now()
    elapsedTime =  currentTime - starTime;

    let hours = 

}
