import { canvas, ctx } from "./canvas.js";
import { gameFrame } from "./index.js";
import { player } from './player.js';


//create an array of images to draw presents
const milk = new Image();
milk.src = "./images/milk.png"

export let arrayMilk = [];

class Milk {
        constructor() {
                this.x = Math.random() * canvas.width;
                this.y = -100;

                this.width = 60;
                this.height = 60;
                this.counted = false;
                this.y_velocity = 3;
        }
        update() {
                this.y += this.y_velocity;
        }
        draw() {     
                ctx.drawImage(milk, this.x, this.y, this.width, this.height);
        }
        reset(){
                this.x = 0;
                this.y = 0;
        }
}


export function handleMilk() {
        if (gameFrame % 300 == 0) {
                arrayMilk.push(new Milk());
        }

        for (let i = 0; i < arrayMilk.length; i++) {
                arrayMilk[i].update();
                arrayMilk[i].draw();
        }

        //delete milk bottles which fall out of screen
        for (let i = 0; i < arrayMilk.length; i++) {

         
                if (arrayMilk[i].y > canvas.height) {
                        arrayMilk.splice(i, 1);
                }

                if (arrayMilk[i]) {
                        if (arrayMilk[i].x - player.width <= player.x && player.x <= arrayMilk[i].x + arrayMilk[i].width && arrayMilk[i].y - arrayMilk[i].height <= player.y && player.y <= arrayMilk[i].y + arrayMilk[i].height) {
                                
                                if (!arrayMilk[i].counted) {
                                        player.drinkingMilk();
                                        
                                        arrayMilk[i].counted = true;
                                }
                                
                                //delete fruit
                                arrayMilk.splice(i, 1); 
                                
                        }else{
                                arrayMilk[i].counted = false; 
                        }
                }
        }
}
