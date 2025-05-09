//TASK 1: TURN THE OBJECT INTO JSON BACK
/*
let user = {
  name: "John Smith",
  age: 35
};

let json = JSON.parse(JSON.stringify(user));
*/

//TASK 2: EXCLUDE BACKREFERENCES
// Write replacer function to stringify 
// everything, but remove properties that reference meetup:

let room = {
  number: 23
};

let meetup = {
  title: "Conference",
  occupiedBy: [{name: "John"}, {name: "Alice"}],
  place: room
};

// circular references
room.occupiedBy = meetup;
meetup.self = meetup;

alert( JSON.stringify(meetup, function replacer(key, value) {
  return (key != "" && value =='meetup') ? undefined : value;
}));

/* result should be:
{
  "title":"Conference",
  "occupiedBy":[{"name":"John"},{"name":"Alice"}],
  "place":{"number":23}
}
*/

