import { canvas, ctx } from "./canvas.js";
import { player } from './player.js';
import { firstPage, gameFrame, screen, thirdPage } from './index.js';

//create an array of images to draw presents
const poison = new Image();
poison.src = "./images/poison.png";

class Poisons {
        constructor() {
                this.x = Math.random() * canvas.width;
                this.y = -100;

                this.width = 60;
                this.height = 60;

                this.y_velocity = Math.random() * 5 + 1;
                this.counted = false;
                this.image = [];
             


        }

        update() {
                this.y += this.y_velocity;
        }

        draw() {
               
                ctx.drawImage(poison, this.x, this.y, this.width, this.height);
        }
}
let arrayPoisons = [];


export function handlePoisons() {
        if (gameFrame % 1000 == 0) {
                arrayPoisons.push(new Poisons());
        }

        for (let i = 0; i < arrayPoisons.length; i++) {
                arrayPoisons[i].update();
                arrayPoisons[i].draw();

        }

        //delete present which is falling out of screen
        for (let i = 0; i < arrayPoisons.length; i++) {

         
                if (arrayPoisons[i].y > canvas.height) {
                        arrayPoisons.splice(i, 1);
                }

                if (arrayPoisons[i]) {
                        if (arrayPoisons[i].x - player.width <= player.x && player.x <= arrayPoisons[i].x + arrayPoisons[i].width && arrayPoisons[i].y - arrayPoisons[i].height <= player.y && player.y <= arrayPoisons[i].y + arrayPoisons[i].height) {

                                screen.style.display = "flex";
                                firstPage.style.display = "none";
                                thirdPage.style.display = "flex";

                                //initialization
                                player.reset();
                                monsterArray.forEach(each => each.reset());
                                gameFrame = 0;
                                arrayPresents = [];
                               
                                
                        }else{
                                arrayPoisons[i].counted = false; 
                        }


                }

        }
        
}

export {arrayPoisons};