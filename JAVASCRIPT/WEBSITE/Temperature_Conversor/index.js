const cenFarCon = (temp) => temp*1.8 + 32;
const farCenCon = (temp) => (temp - 32)/1.8;

let obtenerTemp = () => document.getElementById("temp").value;
let res = (respuesta) => document.getElementById("res").textContent = respuesta;

document.getElementById("submmit").onclick = function() {
    
    if (document.getElementById("centFar").checked == false && document.getElementById("farCent").checked == false ){
        
        res("Por favor seleccione un metodo de conversion")

    }else if (obtenerTemp() == ""){

        res(`Por Favor Introdusca una temperatura `)

    }else if (document.getElementById("centFar").checked == true){
        

        res(`Entonces serian ${cenFarCon(obtenerTemp())}º faremheit`)

    } else{

        res(`Entonces serian ${farCenCon(obtenerTemp())}º centigrados`)
    }
      
    
}





