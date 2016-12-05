import {resolution, backgroundColor, Frame, Sprite} from "./init.js";

let app = document.querySelector('#app');
let frame = new Frame({resolution});

frame.color(backgroundColor).putOn(app);

let cat = new Sprite('./sprite/image/cat.png');
cat.putOn(frame);

cat.set({position:{x:96,y:128},scale:{x:1.5},rotation:0.5});

let toggle = true;
setInterval(() => {
    if(toggle){
        cat.hidden();
    } else{
        cat.appear();
    }
    toggle = toggle === true ? false : true ;
},1000);

console.log('Running!!!');