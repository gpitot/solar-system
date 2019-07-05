import canvas from '../Canvas';


class Stars {
    constructor(numStars) {
        this.stars = [];
        this.config = {
            maxSize : 10,
        
        }

        this.starFlickerSpeed = 120;


        this.createStars(numStars);
        
        canvas.addToDrawQueue(this.draw, 0);
        this.updateStars();
    }


    updateStars = () => {
        for (let i=0; i<this.stars.length; i+=1) {
            this.stars[i].rotation += 1;
            if (this.stars[i].rotation > 360) {
                this.stars[i].rotation = 0;
            }
        }

        setTimeout(this.updateStars, this.starFlickerSpeed);
    }

    createStars = (numStars) => {
        for (let i=0; i<numStars; i+=1) {
            this.stars.push(this.createStar());
        }
    }

    createStar = () => {
        const {width ,height} = canvas.canvas;
        const {maxSize} = this.config;

        return {
            position : {
                x : Math.floor(Math.random() * width),
                y : Math.floor(Math.random() * height)
            },
            radius : Math.floor(Math.random() * maxSize),
            color : 'white',
            rotation : Math.floor(Math.random() * 360)
        }
    }


    draw = ctx => {
        for (let i=0; i<this.stars.length; i+=1) {
            const {
                position : {
                    x, y
                },
                radius,
                color,
                rotation
            } = this.stars[i];
            
            // ctx.beginPath();
            // ctx.arc(x, y, radius, 0, 2 * Math.PI);
            // ctx.fillStyle = color;
            // ctx.fill();
            // ctx.closePath();
            ctx.save();
            ctx.fillStyle = color;
            ctx.translate(x + radius / 2, y + radius / 2);
            ctx.rotate(rotation, Math.PI / 180);
            ctx.fillRect(-radius/2, -radius/2, radius, radius);
            ctx.restore();

            

        }
    }
}

export default Stars;