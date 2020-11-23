import { canvas, ctx } from "./canvas.js";
import { gameFrame } from "./index.js";
import { player } from './player.js';


class Presents {
        constructor() {
                this.x = Math.random() * canvas.width;
                this.y = -100;

                this.width = 80;
                this.height = 80;

                this.y_velocity = Math.random() * 5 + 1;
                this.counted = false;
                this.image = [];


        }

        update() {
                this.y += this.y_velocity;

        }

        draw() {
                ctx.beginPath();
                ctx.fillStyle = "yellow";
                ctx.fillRect(this.x, this.y, this.width, this.height)
                ctx.closePath();



        }
}
const a = new Presents();
let arrayPresents = [a];

export function handlePresents() {
        if (gameFrame % 100 == 0) {
                arrayPresents.push(new Presents());
        }

        for (let i = 0; i < arrayPresents.length; i++) {
                arrayPresents[i].update();
                arrayPresents[i].draw();

        }

        //delete present which is falling out of screen
        for (let i = 0; i < arrayPresents.length; i++) {
                if (arrayPresents[i].y > canvas.height) {
                        arrayPresents.splice(i, 1);
                }

                if (arrayPresents[i]) {
                        if (arrayPresents[i].x - player.width <= player.x && player.x <= arrayPresents[i].x + arrayPresents[i].width && arrayPresents[i].y - arrayPresents[i].height <= player.y && player.y <= arrayPresents[i].y + arrayPresents[i].height) {

                                if (!arrayPresents[i].counted) {
                                        player.eatingFruit();
                                        arrayPresents[i].counted = true;
                                }

                                //delete fruit
                                
                        }else{
                                arrayPresents[i].counted = false; 
                        }



                }

        }
        console.log(arrayPresents.length)
}