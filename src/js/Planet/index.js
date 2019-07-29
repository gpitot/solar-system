import canvas from '../Canvas';
import {
    pointOnEllipse,
    ratioToReal
} from '../utils/math';


class Planet {
    constructor({
        size,
        ellipse,
        rotation,
        texture,
        speed=20,
        zIndex
    }) {
        this.size = size;
        this.size.initialRadius = this.size.radius;
        this.playing = false;
        
        this.ellipse = ellipse;
        this.ellipse.initialXRadius = ellipse.xRadius;
        this.ellipse.initialYRadius = ellipse.yRadius;

        this.rotation = rotation;
        this.texture = texture;

        this.speed = speed;
        this.initialSpeed = speed;

        this.currentZIndex = zIndex;

        this.loadTexture(texture, (img) => {
            //get ratio
            this.texture.ratio = img.naturalWidth / img.naturalHeight;
            this.texture.img = img;
            this.drawQueueId = canvas.addToDrawQueue(this.draw, this.currentZIndex);
            this.playing = true;
        });

        
    }


    set speed(speed) {
        this._speed = speed;
    }
    get speed() {
        return this._speed;
    }

    set playing(bool) {
        const setPlayingAgain = bool && !this._playing;
        this._playing = bool;
        if (setPlayingAgain) {
            this.updatePlanet();
        }
    }
    get playing() {
        return this._playing;
    }

    loadTexture = (texture, cb) => {
        const img = new Image();
        img.onload = () => {cb(img)};
        img.src = texture.src;
    }

    updateSize = () => {
        const {
            min,
            max,
            
        } = this.size;

        const {angle} = this.ellipse;
        
        const direction = angle >= 270 || angle <= 90 ? 1 : -1;
        
        let diff;
        if (direction > 0) {
            if (angle <= 90) {
                diff = 180 - 90 - angle;
            } else {
                diff = 180 - (angle - 270);
            }
            diff = 180 - diff;
        } else {
            diff = 270 - angle;
        }
        
        const changePerDegree = (max - min) / 180;
        const growth = changePerDegree * diff;
        this.size.growth = growth + min;
    }

    updatePosition = () => {
        const {angle} = this.ellipse;

        this.ellipse.angle += 1;
        if (angle >= 360) {
            this.ellipse.angle = 0;
        }


        //edit zindex
        //if angle > 0 && angle < 180 then infront
        if (angle > 0 && angle < 180 && this.currentZIndex < 0) {
            this.currentZIndex *= -1;
            canvas.editDrawQueue(this.drawQueueId, this.draw, this.currentZIndex);

        } else if (angle >= 180 && angle <= 360 && this.currentZIndex > 0) {
            this.currentZIndex *= -1;
            canvas.editDrawQueue(this.drawQueueId, this.draw, this.currentZIndex);
        } 
       
    }

    updateRotation = () => {
        this.rotation += 0.5;

        if (this.rotation >= this.texture.rotationReset) {
            //reset
            this.rotation = 0;
        }
        
    }


    updatePlanet = () => {
        //this.updateSize();
        
        this.updatePosition();
        this.updateRotation();

        if (this.playing) {
            setTimeout(this.updatePlanet, this.speed);
        }
        
    }


    drawArcClip = ctx => {

        //set initial canvas rotation 
        ctx.beginPath();
        const {
            xRadius,
            yRadius,
            angle,
            rotation
        } = this.ellipse;

        

        const {width, height} = canvas.canvas;

        

        const origin = {
            x : width / 2,
            y : height / 2,
        };

        const {
            radius,
            growth
        } = this.size;

        ctx.save();
        ctx.translate(origin.x, origin.y);
        ctx.rotate(rotation * Math.PI / 180);


        const size = ratioToReal(radius * growth, width);
        const {x, y} = pointOnEllipse(ratioToReal(xRadius, width), ratioToReal(yRadius, height), angle);

        ctx.arc(x, y, size, 0, 2 * Math.PI);
        

        ctx.clip();
        //
        const coords = {
            position : {x, y},
            size
        };

        this.drawTexture(ctx, coords);

        ctx.strokeStyle="white";
        ctx.stroke();
        ctx.closePath();

        ctx.restore();

        

       
    }


    drawTexture = (ctx, coords) => {
        ctx.save();
        const {position: {x, y} , size} = coords;
        
        const {img, ratio} = this.texture;

        const left = x - size; //left point of circle
        const top = y - size; // top point of circle

        
        const earthWidth = size * 2 * ratio;
        const earthHeight = size * 2;

        
        //ctx.rotate(0, Math.PI / 180);
        
        const percentageRotated = this.rotation * earthWidth / 100;


        ctx.drawImage(img, left - percentageRotated , top, earthWidth, earthHeight)

        ctx.restore();
    }


    draw = ctx => {
        ctx.save();

        this.drawArcClip(ctx);
        
        
        ctx.restore();
    }
}


export default Planet;