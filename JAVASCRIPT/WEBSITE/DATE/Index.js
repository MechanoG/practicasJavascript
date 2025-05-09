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

//TASK WHICK DAY OF THE MONS WAS MANY YERAS AGO?
/*
function getDateAgo(date, daysAgo){

    const dayAgoMil = daysAgo*24*3600*1000;

    const wantedDay = new Date(date - dayAgoMil);

    return wantedDay;

}

let date = new Date(2015, 0, 2);

alert( getDateAgo(date, 1) ); // 1, (1 Jan 2015)
alert( getDateAgo(date, 2) ); // 31, (31 Dec 2014)
alert( getDateAgo(date, 365) ); // 2, (2 Jan 2014) */

//TASK 3 LAST DAY OF MONTH?
/*
function getLastDayOfMonth(year, mont){

    let date = new Date(year, mont + 1, 0);
    return date.getDate();

}

alert(getLastDayOfMonth(2012, 1));

normally dates start from 1, but when we pass 0, then it means 
one day before 1st day of the month. in other worlds: "the last 
day of the previus month" */

//TASK 4 HOW ,AMY SECONDS HAVE PASSED TODAY?

/*
function getSecondsTodays(){

    let today = new Date();

    return today.getHours()*3600 + today.getMinutes()*60 + today.getSeconds();  
} 

alert(getSecondsTodays());  */

//TASK 5 HOW MANY SECONDS TILL TOMORROWW?
/*
function getSecondsToTOMORROW(){

    let now = new Date();

    let tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate()+1)

    diff = tomorrow - now;

    return Math.round(diff/1000);  
} 

alert(getSecondsToTOMORROW()); */

//Task 6: Format Relative Date 

function formatDate(date){

    let now = new Date() - date;

    if (now < 1000){
        return "rigth now";
    }else if( now < 60*1000){
        return `${now/1000} sec.ago`;
    }else

    return now;

}

alert( formatDate(new Date(new Date - 1)) ); // "right now"

alert( formatDate(new Date(new Date - 30 * 1000)) ); // "30 sec. ago"

alert( formatDate(new Date(new Date - 5 * 60 * 1000)) ); // "5 min. ago"

// yesterday's date like 31.12.16 20:00
alert( formatDate(new Date(new Date - 86400 * 1000)) );


