import style from "./sass/index.scss";

import Earth from './js/Earth';
import {
    pointOnEllipse
} from './js/utils/math';
import Sun from "./js/Sun";

new Earth({
    ellipse : {
        xRadius : 0.4,
        yRadius : 0.2
    },
    angle : 0,
})


new Sun({

})