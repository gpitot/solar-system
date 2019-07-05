import canvas from '../Canvas';

import {
    pointOnEllipse,
    ratioToReal
} from '../utils/math';


const POSITION = {
    x : 0.5,
    y : 0.5
}

const RADIUS = 0.3;

const COLORSHEET= [

];

const PIXELSIZE = 10;

class Sun {
    constructor({}) {

        this.position = POSITION;
        this.radius = RADIUS;

        canvas.addToDrawQueue(this.draw, 2);
    }



    draw = ctx => {
        //draw square of color
        //sphere will convert to circle by drawing border of black around
        const {width, height} = canvas.canvas;
        const size = ratioToReal(this.radius, width);
        const position = {
            x : ratioToReal(this.position.x, width) - (size / 2),
            y : ratioToReal(this.position.y, height) - (size / 2) 
        }



        ctx.save();
        ctx.beginPath();
        ctx.arc(ratioToReal(this.position.x, width), ratioToReal(this.position.y, height), size / 2, 0, 2 * Math.PI);


        ctx.clip();
        for (let x=0; x < size; x += PIXELSIZE) {
            for (let y=0; y < size; y += PIXELSIZE) {
                const rndNum = Math.floor(Math.random() * 125) + 130;
                ctx.fillStyle = `rgb(${rndNum}, 100, 100)`;
                
                ctx.fillRect(position.x + x, position.y + y, PIXELSIZE, PIXELSIZE);
            }
        }

        ctx.restore();
    }
}


export default Sun;