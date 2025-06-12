//Robot de correo que recoge y deja paquetes
//Meadowfield, 11 lugares con 14 carreteras entre ellas
const roads = [
    "Casa de Alice-Casa de Bob", "Casa de Alice-Cabaña",
    "Casa de Alice-Oficina de Correos", "Casa de Bob-Ayuntamiento",
    "Casa de Daria-Casa de Ernie", "Casa de Daria-Ayuntamiento",
    "Casa de Ernie-Casa de Grete", "Casa de Grete-Granja",
    "Casa de Grete-Tienda", "Plaza de Mercado-Granja",
    "Plaza de Mercado-Oficina de Correos", "Plaza de Mercado-Tienda",
    "Plaza de Mercado-Ayuntamiento", "Tienda-Ayuntamiento"
];
//Array de ruta del robot
const mailRoute = [
    "Casa de Alice", "Cabaña", "Casa de Alice", "Casa de Bob",
    "Ayuntamiento", "Casa de Daria", "Casa de Ernie",
    "Casa de Grete", "Tienda", "Casa de Grete", "Granja",
    "Plaza del Mercado", "Oficina de Correos"
];


//La reed de carreteras forman un grafico
//Se conviete la liste de carreteras en una structura de datos que 
// diga que se puede alcnazar desde cada lugar.

function buildGraph(edges){
    let graph = Object.create(null);
    function addEdge(from, to){
        if (from in graph){
            graph[from].push(to);
        }else{
            graph[from] = [to];
        }
    }
    for (let [from, to] of edges.map(r =>r.split("-"))){
        addEdge(from, to);
        addEdge(to, from);
    }
    return graph;
}

const roadGraph = buildGraph(roads);

console.log(roadGraph)

//El robot se mueve por el pueblo, recoge las paquetes y 
// los entrega en su destino,

//Se condensa el estado del pueblo en el conjunto mínimo
//de valores que lo definen: ubicacion actual del robot,
//coleccion de objetos no entregados, que poseen direccion
//actual  y direccion de destino.

class VillageState{
    constructor(place, parcels){
        this.place = place;
        this.parcels = parcels;
    }

    move(destination){
        if(!roadGraph[this.place].includes(destination)){
            return this;
        }else{
            let parcels = this.parcels.map(p=>{
                if(p.place != this.place) return p;
                return {place:destination, address: p.address};    
            }).filter(p=> p.place != p.address);
            //  Filtra  parcels, de forma que cuando un parcel llega asu destino,
            // no es devuelto a la lista de parcels, lo que se considera como entregado
            return new VillageState(destination, parcels);
        }
    }
}

let first = new VillageState(
    "Oficina de Correos", 
    [{place: "Oficina de Correos", address: "Casa de Alice"}]
);

console.log(first);
//console.log(next.parcels);
// console.log(first.place);
//console.log(first.parcels);

//Obervacion
//robot devuelce un objeto que contiene tanto la direccion 
//en la que quiere moverse, como un valor de memoria que se
//le dara la proxima vez que se llame.

function runRobot(state, robot, memory){

    for(let turn = 0;; turn++){
        if (state.parcels.length == 0){
            console.log(`Terminado en ${turn} turnos`);
            break;
        }
        let action = robot(state, memory);
        state = state.move(action.direction);
        window.alert(state.direction)
        console.log("Parcels:", state.parcels);
        memory = action.memory;
        console.log(`Movido a ${action.direction}`);
    }
}

//Caminata aleatoria
function randomPick(array){
    let choice = Math.floor(Math.random() * array.length);
    return array[choice];
}

//  Rombot de caminata aleatoria
function randomRobot(state){
    return {direction: randomPick(roadGraph[state.place])};
}

//Robot con ruta fija
function routeRobot(state, memory){
    if(memory.length == 0 ){
        memory = mailRoute;
    }
    return {direction: memory[0], memory: memory.slice(1)};
}

VillageState.random = function(parcelsCount = 5){
    let parcels = [];
    for (let i = 0; i < parcelsCount; i++){
        let address = randomPick(Object.keys(roadGraph));
        let place;
        do{
            place = randomPick(Object.keys(roadGraph));            
        }while(place == address);
        console.log(place);
        console.log(address);
        parcels.push({place, address});
    }
    return new VillageState("Oficina de Correos", parcels);
}

//Funcion para encontrar ruta mas corta 
function findRoute(graph, from, to){
    let work = [{at: from, route: []}];
    for (let i = 0; i < work.length; i++){
        let {at, route} = work[i];
        for(let place of graph[at]){
            if (place==to) return route.concat(place);
            if(!work.some(w=>w.at == place)){
                work.push({at: place, route: route.concat(place)});
            }
        }
    }
}

//Function
function goalOrienedRobot({place, parcels}, route){
    if (route.length == 0){
        let parcel = parcels[0];
        if(parcel.place != place){
            route = findRoute(roadGraph, place, parcel.place);
        }else {
            route = findRoute(roadGraph, place, parcel.address);
        }
    }
    return {direction: route[0], memory: route.slice(1)};
}

//Function that is a optimized version of goal oriented versoin
function optimizedRobot({place, parcels}, route){
    if (route.length == 0){
        if (!parcels.some(p => p.place == place)){
            parcels.forEach(p => p.path = findRoute(roadGraph, place, p.place));
            route = parcels.reduce((x,y) =>{
                if(x.path.length <= y.path.length) return x;
                else return y;
            }).path;
        }else{
            let parcel = parcels.filter(p => p.place == place);
            parcel.forEach(n => n.path = findRoute(roadGraph, place, n.address));
            route = parcel.reduce((x,y) => {
                    if(x.path.length <= y.path.length) return x;
                    else return y;
            }).path
        }
    }
    return {direction: route [0], memory:route.slice(1)};
}

function pickFirstRobot({place, parcels}, route){
    if (route.length === 0){
        let notPicked = parcels.filter(p => p.place !==place);
        let pickedPar = parcels.filter (p => p.place === place );

        if (notPicked.length > 0){

            notPicked.forEach(n => n.path = findRoute(roadGraph, place, n.place));
            let nextDirection = notPicked.reduce((x,y) => {
                if (x.path.length <= y.path.length) return x;
                else return y;
            });
            route = nextDirection.path;
            
        }else if(pickedPar > 0){

            pickedPar.forEach(n => n.path = findRoute(roadGraph, place, n.address));
            let nextDirection = notPicked.reduce((x,y) => {
                if (x.path.length <= y.path.length) return x;
                else return y;
            });
            route = nextDirection.path;
        }
    }   
    return {direction: route [0], memory:route.slice(1)};
}

runRobot(VillageState.random(), pickFirstRobot, []);

