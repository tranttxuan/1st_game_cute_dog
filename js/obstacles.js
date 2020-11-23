import { canvas, ctx } from "./canvas.js";
import { gameFrame, score } from './index.js';
import { player } from "./player.js";

const monsterArray = [];
const monster = new Image();
monster.src = './images/monster_walking.png';

class Obstacles {
        constructor() {
                this.frameX = 0;
                this.frameY = 0;
                this.spriteWidth = 656;
                this.spriteHeight = 536;
                this.sizeRate = 8;

                this.x = canvas.width - this.spriteWidth / this.sizeRate;
                this.y = canvas.height - this.spriteHeight / this.sizeRate - 45;

                this.x_velocity = Math.random() * 5 + 2;
                this.counted = false;

        }

        update() {
                this.x -= this.x_velocity;
                if (this.x < -this.spriteWidth / this.sizeRate) this.x = canvas.width - this.spriteWidth / this.sizeRate + 30;

        }

        draw() {
                ctx.beginPath();
                ctx.styleFill = "blue";
                ctx.fillRect(this.x, this.y, this.spriteWidth / this.sizeRate, this.spriteHeight / this.sizeRate);
                ctx.closePath();


                // ctx.drawImage(monster, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, this.x - 15, this.y - 12, this.spriteWidth / 6, this.spriteHeight / 6);

                if (this.frameX >= 12) this.frameX = 0
                else if (gameFrame % 10 === 0) this.frameX++


        }
}

export const obstacle1 = new Obstacles();
export const obstacle2 = new Obstacles();
obstacle2.x = canvas.width * 5 + 1000;
monsterArray.push(obstacle1);
monsterArray.push(obstacle2);


export function handleObstacle() {

        for (let i = 0; i < monsterArray.length; i++) {
                monsterArray[i].update();
                monsterArray[i].draw();
        }

        // Collision detected


        for (let i = 0; i < monsterArray.length; i++) {

                if (
                        (monsterArray[i].y <= player.y + player.height) && (player.x - monsterArray[i].spriteWidth / monsterArray[i].sizeRate <= monsterArray[i].x && monsterArray[i].x <= player.x + player.width)

                ) {

                        if (!monsterArray[i].counted) {
                                player.hurt();
                                monsterArray[i].counted = true;

                        }

                } else {
                        monsterArray[i].counted = false;
                }

        }




}