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
            return new VillageState(destination, parcels);
        }
    }
}

let first = new VillageState(
    "Oficina de Correos", 
    [{place: "Oficina de Correos", address: "Casa de Alice"}]
);

let next=first.move("Casa de Alice");

console.log(next.place);
console.log(next.parcels);
console.log(first.place);

//Obervacion
//robot devuelce un objeto que contiene tanto la direccion 
//en la que quiere moverse, como un valor de memoria que se
//le dara la proxima vez que se llame.

function runRobot(state,robot,memory){
    for(let turn = 0;; turn++){
        if (state.parcels.length == 0){
            console.log(`Terminado en ${turn} turnos`);
            break;
        }
        let action = robot(state, memory);
        state = state.move(action.direction);
        memory = action.memory;
        console.log(`Movido a ${action.direction}`);
    }
}

//Caminata aleatoria
function randomPick(array){
    let choice = Math.floor(Math.random() * array.length);
    return array[choice];
}

function randomPick(state){
    return {direction: randomPick(roadGraph[state.place])};
}