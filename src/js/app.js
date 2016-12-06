import {resolution, backgroundColor, Frame, Sprite} from "./init.js";

let app = document.querySelector('#app');
let frame = new Frame({resolution});

frame.color(backgroundColor).putOn(app);

let cat = new Sprite('./sprite/image/cat.png');
cat.putOn(frame);

cat.set({position:{x:96,y:128},scale:{x:1.5},anchor:{x:0.5,y:0.5}});

// let toggle = true;
// setInterval(() => {
//     if(toggle){
//         cat.hidden();
//     } else{
//         cat.appear();
//     }
//     toggle = toggle === true ? false : true ;
// },1000);

cat.move({rotation:0.01,position:{x:0.1}});



console.log('Running!!!');