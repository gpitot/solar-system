import style from "./sass/index.scss";

import Earth from './js/Earth';
import {
    pointOnEllipse
} from './js/utils/math';
import Sun from "./js/Sun";
import Planet from "./js/Planet";
import Stars from "./js/Stars";
import canvas from './js/Canvas'

//textures
import textureEarth from './assets/earth.jpg';
import textureMars from './assets/mars.jpg';





const sun = new Sun({

})



//mercury
const mercury = new Planet({
    size : {
        radius : 0.383,
        growth: 1,
        min : 0.6,
        max : 1.8,
    },
    ellipse : {
        xRadius : 0.075,
        yRadius : 0.03,
        angle : 0,
        rotation : 340
    },
    rotation : 30,
    texture : {
        src : 'https://www.solarsystemscope.com/textures/download/2k_mercury.jpg',
        rotationReset : 30
    }, 
    speed : 30,
    zIndex : 2
});

//venus
const venus = new Planet({
    size : {
        radius : 0.815,
        growth: 1,
        min : 0.6,
        max : 1.8,
    },
    ellipse : {
        xRadius : 0.1,
        yRadius : 0.04,
        angle : 45,
        rotation : 340
    },
    rotation : 0,
    texture : {
        src : 'https://www.solarsystemscope.com/textures/download/2k_venus.jpg',
        rotationReset : 30
    }, 
    speed : 30,
    zIndex : 3
});

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
        angle : 90,
        rotation : 340
    },
    rotation : 0,
    texture : {
        src : textureEarth,
        rotationReset : 68
    },
    zIndex : 4,
});



//mars
const mars = new Planet({
    size : {
        radius : 0.107,
        growth: 1,
        min : 0.6,
        max : 1.8,
    },
    ellipse : {
        xRadius : 0.175,
        yRadius : 0.07,
        angle : 135,
        rotation : 340
    },
    rotation : 0,
    texture : {
        src : 'https://www.solarsystemscope.com/textures/download/2k_mars.jpg',
        rotationReset : 30
    }, 
    speed : 30,
    zIndex : 5
});

//jupiter
const jupiter = new Planet({
    size : {
        radius : 3,
        growth: 1,
        min : 0.6,
        max : 1.8,
    },
    ellipse : {
        xRadius : 0.2,
        yRadius : 0.08,
        angle : 180,
        rotation : 340
    },
    rotation : 0,
    texture : {
        src : 'https://www.solarsystemscope.com/textures/download/2k_jupiter.jpg',
        rotationReset : 30
    }, 
    speed : 30,
    zIndex : 6
});


//saturn
const saturn = new Planet({
    size : {
        radius : 2,
        growth: 1,
        min : 0.6,
        max : 1.8,
    },
    ellipse : {
        xRadius : 0.225,
        yRadius : 0.09,
        angle : 225,
        rotation : 340
    },
    rotation : 0,
    texture : {
        src : 'https://www.solarsystemscope.com/textures/download/2k_saturn.jpg',
        rotationReset : 30
    }, 
    speed : 30,
    zIndex : 7
});



//uranus
const uranus = new Planet({
    size : {
        radius : 1.5,
        growth: 1,
        min : 0.6,
        max : 1.8,
    },
    ellipse : {
        xRadius : 0.25,
        yRadius : 0.1,
        angle : 270,
        rotation : 340
    },
    rotation : 0,
    texture : {
        src : 'https://www.solarsystemscope.com/textures/download/2k_uranus.jpg',
        rotationReset : 30
    }, 
    speed : 30,
    zIndex : 8
});



//neptune
const neptune = new Planet({
    size : {
        radius : 1.2,
        growth: 1,
        min : 0.6,
        max : 1.8,
    },
    ellipse : {
        xRadius : 0.275,
        yRadius : 0.11,
        angle : 315,
        rotation : 340
    },
    rotation : 0,
    texture : {
        src : 'https://www.solarsystemscope.com/textures/download/2k_neptune.jpg',
        rotationReset : 30
    }, 
    speed : 30,
    zIndex : 9
});









const planets = [
    mercury,
    venus,
    earth,
    mars,
    jupiter,
    saturn,
    uranus,
    neptune,

];

let playing = true;
let speed = 1;


//new Stars(1000);


let config = {
    speed : 1,
    scale : 0.03,
    radius : 1,
}




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