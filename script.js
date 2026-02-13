// QUESTIONS DATABASE 😎
const questions = [

{question:"15 × 3 = ?", options:[30,45,60,35], correct:45},
{question:"144 ÷ 12 = ?", options:[10,12,14,16], correct:12},
{question:"Square root of 169?", options:[11,12,13,14], correct:13},
{question:"25² = ?", options:[525,625,725,675], correct:625},
{question:"18 + 27 = ?", options:[45,35,40,50], correct:45},

{question:"7³ = ?", options:[343,244,441,300], correct:343},
{question:"100 - 57 = ?", options:[43,53,33,47], correct:43},
{question:"9 × 8 = ?", options:[72,81,64,70], correct:72},
{question:"50% of 200?", options:[100,150,50,120], correct:100},
{question:"12² = ?", options:[124,144,154,134], correct:144},

{question:"Cube root of 27?", options:[2,3,4,5], correct:3},
{question:"90 ÷ 9 = ?", options:[9,10,11,8], correct:10},
{question:"6 × 14 = ?", options:[84,64,74,94], correct:84},
{question:"What is 11²?", options:[111,121,131,141], correct:121},
{question:"200 ÷ 5 = ?", options:[20,30,40,50], correct:40},

{question:"17 + 19 = ?", options:[36,35,37,38], correct:36},
{question:"8³ = ?", options:[256,512,216,128], correct:512},
{question:"45 × 2 = ?", options:[80,85,90,95], correct:90},
{question:"120 - 35 = ?", options:[75,85,95,65], correct:85},
{question:"10% of 500?", options:[5,10,50,100], correct:50},

{question:"13 × 6 = ?", options:[78,68,88,98], correct:78},
{question:"81 ÷ 9 = ?", options:[7,8,9,6], correct:9},
{question:"5⁴ = ?", options:[625,525,725,425], correct:625},
{question:"What is 14²?", options:[186,196,176,166], correct:196},
{question:"300 ÷ 15 = ?", options:[10,15,20,25], correct:20}

];


function getLevel(points){

if(points < 50) return "Beginner 🟢";
if(points < 120) return "Explorer 🔵";
if(points < 200) return "Champion 🟣";

return "Master 🔥";
}

function loadPoints(){

let user=localStorage.getItem("loggedUser");
let progress = Math.min((pts/200)*100,100);

document.getElementById("progressBar").style.width =
progress + "%";
document.getElementById("badge").innerText =
"Badge: " + getBadge(pts);
if(!user){
window.location.href="login.html";
return;
}

let pts=Number(localStorage.getItem(user+"_points")) || 0;

document.getElementById("points").innerText =
"Your Points: "+pts;

document.getElementById("level").innerText =
"Level: " + getLevel(pts);
}
function getBadge(points){

if(points >=200) return "🏆 Master Gold Badge";
if(points >=120) return "🥈 Silver Badge";
if(points >=50) return "🥉 Bronze Badge";

return "No Badge Yet 🎯";
}

startTimer();
function startTimer(){

let time = 10;

document.getElementById("timer").innerText =
"Time Left: " + time;

let countdown = setInterval(()=>{

time--;

document.getElementById("timer").innerText =
"Time Left: " + time;

if(time <=0){

clearInterval(countdown);

alert("Time up!");

window.location.reload();
}

},1000);

}
// LOAD RANDOM QUESTION
function loadQuestion(){

let usedQuestions =
JSON.parse(localStorage.getItem("usedQuestions")) || [];

// sab use ho gaye? reset 😎
if(usedQuestions.length === questions.length){
usedQuestions = [];
}

let index;

do{
index = Math.floor(Math.random()*questions.length);
}
while(usedQuestions.includes(index));

usedQuestions.push(index);

localStorage.setItem("usedQuestions",
JSON.stringify(usedQuestions));

let q = questions[index];

localStorage.setItem("currentAnswer",q.correct);

document.getElementById("question").innerText = q.question;

let buttons="";

q.options.sort(()=>Math.random()-0.5); // shuffle options 🔥

q.options.forEach(opt=>{
buttons+=`<button onclick="answer(${opt})">${opt}</button>`;
});

document.getElementById("options").innerHTML=buttons;

}

// HOME
function goHome(){
window.location.href="index.html";
}

// DASHBOARD
function goDashboard(){
window.location.href="dashboard.html";
}

// LEADERBOARD
function goLeaderboard(){
window.location.href="leaderboard.html";
}
window.onclick = function(e){

if(!e.target.matches('.dots')){

let dropdown=document.getElementById("dropdown");

if(dropdown){
dropdown.style.display="none";
}

}

}

// LOGOUT
function logout(){

localStorage.removeItem("loggedUser");

alert("Logged out successfully!");

window.location.href="login.html";
}


// TOGGLE MENU
function toggleMenu(){

let menu=document.getElementById("dropdown");

if(menu.style.display==="block"){
menu.style.display="none";
}else{
menu.style.display="block";
}

}


// ANSWER CHECK
function answer(val){

let correct = localStorage.getItem("currentAnswer");

let user=localStorage.getItem("loggedUser");

if(Number(val)===Number(correct)){

let pts=Number(localStorage.getItem(user+"_points"))||0;

pts+=10;

localStorage.setItem(user+"_points",pts);

alert("Correct! +10 points");

}
else{
alert("Wrong!");
}

window.location.reload(); // next question 😎
}