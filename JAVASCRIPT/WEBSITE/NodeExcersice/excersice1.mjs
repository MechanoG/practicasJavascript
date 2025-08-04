//Necesito una funcion que me permita 
import { error } from "console";
import { FILE } from "dns";
import {readdir, writeFile, stat, lstat} from "fs/promises";  //Se usa para asyncronas
import {join} from "path";


/**************************************************
 * @argument reExp String contain the regular expresion 
 * @augments searchArchives Array contan al the elements on a determined directory 
 * @returns an array whit all the files that concord with the regualr exp
 */
function regExSearcher(reExp, searchArchives){    
    
    let esxpreRegular = new RegExp(reExp);

    let expMatchet = [];

    for (let archive of searchArchives){
        let result = String(archive).match(esxpreRegular);
        
        if(result?.length > 0){
            expMatchet.push(archive);
        }
    }

    return expMatchet;
}

function printRegEx(regExAr){
        if (regExAr.length > 0){
        regExAr.forEach((file) => {
            console.log(`${file}`);
        })
    }else{
        console.log("No se encontraron archivos coincidentes");
    }

}

async function writeTest(archives) {
    let archCrear = archives.map(async (file) => {

        await writeFile(file, `Lorem ipsum`, (err) =>{
            if (error) throw err;
            console.log("Archive creted succesfully");
        });

    })

    Promise.all(archCrear);

}

function searchCas(dirFiles, filesToSearch){
    let findCas = [];

    filesToSearch.forEach((file) =>{
        dirFiles.forEach((dir)=>{
            if (file === dir){
                findCas.push(file);
            }
        })
    })

    return findCas;
}

function printCas(findedCas){
    if(findedCas.length > 0 ){
        
        findedCas.forEach((casual)=>{
            console.log(`${casual}`);
        })        
    }else{
            console.log("No se encontro un archivo que conincida con la busqueda");
    }

}

//usar try en everyu await
async function getFiles(path){

    let arrayFiles = []

    try{
        const dirFiles = await readdir(path);

        if (dirFiles.length==0){
            return;
        }
        for (let element of dirFiles){
            let fullPath = join(path, element)

            try{
                let stats = await lstat(fullPath);
                if (stats.isDirectory()){
                    await getFiles(fullPath);
                }else{
                    arrayFiles.push(element);
                }
            }catch(error){
               console.error(`Error al procesar el elemento ${path}`, err); 
            } 
        }                         
    }catch(err){
        console.error(`Error al leer el directorio ${path}`, err);
    }    

    return arrayFiles;
}

async function main() {
    
    let baseDirectory = process.cwd();
    let regEx = process.argv[2];
    let filesToSearch = process.argv.slice(3);

    if(!regEx){
        console.log("Input Error: Inserte un argumento valido");
        return;
    }

    const archivosPrueba = [
        "informe_mensual_2024-06.pdf", "foto_vacaciones_playa_001.jpeg",
        "data_clientes_VIP_Q3.csv", "utilidades_sistema_v2.1.js", "config.dev.json",
        "articulo_tecnico-nodejs.md", "documento_legal_final.docx", "presentacion_proyecto_final.pptx",
        "Registro_errores_20240729.log","script_de_inicio.sh","manual_usuario_es.pdf","backup_db_20240728.zip"
    ]

    await writeTest(archivosPrueba);

    const dirFiles = await getFiles(baseDirectory);   
   
    let findedRegExp = regExSearcher(regEx, dirFiles);

    printRegEx(findedRegExp);

    if(filesToSearch.length > 0){
        let findedCas = searchCas(dirFiles, filesToSearch);
        printCas(findedCas);
    }
    
} 

main();
///Obtener elementos del directorio
///Comprobar si alguno de esos elementos concuerdan con la expresion regular.

