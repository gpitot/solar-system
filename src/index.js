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





const sun = new Sun({

})

//earth
const earth = new Planet({
    size : {
        radius : 1,
        growth: 1,
        min : 0.6,
        max : 1.8,
    },
    ellipse : {
        xRadius : 0.15,
        yRadius : 0.06,
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


//mars
const mars = new Planet({
    size : {
        radius : 0.532,
        growth: 1,
        min : 0.6,
        max : 1.8,
    },
    ellipse : {
        xRadius : 0.15,
        yRadius : 0.06,
        angle : 0,
        rotation : 340
    },
    rotation : 0,
    texture : {
        src : textureMars,
        rotationReset : 30
    }, 
    speed : 30,
    zIndex : 4
});





//new Stars(1000);
let config = {
    speed : 1,
    scale : 0.03,
    radius : 1,
}

const planets = [
    earth,
    mars
];



function updatePlanets() {
    const {scale, speed, radius} = config;
    planets.forEach(planet => {
        planet.size.radius = planet.size.initialRadius * scale;
        planet.ellipse.xRadius = planet.ellipse.initialXRadius * radius;
        planet.ellipse.yRadius = planet.ellipse.initialYRadius * radius;

        planet.speed = planet.initialSpeed * speed;
    });

    sun.radius = scale * sun.initialRadius;
}

updatePlanets();

// function handleScroll(e) {
//     if (e.deltaY > 0) {
//         //scroll down = smaller
//         if (config.scale > 0) {
//             config.scale -= 0.01;
//             config.radius += 0.01;
//         }
        
//     } else {
//         config.scale += 0.01;
//         config.radius -= 0.01;
//     }
//     console.log('OCCURS');
//     updatePlanets();
    
// }
// console.log(earth);
// window.addEventListener('wheel', handleScroll);
function handlePause() {
    planets.forEach(planet => planet.playing = !planet.playing);
}

document.getElementById('play').addEventListener('click', handlePause);
document.getElementById('fast').addEventListener('click', ()=> {
    config.speed -= 0.1;
    updatePlanets();
});

document.getElementById('slow').addEventListener('click', ()=> {
    config.speed += 0.1;
    updatePlanets();
});