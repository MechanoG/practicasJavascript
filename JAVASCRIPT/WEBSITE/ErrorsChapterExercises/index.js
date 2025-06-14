/*
Exercise 1

Say you have a function primitiveMultiply that in 20 
percent of cases multiplies two numbers and in the other 
80 percent of cases raises an exception of type MultiplicatorUnitFailure. 
Write a function that wraps this clunky function and just keeps trying until 
a call succeeds, after which it returns the result.

Make sure you handle only the exceptions you are trying to handle.

class MultiplicatorUnitFailure extends Error {};

function primitiveMultiply(a,b){
    if (Math.random() < 0.2 ){
        return a * b; 
    }else{
        throw new MultiplicatorUnitFailure("Klunk");
    }
}

function reliableMultiplicator(a,b){
    for(;;){
        try{
            return primitiveMultiply(a,b)
        }catch(e){
            if (e instanceof(MultiplicatorUnitFailure)){
                console.log("MultiplicatorUnitFailure")
            }else{
                throw e;
            }
        }
    }

}

console.log(reliableMultiplicator(8,8));


eXERCISE 2. lA CAJA CERRADA CON LLAVE
*/

const box = new class{
    locked = true;
    #content = [];

    unlock(){this.locked = false};
    lock(){this.locked = true};

    get content(){
        if (this.locked) throw new Error("Cerado con llave")
        return this.#content;
    }
};

function withBoxUnlocked(body){
    box.unlock();
    try{
         return body()
    }finally{
        box.lock();
    }
}

withBoxUnlocked(() => {
    box.content.push("Pieza de Oro");
    box.content.push("Espada Plata");
}
);

withBoxUnlocked(()=>{
    for (let i = 0; i < box.content.length; i++){
        console.log(`Treasure: ` + box.content[i] );
    }
});

try{
withBoxUnlocked(()=>{
    throw new Error("Pirates on the horizaon, retreat!!!")})

}catch (e) {
    console.log("Error raised: ", e);
}

console.log("Estado de la caja: ", box.locked);
