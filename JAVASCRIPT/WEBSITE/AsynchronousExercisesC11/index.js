//Quiet times exercise//

/*Return an array of 24 numbers, one for each houe of the day, that
hold the number of camera network trafic observations seen un that 
hour of the dary

Days are identified by number using the system used by Date.getDay()
where Sunday is 0 and Saturday is 
async function activityTable(day) {

    let arrayRespuesta = [];    

    for(let i=0;i<24;i++) arrayRespuesta[i] = 0; 

    let logFileList = await textFile("camera_logs.txt");
    for(let filename in logFileList.split("\n")){
        let log = await textFile(filename);
        for(let timestamp in log.split("\n")){
            let date = new Date(Number(timestamp));
            if (date.getDay() == day){
                arrayRespuesta[date.getDay()]++;
            }
        }
    }

    /*Remember that new Date(timestamp) creates a Date object for
     that time, which has getDay and getHours methods returning 
     the day of the week and the hour of the day.

    /*Both types of files—the list of logfiles and the logfiles 
    themselves—have each piece of data on its own line, 
    separated by newline ("\n") characters.


    return arrayRespuesta;/*Array of concidences
    
}

/*The activityGraph function, provided by the sandbox, summarizes 
such a table into a string.
activityTable(1)
    .then(table => console.log(activityGraph(table)))*/


//Real Promises//
/*
async function activityTable(day) {
    let arrayRespuesta = [];    

    for(let i=0;i<24;i++) arrayRespuesta[i] = 0; 

    let logFileList = await textFile("camera_logs.txt");
    for(let filename in logFileList.split("\n")){
        let log = await textFile(filename);
        for(let timestamp in log.split("\n")){
            let date = new Date(Number(timestamp));
            if (date.getDay() == day){
                arrayRespuesta[date.getDay()]++;
            }
        }
    }
    return arrayRespuesta;
}
*/

/*
function activityTablePromises(day){
    let arrayRespuesta = [];

    for (let i=0;i<24;i++) arrayRespuesta[i] = 0;

    return textFile("camera_logs.txt").then(files=>{
        return Promise.all(files.split("\n")).map(name =>{
            return textFile(name).then(log => {
                for (let timestamp of log.split("\n")){
                    let date = new Date(timestamp);
                    if (date.getDate == day){
                        arrayRespuesta[date.getHours()]++;
                    }
                }
            });
        });
    }).then(()=>table);
}


activityTablePromises(6); */

//Building Promise.All

/*Implementa Prommise ALL
- Aregular function
- If Succesds yield an array of result values.
- If Fails the promise returned by All fails too, passing
  on the failure reason from the failing promise.

//Problemas en la implementacion
*/ 

function Promise_all(promises) {
  return new Promise((resolve, reject) => {
    
    let results = [];
    let pending = promises.length;
    
    for (let i = 0; i < promises.length; i++){

      promises[i].then(result =>{
        results[i] = result;
        pending--;

        if(pending==0) resolve(results);
      }).catch(reject);
    }
    if (promises.length == 0) resolve(results);
  });
}

// Test code.
Promise_all([]).then(array => {
  console.log("This should be []:", array);
});
function soon(val) {
  return new Promise(resolve => {
    setTimeout(() => resolve(val), Math.random() * 500);
  });
}
Promise_all([soon(1), soon(2), soon(3)]).then(array => {
  console.log("This should be [1, 2, 3]:", array);
});
Promise_all([soon(1), Promise.reject("X"), soon(3)])
  .then(array => {
    console.log("We should not get here");
  })
  .catch(error => {
    if (error != "X") {
      console.log("Unexpected failure:", error);
    }
  });