

const pointOnEllipse = (xRadius, yRadius, angle) => {
    const t = Math.tan(angle / 360 * Math.PI);
    const x = xRadius * (1 - t ** 2) / (1 + t ** 2);
    const y = yRadius * 2 * t / (1 + t ** 2);
    return {
        x,
        y
    }
}


const ratioToReal = (number, realSize) => {
    return number * realSize;
}


export {
    pointOnEllipse,
    ratioToReal
}