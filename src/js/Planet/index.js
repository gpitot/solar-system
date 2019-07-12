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
        texture
    }) {
        this.size = size;
        this.ellipse = ellipse;
        this.rotation = rotation;
        this.texture = texture;

        this.speed= 20;

        this.currentZIndex = 5;

        this.loadTexture(texture, (img) => {
            this.texture.img = img;
            this.drawQueueId = canvas.addToDrawQueue(this.draw, this.currentZIndex);
            this.updatePlanet();
        });

        
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
        if (angle > 0 && angle < 180 && this.currentZIndex !== 5) {
            this.currentZIndex = 5;
            canvas.editDrawQueue(this.drawQueueId, this.draw, this.currentZIndex);
        } else if (angle >= 180 && angle <= 360 && this.currentZIndex !== 0) {
            this.currentZIndex = 0;
            canvas.editDrawQueue(this.drawQueueId, this.draw, this.currentZIndex);
        }        
    }

    updateRotation = () => {
        this.rotation -= 1;

        const {width} = canvas.canvas;
        const {radius, growth} = this.size;
        const size = ratioToReal(radius * growth, width);

        const {img, ratio} = this.texture;

        if (size * 2 * ratio + this.rotation < size * 2) {
            //reset
            this.rotation = 0;
            console.log('reset rotation');
        }
        
    }


    updatePlanet = () => {
        this.updateSize();
        this.updatePosition();
        this.updateRotation();

        setTimeout(this.updatePlanet, this.speed);
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

        const left = x - size ; //left point of circle
        const top = y - size; // top point of circle

        const earthWidth = size * 2 * ratio;
        const earthHeight = size * 2;

        
        //ctx.rotate(0, Math.PI / 180);
        ctx.fillStyle = "red";
        ctx.drawImage(img, left + this.rotation, top, earthWidth, earthHeight)

        ctx.restore();
    }


    draw = ctx => {
        ctx.save();

        this.drawArcClip(ctx);
        
        
        ctx.restore();
    }
}


export default Planet;