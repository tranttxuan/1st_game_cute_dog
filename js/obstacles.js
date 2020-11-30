import { canvas, ctx } from "./canvas.js";
import { firstPage, gameFrame, screen, thirdPage, scoresHTML, state, gameOver } from './index.js';
import { player } from "./player.js";

export let monsterArray = [];

const monster = new Image();
monster.src = './images/monster_walking.png';

const monster_gothit = new Image();
monster_gothit.src = './images/monster_gothit.png';


class Obstacles {
        constructor(distance) {
                this.frameX = 0;
                this.frameY = 0;
                this.spriteWidth = 656;
                this.spriteHeight = 536;
                this.sizeRate = 8;
                this.distance = distance // minimum distance between monsters at initialization.

                this.x = canvas.width * (Math.random() * 2) + canvas.width * this.distance;
                this.y = canvas.height - this.spriteHeight / this.sizeRate - 45;

                this.x_velocity = Math.random() * 5 + 2;
                this.counted = false;

        }

        update() {
                if (state.current == state.getReady) {
                        this.x -= this.x_velocity;
                        if (this.x < -this.spriteWidth / this.sizeRate) this.x = canvas.width - this.spriteWidth / this.sizeRate + 30;
                } else {
                        this.reset();
                }
        }

        draw() {
                for (let i = 0; i < monsterArray.length; i++) {

                        if (this.counted == true) {
                                ctx.drawImage(monster_gothit, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, this.x - 15, this.y - 12, this.spriteWidth / 6, this.spriteHeight / 6);

                                if (this.frameX >= 5) this.frameX = 0
                                else if (gameFrame % 2 === 0) this.frameX++


                        } else {
                                ctx.drawImage(monster, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, this.x - 15, this.y - 12, this.spriteWidth / 6, this.spriteHeight / 6);

                                if (this.frameX >= 12) this.frameX = 0
                                else if (gameFrame % 10 === 0) this.frameX++
                        }
                }
        }
        reset() {
                this.x = canvas.width * (Math.random() * 2) + canvas.width * this.distance;
                this.y = canvas.height - this.spriteHeight / this.sizeRate - 45;
        }
}

//create only 3 monsters
function createMonsters(number) {
        for (let i = 0; i < number; i++) {
                monsterArray.push(new Obstacles(Math.random()*3 + 1))
        }
        //player must die
        setTimeout(() => {
                monsterArray.push(new Obstacles(Math.random()*3 + 1))
        }, 50000);
}
createMonsters(3)

export function handleObstacle() {

        for (let i = 0; i < monsterArray.length; i++) {
                monsterArray[i].update();
                monsterArray[i].draw();
        }

        // Collision detected


        for (let i = 0; i < monsterArray.length; i++) {

                if ((monsterArray[i].y <= player.y + player.height) && (player.x - monsterArray[i].spriteWidth / monsterArray[i].sizeRate <= monsterArray[i].x && monsterArray[i].x <= player.x + player.width)
                ) {

                        if (!monsterArray[i].counted) {
                                player.hurt();
                                monsterArray[i].counted = true;
                               
                        
                                if (player.life <= 0) {
                                        gameOver();
                                        player.reset();
                                        monsterArray.forEach(each => each.reset());
                                }

                        }

                } else {
                        monsterArray[i].counted = false;
                }
        }
}