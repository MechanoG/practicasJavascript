let cost="$120";

console.log(cost)

function extractMoney() {
    
    let numVal = Number(cost.replaceAll("$",""));

    console.log(cost.replaceAll("$",""));

    return numVal;    
}

window.alert(extractMoney("$120")==120);