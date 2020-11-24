import { ctx, canvas } from "./canvas.js";
import { gameFrame } from "./index.js";

//event handlers for the player
let playerController = {
        up: false,
        left: false,
        right: false,
        keyListener: function (event) {
                let state = (event.type == "keydown") ? true : false;

                switch (event.keyCode) {
                        case 37:
                                playerController.left = state; //left key 
                                break;
                        case 38:
                                playerController.up = state; //up key
                                break;
                        case 39:
                                playerController.right = state; //right key
                                break;
                }
        }

}

//event listeners

window.addEventListener('keydown', playerController.keyListener);

window.addEventListener('keyup', playerController.keyListener);


const playerRight = new Image();
playerRight.src = './images/dog_run.png'

const playerLeft = new Image();
playerLeft.src = './images/dog_run_left.png';

const playerJump = new Image();
playerJump.src = './images/dog_jump.png';

const playerStand = new Image();
playerStand.src = './images/dog_stand.png'


export const player = {
        x: 30,
        y: canvas.height - 170,
        x_velocity: 0,
        y_velocity: 0,

        isJumping: true,

        width: 180, //distance between each side screen and player
        height: 125, // distance between bottom and player 170 - 125 = 45

        frameX: 0,
        frameY: 0,
        spriteWidth: 302,
        spriteHeight: 210,
        frame: 18,

        lite: 10,

        hurt() {
                this.lite -= 10;
        },

        eatingCandy() {
                this.lite -= 5;
        },

        eatingFruit() {
                this.lite += 5;
        },

        update() {
                if (playerController.up && this.isJumping == false) {
                        this.y_velocity -= 50;
                        this.isJumping = true; //can jump to 50height, not more
                }

                if (playerController.left) this.x_velocity -= 0.5;

                if (playerController.right) this.x_velocity += 0.5;

                this.y_velocity += 1.1; //gravity
                this.x += this.x_velocity;
                this.y += this.y_velocity;
                this.x_velocity *= 0.9; //friction
                this.y_velocity *= 0.9; //friction

                // if player is falling below floor line

                if (this.y > canvas.height - 170) {
                        this.isJumping = false;
                        this.y = canvas.height - 170;
                        this.y_velocity = 0;
                }

                //if player is going off the left of the screen
                if (this.x < 30) this.x = 30;
                else if (this.x > canvas.width - 30 - this.width) this.x = canvas.width - 30 - this.width;


        },

        draw() {
                ctx.fillStyle = 'red';
                ctx.beginPath();
                // ctx.ellipse(this.x+this.width, this.y, this.width/1.5, this.height/2,0, 0, 2*Math.PI);
                ctx.fillRect(this.x, this.y, this.width, this.height)
                // ctx.fill();
                ctx.closePath();

                // ctx.save();

                if (playerController.right == true && playerController.up == false) {
                        ctx.drawImage(playerRight, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, this.x - 10, this.y - 8, this.spriteWidth / 1.5, this.spriteHeight / 1.5);

                        if (this.frameX >= 20) this.frameX = 0
                        else if (gameFrame % 2 === 0) this.frameX++
                }
                else if (playerController.left == true && playerController.up ==false) {
                        ctx.drawImage(playerLeft, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, this.x - 10, this.y - 8, this.spriteWidth / 1.5, this.spriteHeight / 1.5);

                        if (this.frameX >= 20) this.frameX = 0
                        else if (gameFrame % 2 === 0) this.frameX++
                }

                else if (playerController.left == false & playerController.right == false && playerController.up == false) {
                        ctx.drawImage(playerStand, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, this.x - 10, this.y - 8, this.spriteWidth / 1.5, this.spriteHeight / 1.5);
                        
                        if(this.frameX>1) this.frameX = 0;
                        else if(gameFrame % 50 === 0) this.frameX++

                }
                else if (playerController.up == true || playerController.up == true && playerController.right == true || playerController.up == true && playerController.left == true ) {
                        ctx.drawImage(playerJump, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, this.x - 10, this.y - 8, this.spriteWidth / 1.5, this.spriteHeight / 1.5);

                        if (this.frameX >= 17) this.frameX = 0
                        else if (gameFrame) this.frameX++;

                }

                // ctx.restore();

        }

}