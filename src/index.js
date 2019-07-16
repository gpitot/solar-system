import style from "./sass/index.scss";

import Earth from './js/Earth';
import {
    pointOnEllipse
} from './js/utils/math';
import Sun from "./js/Sun";
import Planet from "./js/Planet";
import Stars from "./js/Stars";


//textures
import textureEarth from './assets/earth.jpg';
import textureMars from './assets/mars.jpg';

// const earth = new Earth({
//     ellipse : {
//         xRadius : 0.45,
//         yRadius : 0.2
//     },
//     angle : 0,
// })


new Sun({

})

//earth
new Planet({
    size : {
        radius : 0.1,
        growth: 1,
        min : 0.6,
        max : 1.8,
    },
    ellipse : {
        xRadius : 0.45,
        yRadius : 0.2,
        angle : 0,
        rotation : 340
    },
    rotation : 0,
    texture : {
        src : textureEarth,
        rotationReset : 68
    },
    zIndex : 3,
});


// mars
new Planet({
    size : {
        radius : 0.15,
        growth: 1,
        min : 0.4,
        max : 2,
    },
    ellipse : {
        xRadius : 0.35,
        yRadius : 0.4,
        angle : 0,
        rotation : 25
    },
    rotation : 0,
    texture : {
        src : textureMars,
        rotationReset : 50
    }, 
    speed : 30,
    zIndex : 4
});





//new Stars(1000);

