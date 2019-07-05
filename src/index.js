import style from "./sass/index.scss";

import Earth from './js/Earth';
import {
    pointOnEllipse
} from './js/utils/math';
import Sun from "./js/Sun";
import Stars from "./js/Stars";

new Earth({
    ellipse : {
        xRadius : 0.45,
        yRadius : 0.3
    },
    angle : 0,
})


new Sun({

})


new Stars(1000);