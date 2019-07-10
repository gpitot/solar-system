import style from "./sass/index.scss";

import Earth from './js/Earth';
import {
    pointOnEllipse
} from './js/utils/math';
import Sun from "./js/Sun";
import Stars from "./js/Stars";

const earth = new Earth({
    ellipse : {
        xRadius : 0.45,
        yRadius : 0.2
    },
    angle : 0,
})


new Sun({

})


//new Stars(1000);


const slow = document.getElementById('slow');
const fast = document.getElementById('fast');
const play = document.getElementById('play');

slow.addEventListener('click', ()=>{
    earth.speed += 10;
});

fast.addEventListener('click', ()=>{
    earth.speed -= 10;
    console.log(earth.speed);
});

play.addEventListener('click', ()=>{
    earth.playing = !earth.playing;
    console.log(earth.playing);
});