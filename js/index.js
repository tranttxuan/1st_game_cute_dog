import { player } from './player.js';
import { canvas, ctx } from './canvas.js'
import { handleBackground } from './background.js';
import { handleObstacle } from './obstacles.js';
import { handlePresents } from './present.js';

export const startBtn = document.getElementById('button');
export const screen = document.getElementById("body");


let gameFrame = 0;


//Animation Loop

function animate() {

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        handleBackground();
        // draw the player
        player.update();
        player.draw();

        //draw obstacles
        handleObstacle();

        //draw presents:
        handlePresents();



        ctx.fillStyle = "red";
        ctx.font = "30px Arial";
        ctx.strokeText(`Health: ${player.lite}`, 10, 50)


        gameFrame++;
        requestAnimationFrame(animate);
}

// const button = document.getElementById("button");
// // console.log("hello")
// // console.log(button)
// button.addEventListener('click',function(){
//         console.log("you")
// })

// animate();



export { gameFrame };

startBtn.addEventListener('click',function(){
        body.style.display = "none";
        animate();
})