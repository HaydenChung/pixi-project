
import {resolution, 
    backgroundColor, 
    Frame, 
    Sprite,
    Animation,  
    } from "./init.js";

let app = document.querySelector('#app');
let frame = new Frame({resolution});

frame.color(backgroundColor).putOn(app);

let cat = new Sprite('./sprite/image/cat.png');

cat.putOn(frame);
cat.set( {
    position:{x:128,y:128},
    anchor:{x:0.5,y:0.5},
    scale:{x:0.5,y:0.5} 
});

let catRun = new Animation(cat);
catRun.add( {position:{x:1}},1500 )
        .add( {position:{y:-1},rotation:0.01,scale:{x:0.01,y:0.01}},1500 )
        .add( {position:{x:-1}},1500)
        .add( {position:{y:1},rotation:-0.01,scale:{x:-0.01,y:-0.01}},1500)
        .run(true);

setTimeout(catRun.stop.bind(catRun) , 12000);

setTimeout(() => {
    catRun.add( {position:{x:-1,y:-1}},3000 )
            .run();
    },14000);

console.log('Running!!!');