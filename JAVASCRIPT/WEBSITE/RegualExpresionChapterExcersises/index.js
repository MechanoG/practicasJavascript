/*Exercise 1 : REGEXPGOLF

1. car y cat
2. pop y prop
3. ferret, ferry y ferrari
4. Cualquier palabra que termine en ious
5. Un carácter de espacio en blanco seguido de un punto, 
   coma, dos puntoso punto y coma
6. Una palabra con más de seis letras
7. Una palabra sin la letra e (o E)
*/

/*solution 1 y 2
let regex1 = /ca[r|t]/;
console.log(regex1.test("car y cat"));
console.log(regex1.test("12356"));
console.log(regex1.test("pop y prop"));
*/

/*solution 3* Any word ending in ious/
/*
let regex3 = /ferr[et|y|ari]/ 
console.log(regex3.test("ferret, ferry y ferrari"));
console.log(regex3.test("ferrum", "transfer A"));
*/

/*solution 4*/
/*
let regex4 = /(ious\b)/ 
console.log(regex4.test("how delicious"));
console.log(regex4.test("spacious room"));
console.log(regex4.test("ruinous"));
console.log(regex4.test("consciousness"));
*/

/*Solution 5*
A whitespace character followed by a period, comma, colon, or
*/
/*
let regex5 = /\s[.|,|;|:]/ 
console.log(regex5.test("bad punctuation ."));
console.log(regex5.test("escape the period"));
*/
/*Solution 6*
6. Una palabra con más de seis letras
*/

/*
let regex6 = /\w{7,}/ 
console.log(regex6.test("hottentottententen"));
console.log(regex6.test("no"));
console.log(regex6.test("hotten totten tenten"));
*/

/*Solution 7*
 Una palabra sin la letra e (o E)
*/

/*
let regex6 = /\b[^\se]+\b/i; 
console.log(regex6.test("red platypus"));
console.log(regex6.test("wobbling nest"));
console.log(regex6.test("earth bed"));
console.log(regex6.test("learning ape"));
console.log(regex6.test("BEET"));
*/

/*Exercise 2: Estilo de comillas */

let text = "'I'm the cook,' he said, 'it's my job.'";

console.log(text.replace(//g, `"`));

