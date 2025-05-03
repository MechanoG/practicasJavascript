//Task 1 Filter Unique Array memebers

/*
function unique(arr) {
    return Array.from(new Set( arr));
  }
  
  let values = ["Hare", "Krishna", "Hare", "Krishna",
    "Krishna", "Krishna", "Hare", "Hare", ":-O"
  ];
  alert( unique(values) ); // Hare, Krishna, :-O
  */

//TASK 2 FILTER ANAMGRAMAS.
/*
function aclean(array){

    let map = new Map();

    for (let word of arr){
        let sorted = word.toLowerCase().split('').sort().join('');
        map.set(sorted, word);
    }

    return Array.from(map.values());
}


let arr = ["nap", "teachers", "cheaters", 
    "PAN", "ear", "era", "hectares"];


alert( aclean(arr) ); // "nap,teachers,ear" or 
// "PAN,cheaters,era"
*/
//Task3 ITERABLE KEYS
