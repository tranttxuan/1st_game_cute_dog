import { canvas, ctx } from "./canvas.js";
import { gameFrame } from "./index.js";
import { player } from './player.js';


//create an array of images to draw presents
const a = new Image();
a.src = "./images/red-apple.png";
const b = new Image();
b.src = "./images/peach.png";
const c = new Image();
c.src = "./images/black-berry-light.png";
const arrayPhotos = [a,b,c];

class Presents {
        constructor(photo) {
                this.x = Math.random() * canvas.width;
                this.y = -100;

                this.width = 60;
                this.height = 60;

                this.y_velocity = Math.random() * 5 + 1;
                this.counted = false;
                this.image = [];
                this.photo = photo;


        }

        update() {
                this.y += this.y_velocity;
        }

        draw() {
               
                ctx.drawImage(this.photo, this.x, this.y, this.width, this.height);
        }
}
let arrayPresents = [];

export function handlePresents() {
        if (gameFrame % 100 == 0) {
                let random = arrayPhotos[Math.floor(Math.random()*arrayPhotos.length)];
                arrayPresents.push(new Presents(random));
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
        
}

export {arrayPresents};