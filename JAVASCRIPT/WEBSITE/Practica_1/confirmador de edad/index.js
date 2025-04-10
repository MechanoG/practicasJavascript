const myText = document.getElementById("myText");
const mySubmit= document.getElementById("mySubmit");
const resultElement = document.getElementById("resultElement");

let age = 0

mySubmit.onclick = function (){

    age = myText.value;
    age = Number(age);

    if(age<=0){
        resultElement.textContent = "Tu edad no puede ser menor  o igual a 0";

    }else if(age<18){
        resultElement.textContent = "Eres demasiado joven para estar en esta pagina";
    
    }else{
        resultElement.textContent = "Bienvenido a esta humilde pagina";
    }
    
}



