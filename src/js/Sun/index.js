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



const PIXELSIZE = 5;

class Sun {
    constructor({}) {

        this.position = POSITION;
        this.radius = RADIUS;

        this.speed = 25;

        this.getMap();
        this.updateMap();
        console.log('map  = ', this.map);
        canvas.addToDrawQueue(this.draw, 2);
    }


    getMap = () => {
        const rndColor = () => {
            const rnd = (min, max) => Math.max(min, Math.floor(Math.random() * max));
            return {
                color : [rnd(0, 50), rnd(75, 100), 50, 1],
                direction : -1,
            }
        }
        const numPixelsInRow = ratioToReal(RADIUS, canvas.canvas.width) / PIXELSIZE ;
        this.map = generateMap(numPixelsInRow, rndColor, 1);

        this.map.gradient = [
            [[25, 1], [75, 1], [50], [1]],
            [[50, 1], [75, 1], [50], [1]]
        ];
    }

    updateMap = () => {
        const {blocks, gradient} = this.map;

        // for (let y=0; y<blocks.length; y+=1) {
        //     for (let x=0; x<blocks[y].length; x+=1) {
        //         const {color, direction} = blocks[y][x];
                
        //         color[0] += direction;
        //         if (color[0] <= 1 || color[0] >= 20) {
        //             blocks[y][x].direction *= -1;
        //         }

        //         color[1] += direction;
        //         if (color[1] <= 50 || color[1] >= 80) {
        //             blocks[y][x].direction *= -1;
        //         }
        //     }
        // }

        for (let i=0; i<gradient.length; i+=1) {
            const g = gradient[i];
            g[0][0] += g[0][1];
            // g[1][0] += g[1][1];
            if (g[0][0] >= 30 || g[0][0] < 1) {
                g[0][1] *= -1;
            }
            if (g[1][0] >= 70 || g[1][0] < 50) {
                g[1][1] *= -1;
            }
        }

        setTimeout(this.updateMap, this.speed);
    }



    draw = ctx => {
        //draw square of color
        //sphere will convert to circle by drawing border of black around
        const {width, height} = canvas.canvas;
        const size = ratioToReal(this.radius, width);

        const origin = {
            x : ratioToReal(this.position.x, width),
            y : ratioToReal(this.position.y, height)
        }

        const position = {
            x : origin.x - (size / 2),
            y : origin.y - (size / 2) 
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(origin.x, origin.y, size / 2, 0, 2 * Math.PI);
        

        const {blocks, gradient} = this.map;

        const grd = ctx.createRadialGradient(origin.x, origin.y, size / 4, origin.x, origin.y, size / 2);
        for (let i=0; i<gradient.length; i+=1) {
            const g = gradient[i];
            grd.addColorStop(i / (gradient.length-1), `hsla(${g[0][0]}, ${g[1][0]}%, ${g[2][0]}%, ${g[3][0]})`);
        }

        ctx.fillStyle = grd;
        ctx.fill();

        ctx.clip();

        // for (let y=0; y<blocks.length; y+=1) {
        //     for (let x=0; x<blocks[y].length; x+=1) {
        //         const {color} = blocks[y][x];
        //         ctx.fillStyle = `hsla(${color[0]}, ${color[1]}%, ${color[2]}%, ${color[3]})`;
                
        //         // color[0] += 1;
        //         // if (color[0] > 50) {
        //         //     color[0] = 0;
        //         // }
        //         ctx.fillRect(position.x + (x * PIXELSIZE), position.y + (PIXELSIZE * y), PIXELSIZE, PIXELSIZE);
        //     }
        // }

        ctx.restore();
    }
}


export default Sun;