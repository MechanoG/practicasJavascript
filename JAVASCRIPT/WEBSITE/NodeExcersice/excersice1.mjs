//Necesito una funcion que me permita 
import { error } from "console";
import {readdir} from "fs/promises";



function regExSearcher(reExp, searchArchives){    
    console.log(`${reExp}`);
    console.log(`${searchArchives}`);

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




async function main() {
    
    let baseDirectory = process.cwd();
    let regEx = process.argv[2];
    let filesToSearch = process.argv.slice(3);
    const dirFiles = await readdir(baseDirectory);

    /*Se usa la comparacion*/

    
    

} 


main();
///Obtener elementos del directorio
///Comprobar si alguno de esos elementos concuerdan con la expresion regular.

