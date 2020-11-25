import { canvas, ctx } from "./canvas.js";
import { gameFrame } from "./index.js";
import { player } from './player.js';

const ss = new Image();
ss.src = "./images/spaceship.png"


class SpaceShip {
        constructor() {
              
                this.width = 200;
                this.height = 45;
                this.counted = false;
                this.x_velocity = 10;

                this.x = canvas.width / 2 - this.width*1.5;
                this.y = canvas.height * 2 / 3;


        }

        update() {

                this.x += this.x_velocity;
                if (this.x > canvas.width - this.width || this.x + this.x_velocity < 0) { this.x_velocity = -this.x_velocity };
                console.log(this.x)

        }

        draw() {
                //        ctx.fillRect(this.x, this.y, this.width, this.height)
                ctx.drawImage(ss, this.x, this.y, this.width, this.height);
        }

        reset() {
                this.x = 0;
                this.y = 0;
        }
}

let arrayShips = [];

export function handleSpaceShip() {
        if (gameFrame % 900 == 0) {
                arrayShips.push(new SpaceShip());
        }

        for (let i = 0; i < arrayShips.length; i++) {
                arrayShips[i].update();
                arrayShips[i].draw();
        }

        // no or only one spaceship appear at every moment
        if ( gameFrame%900 == 500) arrayShips.splice(0, 1);

}

export { arrayShips };


