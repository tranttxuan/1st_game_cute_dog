import { player } from './player.js';
import { canvas, ctx } from './canvas.js'
import { handleBackground } from './background.js';
import { handleObstacle } from './obstacles.js';
import { handlePresents } from './present.js';

export const startBtn = document.getElementById('button');
export const aboutBtn = document.getElementById("about");
export const screen = document.getElementById("body");
export const firstPage = document.querySelector(".first");
export const secondPage = document.querySelector(".second");
export const thirdPage = document.querySelector(".third");
export const backBtn = document.getElementById("back");
export const restartBtn = document.getElementById("restart");

export let gameFrame = 0;


// show score 
function score() {

        ctx.font = "bold 50px Calibri";
        var gradient = ctx.createLinearGradient(0, 0, 150, 100);
        gradient.addColorStop(0, "rgb(255, 0, 128)");
        gradient.addColorStop(1, "rgb(255, 153, 51)");
        ctx.fillStyle = gradient;
        ctx.fillText(`Health: ${player.lite}`, 90, 90);

}
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

        score();



        gameFrame++;
        requestAnimationFrame(animate);
}




// handle buttons 

startBtn.addEventListener('click', function () {
        body.style.display = "none";
        animate();
})

aboutBtn.addEventListener('click', function () {
        firstPage.style.display = "none";
        secondPage.style.display = "flex";
})

backBtn.addEventListener('click', function () {
        firstPage.style.display = "flex";
        secondPage.style.display = "none";
});

restartBtn.addEventListener('click', function () {
        thirdPage.style.display = "none";
        firstPage.style.display = "flex";
});



// export { gameFrame };