console.log("Hola mundo");

//Task 1 Sum the properies

/*
function sumSalaries(objects){

    const salaries = Object.values(objects);
    let result = 0;

    for (let salarie of salaries){
        result += salarie
    }
    
    return result;
}

let salaries = {
    "John": 100,
    "Pete": 300,
    "Mary": 250
  };
  
  alert( sumSalaries(salaries) ); // 650  */

//TASK 2 Count Propierties
function count(object){

    const propierties = Object.keys(object);
    return propierties.length;

}

let user = {
    name: 'John',
    age: 30
  };
  
  alert( count(user) ); // 2