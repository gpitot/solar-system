import canvas from '../Canvas';

import {
    pointOnEllipse,
    ratioToReal
} from '../utils/math';

const RADIUS = 0.05;

const PIXELSIZE = 10;

class Earth {
    constructor({
        ellipse,
        angle,
    }) {
        this.ellipse = ellipse;
        this.angle= angle;
        this.radius = RADIUS;

        this.speed = 25;


        canvas.addToDrawQueue(this.draw, 5);
        this.updateAngle();
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

        // ctx.fillStyle = "red";
        // ctx.beginPath();
        // ctx.arc(origin.x + x, origin.y + y, size, 0, 2 * Math.PI);
        // ctx.stroke();
        // ctx.fill();
        // ctx.closePath();

        ctx.save();
        ctx.beginPath();
        ctx.arc(origin.x + x, origin.y + y, size, 0, 2 * Math.PI);


        ctx.clip();
        const left = origin.x + x - size;
        const top = origin.y + y - size;
        for (let xx=0; xx < size * 2; xx += PIXELSIZE) {
            for (let yy=0; yy < size * 2; yy += PIXELSIZE) {
                const rndNum = Math.floor(Math.random() * 125) + 130;
                ctx.fillStyle = `rgb(0, ${rndNum}, ${rndNum})`;
                
                ctx.fillRect(left + xx, top + yy, PIXELSIZE, PIXELSIZE);
            }
        }

        ctx.restore();
    }
}


export default Earth;