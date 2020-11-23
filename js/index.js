
import {player} from './player.js';
import {canvas, ctx} from "./canvas.js";


let score = 0;
let gameFrame = 0;



//Animation Loop

function animate(){
        ctx.clearRect(0,0,canvas.width, canvas.height);
  
        //draw the player
        player.update();
        player.draw();
        
        gameFrame++;
        requestAnimationFrame(animate);
}

animate();



export {gameFrame};