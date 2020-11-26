import { canvas, ctx } from "./canvas.js";
import { player } from './player.js';
import { scoresHTML, firstPage, gameFrame, screen, thirdPage, state } from './index.js';
import { arrayPresents } from "./present.js";
import { monsterArray } from "./obstacles.js";
import { arrayMilk } from "./milk.js";

// image to draw drug
const poison = new Image();
poison.src = "./images/poison.png";

export let arrayPoisons = [];

class Poisons {
        constructor(x) {
                this.x = x;
                this.y = -100;
                this.x_init = x;

                this.width = 60;
                this.height = 60;

                this.y_velocity = Math.random() * 7 + 1;
                this.counted = false;
                this.image = [];
                this.fast = 0;
                this.distance = 100;
                this.direction = -1;
        }

        update() {
                if (state.current == state.getReady) {
                        if (this.x <= this.x_init - this.distance) { this.direction = 1; }
                        else if (this.x > this.x_init) { this.direction = -1; }
                        this.x += this.direction;
                        this.y += this.y_velocity;
                }else{
                        this.reset();
                }
        }

        draw() {

                ctx.drawImage(poison, this.x, this.y, this.width, this.height);
        }
        reset() {
                this.x = Math.random() * canvas.width;
                this.y = -100;
        }
}



export function handlePoisons() {
        if ((gameFrame % 140) == 0) {
                arrayPoisons.push(new Poisons(Math.random() * canvas.width));
        }

        for (let i = 0; i < arrayPoisons.length; i++) {
                arrayPoisons[i].update();
                arrayPoisons[i].draw();

        }

        //delete drug which is falling out of screen
        for (let i = 0; i < arrayPoisons.length; i++) {


                if (arrayPoisons[i].y > canvas.height) {
                        arrayPoisons.splice(i, 1);
                }

                if (arrayPoisons[i]) {
                        //dog dies following collision
                        if (arrayPoisons[i].x - player.width <= player.x && player.x <= arrayPoisons[i].x + arrayPoisons[i].width && arrayPoisons[i].y - arrayPoisons[i].height <= player.y && player.y <= arrayPoisons[i].y + arrayPoisons[i].height) {

                                screen.style.display = "flex";
                                firstPage.style.display = "none";
                                thirdPage.style.display = "flex";
                                scoresHTML.innerHTML = player.score;
                                state.current = state.gameOver;
        

                        } else {
                                arrayPoisons[i].counted = false;
                        }


                }

        }




}
