/*Task 1 
Create a Date object for the date: Feb 20, 2012, 3:12am. 
The time zone is local.

Show it using alert.*/
/*
let date = new Date(2012,1, 20, 3, 1 );
window.alert(date);

let date2 = new Date("2012-02-20T03:12");
window.alert(date2);
*/

/*Task2*/

/*My solution
function getWeekDay(date){ 
    let day = String(date).toUpperCase().slice(0,2);
    return day;
}
*/
/*
function getWeekDay(date){
    let days = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];

    return days[date.getDay()]; 
}

let date = new Date(2012, 0, 3);  // 3 Jan 2012
alert( getWeekDay(date) );        // should output "TU"
*/

//TASK 3: EUROPEAN WEEKDAY
/*
function getLocalDay(){

    let day = date.getDay();

    if (day == 0){
        day = 7;
    }

    return day
}

let date = new Date(2012, 0, 3);  // 3 Jan 2012
alert( getLocalDay(date) );       // tuesday, should show 2
*/
