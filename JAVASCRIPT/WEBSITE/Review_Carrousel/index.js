const users=[
{
    id: 1,
    picture: "jolyne.jpeg",
    user: "Jolyne Kujo",
    job:"Prisoner",
    info:`"Two men look out through the same bars, one sees the wall and the other
    , stars"... Which one am I? [...] Of course I'll see the stars... until I see my 
    father, I want to keep on looking at the stars."`
},
{
    id:2,
    picture: "pucci.jpeg",
    user: "Enrico Pucci",
    job: "Priest",
    info: `I've never even thought of [betraying you]. I like people who help me,
    encourage my growth... You are the king of kings. Where will you end up? I 
    want to see it through to the end. I love you as I love God.`
},
{
    id:3,
    picture: "bruno.jpeg",
    user: "Bruno Bucciarati",
    job: "Mobster",
    info: `You must pay! You have betrayed my heart once again! I was only planning to 
    uncover your identity... but there has been a change of plans! I'm going to kill you 
    instead! Right now!`

},
{
    id:4,
    picture: "dio.jpeg",
    user: "Dio Brando",
    job: "Lawyer",
    info:`I know that happiness cannot be attained by having an invincible body, 
    or earning a lot of money, or even being the ruler of the human race. The 
    true victor is the one who sees Heaven... I will get there, at any cost.`
}]

const profilePict = document.getElementById("profilePict");
const userName = document.getElementById("autor");
const job=document.getElementById("job");
const info = document.getElementById("info");
let index = 0;


document.addEventListener("DOMContentLoaded", startPage)


function startPage(){
    setPage(0);
}

function setPage(num){
    profilePict.src=users[num].picture;
    userName.textContent = users[num].user;
    job.textContent = users[num].job;
    info.textContent =users[num].info;
}

function nextReview(){
    if(index >= users.length){
        index=0;
    }else{
        index++;
    }
    setPage(index);
}

function prevReview()
{   if(index <= 0){
        index=(users.length - 1);
    }else{
        index--;
    }
    setPage(index);
}

function randomReview(){
    index = Math.floor(Math.random()*(users.length))
    setPage(index);
}



    
    


