let gameSeq = [];
let userSeq = [];

let highScore = localStorage.getItem("highScore") || 0;
document.querySelector(".high-score").innerText = `High Score: ${highScore}`;
const start = document.getElementById("start")

let btns = ["yellow", "red", "purple", "green"];
let h2 = document.querySelector("h2");

let started = false;
let level = 0;

start.addEventListener("click", startGame);

function startGame() {
  if (started) return;           // prevent double start
  started = true;
  start.disabled = true;      // lock button while playing
  h2.innerText = "Level 0";
  levelUp();
}
function btnFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function (){
        btn.classList.remove("flash");
    },100);
}

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText =` Level ${level}`;

    let ranIdx = Math.floor(Math.random() * 4);
    let randColor = btns[ranIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    console.log(gameSeq);
    btnFlash(randBtn);
}

function checkAns(idx) {

    if(userSeq[idx] === gameSeq[idx]){
        console.log("same value");
        if(userSeq.length == gameSeq.length){
            setTimeout(levelUp,1000);
        } 
    } else {
        if( level > highScore){
            highScore = level;
            localStorage.setItem("highScore", highScore);
            document.querySelector(".high-score").innerText = `High Score: ${highScore}`;
        }
        h2.innerHTML = `Game over! your score was <b>${level}</b> press any key to start the game`;
        document.querySelector("body").style.backgroundColor = "red";

        setTimeout(function (){
            document.querySelector("body").style.backgroundColor = "white";
        },150);
        reset();
    }
}

function btnPress() {
    let btn = this;; // this will return the btn which was clicked
    btnFlash(btn);

    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length-1);
}

let allBtns = document.querySelectorAll(".btn");
for(let btn of allBtns){
    btn.addEventListener("click", btnPress);
}


function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
    start.disabled = false; // Re-enable the start button
}