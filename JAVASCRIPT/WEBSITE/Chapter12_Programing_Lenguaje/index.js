//Proyecto de lenguaje EGG

//Analisis Sintactico
/*
Analizador sintactico:programa que lee un fragmento de texto y 
produce una estructura de datos que refleja la estructura delprograma 
contenido en ese texto
*/

/*recibe una cadena como entrada, devuelve un objeto con la estructura
de datos */
function parseExpression(program){
    program = skipSpace(program);
    let match, expr;
    if (match = /^"([^"]*)"/.exec(program)){
        expr = {type: "value", value: match[1]};
    }else if(match = /^\d+\b/.exec(program)){
        expr = {type: "value", value:Number(match[0])};
    }else if (match = /^[^\s(),#"]+/.exec(program)){
        expr = {type: "word", name:(match[0])};
    }else{
        throw new SyntaxError("Sintaxis inesperada:" + program);
    }

    return parseApply(expr, program.slice(match[0].length));
}

function skipSpace(string){
    let first = string.search(/\S/);
    if (first == -1) return"";
    return string.slice(first);
}

function parseApply(expr, program){
    program = skipSpace(program);
    if (program[0] != "("){
        return {expr: expr, rest: program}
    }

    program = skipSpace(program.slice(1));
    expr= {type: "aply", operator: expr, args:[]}
    while (program[0] !=")"){
        let arg= parseExpression(program);
        expr.args.push(arg.expr);
        program = skipSpace(arg.rest);
        if (program[0] == ","){
            program = skipSpace(program.slice(1));
        }else if (program[0] != ")"){
            throw new SyntaxError("Se esperaba ',' o ')'");
        }
    }

    return parseApply(expr, program.slice(1));
}

//Todo lo anterior se envuelve en parse function de manera 
// que se verifique que se ha llegado a la final de la cadena de 
// entrada analizar la expresion. 

function parse(program){
    let {expr, rest} = parseExpression(program);
    if (skipSpace(rest).length >0){
        throw new SyntaxError("Texto Inesperado después del programa");
    }
    return expr;
}

//console.log(parse("+(a,10)"))

//El Evaluador
//Se encarga de ejecutar el árbol de  sintaxis de un programa
// toma un arbol de sintaxis, y un objeto de ambito que 
// asocia nombres y valores, evalua la operacion que representa el arbol
//y devolvera el valor que este reproduce.

const specialForms = Object.create(null);

function evaluate(expr, scope){
    if(expr.type == "value"){
        return expr.value;
    }else if(expr.type == "word"){
        if(expr.name in scope){
            return scope[expr.name];
        }else{
            throw new ReferenceError(
            `Vinculación indefinida: ${expr.name}`);
        }
    }else if (expr.type == "apply"){
        let {operator, args} = expr;
        if (operator.type == "word" && 
            operator.name in specialForms){
            return specialForms[operator.name](expr.args, scope);
        }else{
            let op = evaluate(operator, scope);
            if (typeof op == "function"){
                return op(...args.map(arg => evaluate(arg, scope)));
            }else{
                throw new TypeError("Aplicando una no-funcion");
            }
        }
    }
}
//El evaluador posee codigo para cada uno de los tipos de expresion.

//Formas Especiales.
//Se usa para definir sintaxis especial en Egg
//Asocia palabras con funciones que evaluan dichas formas.Actualmente vacío.
//Añadimos If
specialForms.if = (args, scope) => {
    if (args.length != 3){
        throw new SyntaxError("Número incorrecto de argumentos para if");
    }else if (evaluate(args[0], scope) !== false){
        return evaluate(args[1], scope);
    }else{
        return evaluate(args[2, scope]);
    }
};

//While
specialForms.while = (args, scope) =>{
    if(args.length != 2){
        throw new SyntaxError("Número incorrecto de argumentos para while");
    }
    while (evaluate(args[0], scope) !== false){
        evaluate(args[1], scope);
    }
    //Dafo que undefined no existe en Egg, devolvemos false,
    //por falta de un resultado significativo.
    return false;
};

//Bloque básico do, ejecuta los argumentos de arriba abaj-
specialForms.do = (args, scope) => {
    let valor = false;
    for (let arg of args){
        valor = evaluate(arg, scope);
    }
    return valor;
};

//Para pder crear vinculaciones y darles nuevos valores tambien creamos
// una forma llamada define. Espera una palabra como primer argumento y una expresion
//que produzca el valor a asignar a esa palabra on su segundo argumento.

specialForms.define = (args, scope) => {
    if(args.length !=2 || args[0].type != "word"){
        throw new SyntaxError("Uso Incorrecto de define");
    }
    let value = evaluate(args[1], scope);
    scope[args[0].name] = value;
    return value;
}


//El entorno
//El scope aceptado por evaluate es un objeto con propiedades cuyos
//nombres corresponden a los nombres de los bindings y cuyos valores 
//corresponden a los valores a los que esos bindings están ligados.

const topScope = Object.create(null);

topScope.true = true;
topScope.false = false;

//ahora podemos evaluar una expresión que nuega un valor booleano

/* Error aqui, verificar mas tarde
let prog = parse(`if(true, false, true)`);
console.log(evaluate(prog, topScope));
*/

//Suministra operadores básicos de aritmetica y comparaion
//tambien agregaremos funciones al scope, se usaa function para sintetizar
//un conjunto de funciones de operadores en un bluce, en lugar de 
//definirlas individualmente

for (let op of ["+", "-", "*", "/", "==", "<", ">"]){
    topScope[op] = Function("a,b", `return a ${op} b;`)
}
