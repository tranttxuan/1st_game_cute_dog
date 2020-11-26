import { player } from './player.js';
import { canvas, ctx } from './canvas.js'
import { handleBackground } from './background.js';
import { handleObstacle, monsterArray } from './obstacles.js';
import { handlePresents, arrayPhotos, arrayPresents } from './present.js';
import { arrayPoisons, handlePoisons } from './poison.js';
import { arrayMilk, handleMilk } from './milk.js'


//declare DOM elements
export const startBtn = document.getElementById('button');
export const aboutBtn = document.getElementById("about");
export const screen = document.getElementById("body");
export const firstPage = document.querySelector(".first");
export const secondPage = document.querySelector(".second");
export const thirdPage = document.querySelector(".third");
export const backBtn = document.getElementById("back");
export const restartBtn = document.getElementById("restart");
export const scoresHTML = document.getElementById("scoreHTML");

const audio = document.getElementById('player');
const playBtn = document.querySelector(".playbtn");

let isPLayingAudio = true;

export let gameFrame = 0;

export const state = {
        current: 0,
        getReady: 1,
        gameOver: 2,
}


// show scores and healthy points
function score() {
        if (player.lite <= 20) {
                ctx.font = "bold 50px Calibri";
                ctx.fillStyle = "red";
                ctx.fillText(`Health: ${player.lite}`, 90, 90);

                ctx.font = "bold 50px Calibri";
                var gradient = ctx.createLinearGradient(0, 0, 150, 100);
                gradient.addColorStop(0, "rgb(255, 0, 128)");
                gradient.addColorStop(1, "rgb(255, 153, 51)");
                ctx.fillStyle = gradient;
                ctx.drawImage(arrayPhotos[1], 90, 100, 50, 50);
                ctx.fillText(`Scores: ${player.score}`, 150, 150);

        } else {
                ctx.font = "bold 50px Calibri";
                var gradient = ctx.createLinearGradient(0, 0, 150, 100);
                gradient.addColorStop(0, "rgb(255, 0, 128)");
                gradient.addColorStop(1, "rgb(255, 153, 51)");
                ctx.fillStyle = gradient;
                ctx.fillText(`Health: ${player.lite}`, 90, 90);
                ctx.drawImage(arrayPhotos[1], 90, 100, 50, 50);
                ctx.fillText(`Scores: ${player.score}`, 150, 150);

        }
}

//gameover, res

//Animation Loop

export function animate() {

        if (state.current == state.getReady) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                handleBackground();
                //draw presents:
                handlePresents();

                //draw milk
                handleMilk();

                //draw poisons
                handlePoisons();

                // draw the player
                player.update();
                player.draw();

                //draw obstacles
                handleObstacle();

                score();

                gameFrame++;
                requestAnimationFrame(animate);

        }
}


// handle buttons in main screen

startBtn.addEventListener('click', function () {
        body.style.display = "none";
        state.current = state.getReady;
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

        // reset all variables except monster array 
        arrayPoisons.splice(0, arrayPoisons.length);
        arrayPresents.splice(0, arrayPresents.length);
        arrayMilk.splice(0, arrayMilk.length);

});


//handle sound

window.onload = () => {
        audio.pause();
        audio.play();
}

playBtn.addEventListener('click', function () {
        isPLayingAudio = !isPLayingAudio;
        if (isPLayingAudio) {
                audio.play();
                playBtn.style.backgroundImage = `url("./images/volume.png")`;

        } else {
                audio.pause();
                playBtn.style.backgroundImage = `url("./images/no-sound.png")`;

        }

})

