const trigger = true;
const text = document.getElementById("party");

function getColor(){
    return Math.floor(Math.random()*255) +1;
}
function getAlpha(){
    return (Math.random()*1).toFixed(1);
}

function partyHard(){

    let redColor = getColor();  
    let greenColor = getColor();
    let blueColor = getColor();
    let alphaColor = getAlpha();

    let color = `rgba(${redColor}, ${greenColor}, ${blueColor}, ${alphaColor})`; 

    let redTextColor = getColor();
    let greenTextColor = getColor();
    let blueTextColor = getColor();
    let alphaTextColor = getAlpha();

    let textColor = `rgba(${redTextColor}, ${greenTextColor}, ${blueTextColor}, ${alphaTextColor})`; 

    console.log("texto" + textColor);
    console.log("fondo: " + color);
        
    document.body.style.background = color;
    text.style.color = textColor;

}



setInterval(partyHard, 50);