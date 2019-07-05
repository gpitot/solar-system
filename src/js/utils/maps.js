



const generateMap = (numPixelsInRow, colorFN, multiplier) => {
    const map = {
        blocks : [],
        pos : {
            x : 0,
            y : -numPixelsInRow * 10,
            initialX : 0,
            initialY : -numPixelsInRow * 10,
        }
    }

    for (let x=0; x<numPixelsInRow * multiplier; x+= 1) {
        const col = [];
        for (let y=0; y<numPixelsInRow * multiplier; y+=1) {
            col.push(colorFN());
        }
        map.blocks.push(col);
    }
    return map;
}


export {
    generateMap
}