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
/*
function count(object){

    const propierties = Object.keys(object);
    return propierties.length;

}

let user = {
    name: 'John',
    age: 30
  };
  
  alert( count(user) ); // 2
  */


//Final task
/*
Write a function formatDate(date) that should format date as follows:

If since date passed less than 1 second, then "right now".
Otherwise, if since date passed less than 1 minute, then "n sec. ago".
Otherwise, if less than an hour, then "m min. ago".
Otherwise, the full date in the format "DD.MM.YY HH:mm". 
That is: "day.month.year hours:minutes", 
all in 2-digit format, e.g. 31.12.16 10:00.
*/

function formatDate(date){

    const now = new Date() - date;

    if (now < 1000 ){
        return "right now";
    }else if(now < 60000){
        return `${now/1000} sec. ago`; 
    }

    let d = date;

    d = [
        '0'+d.getDate(),
        '0'+(d.getMonth()+1),
        '0'+d.getFullYear(),
        '0'+d.getHours(),
        '0'+d.getMinutes(),
    ].map(component=> component.slice(-2));

    return d.slice(0,3).join(".") + ' ' + d.slice(3).join(":") ;

}

alert( formatDate(new Date(new Date - 1)) ); // "right now"

alert( formatDate(new Date(new Date - 30 * 1000)) ); // "30 sec. ago"

alert( formatDate(new Date(new Date - 5 * 60 * 1000)) ); // "5 min. ago"

// yesterday's date like 31.12.16 20:00
alert( formatDate(new Date(new Date - 86400 * 1000)) );