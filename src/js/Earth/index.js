import canvas from '../Canvas';

import {
    pointOnEllipse,
    ratioToReal
} from '../utils/math';

import {
    generateMap
} from '../utils/maps';

import EarthImageSrc from '../../assets/earth.jpg';

const RADIUS = 0.1;

const PIXELSIZE = 10;

const EarthImage = new Image();


//sheet



class Earth {
    constructor({
        ellipse,
        angle,
    }) {

        

        this.ellipse = ellipse;
        this.angle= angle;
        this.radius = RADIUS;

        this.growthConfig = {
            current : 1,
            min : 0.5,
            max : 2,
            change : 0.01,
            currentDirection : 1
        }

        this.lastX = 360;

        this.speed = 150;

        this.Rotation = 0; //how far the planet has "rotated" 

        //this.getMap();
        EarthImage.onload = () => {
            this.drawQueueId = canvas.addToDrawQueue(this.draw, 5);
            this.playing = true;
        }
        EarthImage.src = EarthImageSrc;

        
        
    }

    set playing(bool) {
        this._playing = bool;
        if (bool) {
            this.updateAngle();
            this.updateSize();
            this.updateEarthAngle();
        }
    }

    get playing() {
        return this._playing;
    }


    updateAngle = () => {
        if (!this.playing) return;
        this.angle += 0.1;
        if (this.angle > 360) {
            this.angle = 0;
        }
        setTimeout(this.updateAngle, this.speed/10);
    }

    updateSize = () => {
        if (!this.playing) return;
        let {
            change,
            min,
            max,
            currentDirection
        } = this.growthConfig;
        
        const direction = this.angle >= 270 || this.angle <= 90 ? 1 : -1;
        if (direction !== currentDirection) {

            // if (direction === 1) {
            //     canvas.editDrawQueue(this.drawQueueId, this.draw, 20);
            // } else {
            //     canvas.editDrawQueue(this.drawQueueId, this.draw, 0);
            // }
            
            this.growthConfig.currentDirection = direction;
        }

        const nextSize = this.growthConfig.current + (change * direction);
        if (nextSize < max && nextSize > min) {
            this.growthConfig.current = nextSize;

            
        }
        
        setTimeout(this.updateSize, this.speed);
    }


    updateEarthAngle = () => {
        if (!this.playing) return;
        this.Rotation -= 1;
        const {width, height} = canvas.canvas;
        const {current} = this.growthConfig;
        const size = ratioToReal(this.radius * current, width);
        if (size * 2 * 3.125 + this.Rotation < size * 2) {
            //reset
            this.Rotation = 0;
            console.log('reset rotation');
        }

        setTimeout(this.updateEarthAngle, this.speed);
    }


    draw = ctx => {
        const {
            xRadius,
            yRadius
        } = this.ellipse;

        

        const {width, height} = canvas.canvas;

        const {x, y} = pointOnEllipse(ratioToReal(xRadius, width), ratioToReal(yRadius, height), this.angle);
        const delta = x - this.lastX;
        this.lastX = x;
        //console.log(delta);
        
        //add x and y to center of canvas (origin)
        const origin = {
            x : width / 2,
            y : height / 2,
        };


        //multiply by current size
        const {current} = this.growthConfig;
        const size = ratioToReal(this.radius * current, width);

        ctx.save();
        ctx.beginPath();
        ctx.arc(origin.x + x, origin.y + y, size, 0, 2 * Math.PI);
        
        ctx.clip();

        this.drawEarth(ctx, origin , x, y, size, delta);
        ctx.strokeStyle="red";
        //ctx.stroke();

        ctx.restore();
    }

    drawEarth = (ctx, origin , x, y, size, delta) => {
        ctx.save();
        
        const left = origin.x + x - size; //left point of circle
        const top = origin.y + y; // top point of circle
        
        //delta = 5 then rotation = -6 (1 less = good)
        // delta = -4 then rotation = +3
        // this.Rotation -= 1;
        // //console.log('rotation = ', -delta - 1);
        // if (size * 2 * 3.125 + this.Rotation < size * 2) {
        //     //reset
        //     this.Rotation = 0;
        //     console.log('reset rotation');
        // }
        
        const earthWidth = size * 2 * 3.125;
        const earthHeight = size * 2;

        ctx.translate(left, top);
        ctx.arc(0, 0, 10, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.rotate(0, Math.PI / 180);
        ctx.drawImage(EarthImage, this.Rotation, -earthHeight/2, earthWidth, earthHeight);
        ctx.restore();
    }
}


export default Earth;