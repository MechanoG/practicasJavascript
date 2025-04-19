const display = document.getElementById("display");


function showDisplay(input){
    if (display.value=="0"){
        display.value = input;       

    }else{
        display.value += input;
    }
    
}

function clearDisplay(){
    display.value = '';
}

function calculate(){
    try{
        display.value = eval(display.value);
        if (display.value == undefined){
            throw new Error("unde");
            ;
            
        }
    }
    catch(error){
        display.value = "Error";   
    }
        

}



