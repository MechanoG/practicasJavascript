/*Synchronous = ejecuta una linea por linea
de codigo que espera a que una ooperacion termine

Asynchronous = permite a multiples operaciones 
realizarse. (I/O operatio, network request, fetching data)*/

function func1(callback){
    setTimeout(() => {console.log("task1");
                    callback()},3000);

}

function func2(){
    console.log("task 2");
    console.log("task 3");
    console.log("task 4");
}

func1(func2);




