import canvas from '../Canvas';

import {
    pointOnEllipse,
    ratioToReal
} from '../utils/math';

import {
    generateMap
} from '../utils/maps';

const RADIUS = 0.05;

const PIXELSIZE = 10;


//sheet



class Earth {
    constructor({
        ellipse,
        angle,
    }) {
        this.ellipse = ellipse;
        this.angle= angle;
        this.radius = RADIUS;

        this.speed = 25;

        this.getMap();
        

        canvas.addToDrawQueue(this.draw, 5);
        this.updateAngle();
    }


    getMap = () => {
        const rndColor = () => {
            const rnd = () => Math.floor(Math.random() * 125) + 130;
            return `rgb(0, ${rnd()}, ${rnd()})`;
        }
        const numPixelsInRow = ratioToReal(RADIUS, canvas.canvas.width) / PIXELSIZE;

        this.map = generateMap(numPixelsInRow, rndColor, 5);
        
    }

    updateAngle = () => {
        this.angle += 1;
        if (this.angle > 360) {
            this.angle = 0;
        }
        setTimeout(this.updateAngle, this.speed);
    }


    draw = ctx => {
        const {
            xRadius,
            yRadius
        } = this.ellipse;

        const {width, height} = canvas.canvas;

        const {x, y} = pointOnEllipse(ratioToReal(xRadius, width), ratioToReal(yRadius, height), this.angle);

        //add x and y to center of canvas (origin)
        const origin = {
            x : width / 2,
            y : height / 2,
        };

        const size = ratioToReal(this.radius, width);

        ctx.save();
        ctx.beginPath();
        ctx.arc(origin.x + x, origin.y + y, size, 0, 2 * Math.PI);
        // ctx.strokeStyle = "red";
        // ctx.stroke();
        ctx.clip();


        const left = origin.x + x - size; //left point of circle
        const top = origin.y + y - size; // top point of circle
       
        const xDiff = -(PIXELSIZE / 4);
        const yDiff = PIXELSIZE / 10;

        const {pos : mapPos , blocks} = this.map;
        const blockPos = {
            left : left + mapPos.x,
            top : top - (size ) + mapPos.y
        }
        this.drawEarthBlocks(ctx, blockPos, blocks);

        mapPos.x += xDiff;
        mapPos.y += yDiff;

        if (mapPos.x < -(PIXELSIZE * (blocks[0].length / 2))) {
            mapPos.x = 0;
            mapPos.y = mapPos.initialY;
        }

        ctx.restore();
    }

    drawEarthBlocks = (ctx, {left, top}, blocks) => {
        //x y is origin
        for (let y=0; y<blocks.length; y+=1) {
            for (let x=0; x<blocks[y].length; x+=1) {
                
                ctx.fillStyle = blocks[y][x];

                ctx.fillRect(left + (x * PIXELSIZE), top + (y * PIXELSIZE), PIXELSIZE, PIXELSIZE);
            }
        }
    }
}


export default Earth;