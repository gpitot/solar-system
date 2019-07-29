
class Canvas {
    constructor({element, dimensions}) {
        this.canvas = element;
        this.ctx = element.getContext('2d');
        this.queue = [];


        const {width, height } = dimensions;
        this.canvas.width = width;
        this.canvas.height = height;


        this.listenerFNs = {};

        this.currentDrawQueueID = -1;
        this.draw();
    }

    addListenerFN = (type, func) => {
        if (this.listenerFNs[type]) {
            this.listenerFNs[type].push(func);
        } else {
            this.listenerFNs[type] = [func];
            this.canvas.addEventListener(type, this.listenerActivates);
        }
    }

    listenerActivates = (e) => {
        const funcs = this.listenerFNs[e.type];
        if (funcs) {
            funcs.map(fn => fn(e));
        }
    }


    editDrawQueue = (drawQueueID, drawFN, zIndex) => {
        if (this.removeFromDrawQueue(drawQueueID)) {
            this.addToDrawQueue(drawFN, zIndex, drawQueueID, );
        }
    }

    removeFromDrawQueue = (drawQueueID) => {
        for (let i=this.queue.length - 1; i >= 0; i-=1) {
            if (this.queue[i].queueID === drawQueueID) {
                this.queue.splice(i, 1);
                return true;
            }
        }
        return false;
    }


    addToDrawQueue = ( drawFN, zIndex, drawQueueID = null,) => {
        //queue is ordered highest to lowest
        //because when drawing i will loop backwards and remove elements as we go
        if (drawQueueID === null) {
            this.currentDrawQueueID += 1;
            drawQueueID = this.currentDrawQueueID;
        }
        
        
        let added = false;

        for (let i=this.queue.length - 1; i >= 0; i-=1) {
            if (zIndex >= this.queue[i].zIndex) {
                //inserts new drawing into correct order
                this.queue.splice(i+1, 0, {
                    queueID : drawQueueID,
                    drawFN,
                    zIndex
                });
                added = true;
                break;
            }
        }
        
        if (added === false) {
            this.queue.unshift({
                queueID : drawQueueID,
                drawFN,
                zIndex
            })
        }
        return drawQueueID;
    }


    draw = () => {
        
        //clear canvas
        this.ctx.fillStyle = "black";


        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        //draw queue
        for (let i=0; i<this.queue.length; i+=1) {
            this.queue[i].drawFN(this.ctx);
        }
        
        requestAnimationFrame(this.draw);
    }
}

const canvas = new Canvas({
    element : document.getElementById('solar'),
    dimensions : {
        width : window.innerWidth,
        height : window.innerHeight
        // width : 800,
        // height : 600
    }
})


export default canvas;