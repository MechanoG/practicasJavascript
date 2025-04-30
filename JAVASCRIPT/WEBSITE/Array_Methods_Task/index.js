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
let john = { name: "John", surname: "Smith", id: 1 };
let pete = { name: "Pete", surname: "Hunt", id: 2 };
let mary = { name: "Mary", surname: "Key", id: 3 };

let users = [ john, pete, mary ];

let usersMapped = users.map(user=>({
    fullName: `${user.name} ${user.surname}`,
    id: user.id
}));



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

