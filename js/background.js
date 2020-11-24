import {canvas, ctx} from './canvas.js';

const background = new Image();
background.src = './images/BG.png';
const BG = {
        x1:0,
        x2: canvas.width,
        y:0,
        width: canvas.width,
        height: canvas.height 
}

export function handleBackground(){
        if (BG.x1 <= -BG.width + 1) BG.x1 = BG.width;
        else BG.x1 -= 1;

        if (BG.x2 <= -BG.width + 1) BG.x2 = BG.width;
        else BG.x2 -= 1;

        ctx.drawImage(background, BG.x1, BG.y, BG.width, BG.height);
        ctx.drawImage(background, BG.x2, BG.y, BG.width, BG.height);
}