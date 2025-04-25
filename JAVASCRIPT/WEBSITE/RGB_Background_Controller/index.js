//RGB BACKGROUND SELECTER

let redSlider = document.getElementById("redSlider");
let greenSlider = document.getElementById("greenSlider");
let blueSlider = document.getElementById("blueSlider");
let alphaSlider = document.getElementById("alphaSlider");


function setBackgroundColor(){

    let redValue = Number(redSlider.value);
    let greenValue = Number(greenSlider.value);
    let blueValue = Number(blueSlider.value);
    let alphaValue = (Number(alphaSlider.value)/100).toFixed(1);

    console.log(alphaValue)

    let color = `rgb(${redValue}, ${greenValue}, ${blueValue})`;
    console.log(color)
    
    let colorA = `rgb(${redValue}, ${greenValue}, ${blueValue}, ${alphaValue})`;
    
    document.body.style.background = colorA;

}
