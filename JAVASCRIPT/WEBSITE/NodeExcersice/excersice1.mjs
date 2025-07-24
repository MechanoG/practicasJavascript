function regExSearcher(reExp, compExp){
    
    console.log(`${reExp}`);
    console.log(`${compExp}`);

    let esxpreRegular = new RegExp(reExp);

    let result = compExp.match()
    
    if (result.lengt > 0){
        console.log("Si se cumple con la expresion Regular")
    }else{
        console.log("No se cumple con la expresion Regular")
    }

    
        
}

let argument1 = process.argv[2];
let argument2 = process.argv[3];
regExSearcher(argument1, argument2);

