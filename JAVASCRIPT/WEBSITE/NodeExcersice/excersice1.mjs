//Necesito una funcion que me permita 
import { error } from "console";
import { FILE } from "dns";
import {readdir, writeFile} from "fs/promises";

/**************************************************
 * @argument reExp String contain the regular expresion 
 * @augments searchArchives Array contan al the elements on a determined directory 
 * @returns an array whit all the files that concord with the regualr exp
 */
function regExSearcher(reExp, searchArchives){    
    
    let esxpreRegular = new RegExp(reExp);

    console.log(esxpreRegular);

    let expMatchet = [];

    for (let archive of searchArchives){
        let result = String(archive).match(esxpreRegular);
        
        if(result?.length > 0){
            expMatchet.push(archive);
        }
    }

    return expMatchet   
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
            if (file.localeCompare(dir) == 0){
                findCas.push(file);
            }
        })
    })

    return findCas;
}

async function writeAndWait(params) {
    
}

async function main() {
    
    let baseDirectory = process.cwd();
    let regEx = process.argv[2];
    let filesToSearch = process.argv.slice(3);

    const archivosPrueba = [
        "informe_mensual_2024-06.pdf", "foto_vacaciones_playa_001.jpeg",
        "data_clientes_VIP_Q3.csv", "utilidades_sistema_v2.1.js", "config.dev.json",
        "articulo_tecnico-nodejs.md", "documento_legal_final.docx", "presentacion_proyecto_final.pptx",
        "Registro_errores_20240729.log","script_de_inicio.sh","manual_usuario_es.pdf","backup_db_20240728.zip"
    ]

    writeTest(archivosPrueba);

    const dirFiles = await readdir(baseDirectory);

    
    let findedRegExp = regExSearcher(regEx, dirFiles);
    
    if (findedRegExp.length > 0){
        console.log("Coincidencias de archivos (RegEx))\n");
        findedRegExp.forEach((file) => {
            console.log(`REGEX COINCIDENCIA: ${file}`);
        })
    }else{
        console.log("No se encontraron archivos coincidentes");
    }

    let findedCas = searchCas(dirFiles, filesToSearch);

    if(findedCas.length > 0 ){
        console.log(`BUSQUEDA DIRECTA\n`)
        findedCas.forEach((casual)=>{
            console.log(`DIREC COMPARISON:  ${casual}`);
        })        
    }else{
            console.log("No se encontro un archivo que conincida con la busqueda");
    }
    
} 


main();
///Obtener elementos del directorio
///Comprobar si alguno de esos elementos concuerdan con la expresion regular.

