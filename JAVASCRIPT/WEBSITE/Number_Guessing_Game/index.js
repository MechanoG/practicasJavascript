const maxNum = 100;
const minNum =1;
const goalNumber = Math.floor(Math.random() * (maxNum - minNum));

let attempts = 0;
let guess;
let running = true;

while(running){

    guess = window.prompt(`Adivina el numero entre ${minNum} - ${maxNum}`)
    guess = Number(guess);

    if(isNaN(guess)){
        window.alert(`Por favor entre un numero valido`);
        break;
    }else if(guess < minNum || guess > maxNum){
        window.alert(`Por favor introduzca un numero valido`);
    }else{
        attempts++;
        if(guess< goalNumber){
            window.alert(`Muy Bajo, Intenta de Nuevo!!!`);
        }
        else if(guess > goalNumber){
            window.alert(`Muy Alto, Intenta de Nuevo!!!`);
        }
        else{
            window.alert(`Correcto la respuesta es: ${goalNumber}`);
            window.alert(`Te tomo ${attempts} intentos`);
            
            running = false;
            
        }
    }
}

