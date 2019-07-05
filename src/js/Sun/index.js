import canvas from '../Canvas';

import {
    pointOnEllipse,
    ratioToReal
} from '../utils/math';
import {
    generateMap
} from '../utils/maps';

const POSITION = {
    x : 0.5,
    y : 0.5
}

const RADIUS = 0.3;

const COLORSHEET= [

];

const PIXELSIZE = 15;

class Sun {
    constructor({}) {

        this.position = POSITION;
        this.radius = RADIUS;

        this.getMap();
        canvas.addToDrawQueue(this.draw, 2);
    }


    getMap = () => {
        const rndColor = () => {
            const rnd = (min, max) => Math.max(min, Math.floor(Math.random() * max));
            return [rnd(0, 50), rnd(75, 100), 50, 1];
        }
        const numPixelsInRow = ratioToReal(RADIUS, canvas.canvas.width) / PIXELSIZE;
        console.log(numPixelsInRow);
        this.map = generateMap(numPixelsInRow, rndColor, 1);
        console.log(this.map);
        
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

        const {blocks} = this.map;

        for (let y=0; y<blocks.length; y+=1) {
            for (let x=0; x<blocks[y].length; x+=1) {
                const color = blocks[y][x];
                ctx.fillStyle = `hsla(${color[0]}, ${color[1]}%, ${color[2]}%, ${color[3]})`;
                
                color[0] += 1;
                if (color[0] > 50) {
                    color[0] = 0;
                }
                ctx.fillRect(position.x + (x * PIXELSIZE), position.y + (PIXELSIZE * y), PIXELSIZE, PIXELSIZE);
            }
        }

        ctx.restore();
    }
}


export default Sun;