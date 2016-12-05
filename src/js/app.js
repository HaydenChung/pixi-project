import Frame from '../../classes/frame.js';
import Sprite from '../../classes/sprite.js';
import {resolution, backgroundColor} from "./init.js";

let app = document.querySelector('#app');
let frame = new Frame(resolution, backgroundColor);

frame.color(backgroundColor).put(app);

let cat = new Sprite('./sprite/image/cat.png');
cat.put(frame);