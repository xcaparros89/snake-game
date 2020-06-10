import {createGrid} from './grid.js'

createGrid(100);

let movement
let playerPos
let direction
let score
let speed
let moving
let bordersN = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
let bordersS = [90, 91, 92, 93, 94, 95, 96, 97, 98, 99]
let start = document.getElementById("start")
let scoreBoard = document.getElementById("score")
let squares = Array.from(document.querySelectorAll("#grid div"));

document.addEventListener("DOMContentLoaded", ()=>{
    starting()

    function move(){
        if (movement === true){
            let head = playerPos[playerPos.length - 1];
            if((direction ===-10 && head<10)||(direction ===-1 && head%10 === 0)||(direction === 1 && (head+1)%10 === 0)||(direction === 10 && head >89)||(squares[head+direction].classList.contains("snake"))){
                gameOver();
                return (clearInterval(moving))
            } else{
                squares[head+direction].classList.add("snake");
                playerPos.push(head+direction);     
                if (squares[head+direction].classList.contains("apple")){
                    score +=50;
                    speed -=100;
                    clearInterval(moving);
                    moving = setInterval(()=>move(), speed);
                    newApple()
                } else{
                    squares[playerPos[0]].classList.remove("snake");
                    playerPos.shift();
                }        
            }
        }
    }

    function control(e){
        if (movement === true){
            if(e.keyCode === 37){
                direction = -1;
            } else if (e.keyCode === 38){
                direction = -10;
            } else if (e.keyCode === 39){
                direction = 1;
            } else if (e.keyCode === 40){
                direction = 10;
            }
        }
    }
    start.onclick = pause;
    function pause(){
        if (movement){
            movement = false;
            start.innerHTML="Resume"
        } else{
            movement = true;
            start.innerHTML="Pause"
        }
    }
    function starting(){
        movement = false;
        start.onclick = pause;
        if(playerPos){playerPos.forEach(x => squares[x].classList.remove("snake"))}
        playerPos = [0, 1, 2];
        direction = 1;
        score = 0;
        speed = 500;
        playerPos.forEach(x=> squares[x].classList.add("snake"))
        newApple()
        moving = setInterval(()=>move(), speed)
    }

    function newApple(){
        scoreBoard.innerHTML = score;
        squares.forEach(el=>el.classList.remove("apple"));
        let num = Math.floor(Math.random()*100);
        while (squares[num].classList.contains("snake")){
            num = Math.floor(Math.random()*100)
        }
        squares[num].classList.add("apple")
    }

    function gameOver(){
        console.log("game over")
        movement = false;
        start.innerHTML="Start"
        start.onclick = starting;
    }
    addEventListener("keydown", control)

})