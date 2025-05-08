/*

let user = { name: "John", years: 30 };

// your code to the left side:
let {name, years, isAdmin = false} = user;



alert( name ); // John
alert( age ); // 30
alert( isAdmin ); // false
*/

let salaries = {
    "John": 100,
    "Pete": 300,
    "Mary": 250
};



function topSalary(sal){
    if (!sal){
        return null;
    }

    let maxSal = 0;
    let employ ="";

    for(const [nombre, salario] of Object.entries(salaries)){
        
        if (maxSal < salario){
            maxSal = salario;
            employ = nombre;
        }
    }

    return employ;

}



console.log(topSalary(salaries));