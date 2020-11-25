import { canvas, ctx } from "./canvas.js";
import { player } from './player.js';
import { firstPage, gameFrame, screen, thirdPage } from './index.js';
import { arrayPresents } from "./present.js";
import { monsterArray } from "./obstacles.js";

//create an array of images to draw presents
const poison = new Image();
poison.src = "./images/poison.png";

class Poisons {
        constructor(x) {
                this.x = x;
                this.y = -100;
                this.x_init = x;

                this.width = 60;
                this.height = 60;

                this.y_velocity = Math.random()*5+1;
                this.counted = false;
                this.image = [];
                this.fast = 0;
                this.distance = 100;
                this.direction = -1;


        }

        update() {
                
                if(this.x <= this.x_init - this.distance) {this.direction=1;}
                else if (this.x > this.x_init) {this.direction=-1;}
                this.x+=this.direction;

                this.y += this.y_velocity;
        }

        draw() {

                ctx.drawImage(poison, this.x, this.y, this.width, this.height);
        }
        reset() {
                this.x = Math.random() * canvas.width;
                this.y = -100;
        }
}
let arrayPoisons = [];


export function handlePoisons() {
        if ((gameFrame % 200) == 0) {
                arrayPoisons.push(new Poisons(Math.random()*canvas.width));
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
                                arrayPoisons.splice(i, 1);
                                arrayPresents.splice(0, arrayPoisons.length - 1);
                              
                                ctx.clearRect(0, 0, canvas.width, canvas.height);
                                
                                gameFrame = 0;



                        } else {
                                arrayPoisons[i].counted = false;
                        }


                }

        }

}

export { arrayPoisons };