//Necesito una funcion que me permita 
import { error } from "console";
import {readdir} from "fs";

function regExSearcher(reExp, searchFiles){    
    console.log(`${reExp}`);
    console.log(`${searchFiles}`);

    let esxpreRegular = new RegExp(reExp);
       
    let result = expComp.match(esxpreRegular);

    let findedFiles = new Array;

    console.log(result);
    
    if (result.length > 0){
        console.log("Se encontraron archivos concidentes")
    }else{
        console.log("No se encontraron archivos")
    }      
}


let baseDirectory = process.cwd();

readdir(baseDirectory, (err,file)=>{
    if(err){
        console.log("Error reading directory:", err);
        return;
    }
    console.log('Contents of myDirectory', file);
});



let regEx = process.argv[2];
let files = process.argv.slice(3);


console.log(`Expresion regular: ${regEx}`);
console.log(`Archivos buscados:\n   `);
files.forEach((file) =>{
    console.log(`${file}`)
} );

//regExSearcher(regEx, files);



