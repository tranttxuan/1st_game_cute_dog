import { player } from './player.js';
import { canvas, ctx } from './canvas.js'
import { handlePresents } from './present.js';
import { handleObstacle} from './obstacles.js';

let score = 0;
let gameFrame = 0;


//Animation Loop

function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // draw the player
        player.update();
        player.draw();


        //draw obstacles
        handleObstacle();

        //draw presents:
        handlePresents();



        ctx.fillStyle = "red";
        ctx.font = "30px Arial";
        ctx.strokeText(`Health: ${player.lite}`, 10, 50)


        gameFrame++;
        requestAnimationFrame(animate);
}

animate();



export { gameFrame,score};