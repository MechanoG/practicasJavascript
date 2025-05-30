//Array Method Task
console.log("Inicio");

//Task 1

/*camelize("background-color") == 'backgroundColor';
camelize("list-style-image") == 'listStyleImage';
camelize("-webkit-transition") == 'WebkitTransition';*/

function camelize(word){
    wardArray = []
    wardArray = word.split('-')
    console.log(wardArray);
    for(let i= 1; i < wardArray.length; i++){
        let firstchar = wardArray[i].charAt(0).toUpperCase() + wardArray[i].slice(1);
        wardArray[i] = firstchar
    }

    let result = `"`+ wardArray.join("")+`"`;
    console.log(result);
}

//Page solution
/*
function camelize(str) {
  return str
    .split('-') // splits 'my-long-word' into array ['my', 'long', 'word']
    .map(
      // capitalizes first letters of all array items except the first one
      // converts ['my', 'long', 'word'] into ['my', 'Long', 'Word']
      (word, index) => index == 0 ? word : word[0].toUpperCase() + word.slice(1)
    )
    .join(''); // joins ['my', 'Long', 'Word'] into 'myLongWord'
}

camelize("background-color");
camelize("list-style-image");
camelize("-webkit-transition");
*/

//Task 2

function filterRange(arr, a,b){

    return arr.filter(
        (item =>  a <= item && item<= b)
    );
}

/*
let arr = [5, 3, 8, 1];

let filtered = filterRange(arr, 1, 4);


alert( filtered ); // 3,1 (matching values)

alert( arr ); // 5,3,8,1 (not modified)
*/

//Task3

function filterRangeInPlace(arr, a, b){
    for(let i=0; i<arr.length; i++){
        let val = arr[i];

        if(val < a || val > b ){
            arr.splice(i,1)
            i--;
        }
    }
};

/*
let arr = [5, 3, 8, 1];

filterRangeInPlace(arr, 1, 4); // removed the numbers except from 1 to 4

alert( arr ); // [3, 1]*/

//TASK 3


function Calculator(){

    this.methods={
        "-": (a, b) => a - b,
        "+": (a, b) => a + b 
    };

    this.calculate = function(str){

        let split = str.split(' '),
            a = +split[0],
            op = split[1],
            b = +split[2];
        
        if (!this.methods[op] || isNaN(a) || isNaN(b)){
            return NaN;
        }

        return this.methods[op](a,b);
    };

    this.addMethod = function (name, func) {
        this.methods[name] = func;
    };
}

/*

let calc = new Calculator;
alert( calc.calculate("3 + 7") ); // 10


let powerCalc = new Calculator;
powerCalc.addMethod("*", (a, b) => a * b);
powerCalc.addMethod("/", (a, b) => a / b);
powerCalc.addMethod("**", (a, b) => a ** b);

let result = powerCalc.calculate("2 ** 3");
alert( result ); // 8  */

//Task 4

/*
let john = { name: "John", age: 25 };
let pete = { name: "Pete", age: 30 };
let mary = { name: "Mary", age: 28 };

let users = [ john, pete, mary ];

let names = users.map(item => item.name);
*/

//Task 5

/*
let john = { name: "John", surname: "Smith", id: 1 };
let pete = { name: "Pete", surname: "Hunt", id: 2 };
let mary = { name: "Mary", surname: "Key", id: 3 };

let users = [ john, pete, mary ];

let usersMapped = users.map(user=>({
    fullName: `${user.name} ${user.surname}`,
    id: user.id
}));

*/

/*
usersMapped = [
  { fullName: "John Smith", id: 1 },
  { fullName: "Pete Hunt", id: 2 },
  { fullName: "Mary Key", id: 3 }
]
*/

/*

We can’t write like this:

let usersMapped = users.map(user => {
  fullName: `${user.name} ${user.surname}`,
  id: user.id
});
As we remember, there are two arrow functions: without body value => expr and with body value => {...}.

Here JavaScript would treat { as the start of function body, not the start of the object. The workaround is to wrap them in the “normal” brackets:

let usersMapped = users.map(user => ({
  fullName: `${user.name} ${user.surname}`,
  id: user.id
}));
Now fine.

*/

//Task6 - Sort users by age

/*
function sortByAge(array){
    
    array.sort((a, b) => a.age - b.age);

}

let john = { name: "John", age: 25 };
let pete = { name: "Pete", age: 30 };
let mary = { name: "Mary", age: 28 };

let arr =  [john, pete, mary];

sortByAge(arr);

// now: [john, mary, pete]
alert(arr[0].name); // John
alert(arr[1].name); // Mary
alert(arr[2].name); // Pete

*/
//Task 7 - Shufffle An Array

/*
function shuffle(array){

    for (let i = array.length - 1; i > 0; i--){
        let j = Math.floor(Math.random()*(i+1)); //Random Index
        // swap elements array[i] and array[j]
        // we use "destructuring assignment" syntax to achieve that
        // you'll find more details about that syntax in later chapters
        // same can be written as:
        // let t = array[i]; array[i] = array[j]; array[j] = t
        [array[i], array[j]] = [array[j], array[i]];
        }
}

let arr = [1, 2, 3];

shuffle(arr);
alert(arr);
// arr = [3, 2, 1]

shuffle(arr);
alert(arr);
// arr = [2, 1, 3]

shuffle(arr);
alert(arr);
// arr = [3, 1, 2]
// ...
*/

//Task 8 Get Average age;
/*
function getAverageAge(users){

    return users.reduce((prev,users) => prev + users.age, 0)/users.length;
};

let john = { name: "John", age: 25 };
let pete = { name: "Pete", age: 30 };
let mary = { name: "Mary", age: 29 };

let arr = [ john, pete, mary ];

alert( getAverageAge(arr) ); // (25 + 30 + 29) / 3 = 28
*/

//Task 9 filter unique

/*
function unique(arr) {
    let result = []
    
    for (let str of arr){
        if(!result.includes(str)){
            result.push(str);
        }
    }

    return result;
  }
  
  let strings = ["Hare", "Krishna", "Hare", "Krishna",
    "Krishna", "Krishna", "Hare", "Hare", ":-O"
  ];
  
  alert( unique(strings) ); // Hare, Krishna, :-O
*/

//Task 10 Create keyed object from array.
//use .reduce method 

let users = [
    {id: 'john', name: "John Smith", age: 20},
    {id: 'ann', name: "Ann Smith", age: 24},
    {id: 'pete', name: "Pete Peterson", age: 31},
];

function groupById(array){
   return array.reduce((obj, value) => {
    obj[value.id] = value;
    return obj;
   }, {})
}

let usersById = groupById(users);

console.log(usersById);


/*
// after the call we should have:

usersById = {
  john: {id: 'john', name: "John Smith", age: 20},
  ann: {id: 'ann', name: "Ann Smith", age: 24},
  pete: {id: 'pete', name: "Pete Peterson", age: 31},
}
*/


