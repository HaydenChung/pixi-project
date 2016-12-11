
import {resolution, 
    backgroundColor, 
    Frame, 
    Sprite,
    Animation,  
    } from "./init.js";

let app = document.querySelector('#app');
let frame = new Frame({resolution});

frame.color(backgroundColor).putOn(app);

let i = 0;
let playGround = document.querySelector('canvas');

playGround.addEventListener('click',(event)=> {
    pushNewCat(i,event);

    i++;
});

document.querySelector('canvas').addEventListener('touchstart',(event) => {
    pushNewCat(i,event);

    i++;
});

function pushNewCat(i,event) {
    let cats = new Sprite('./sprite/image/cat.png');

//Create random element here
    let positionX = Math.floor(Math.random()*800),
    positionY = Math.floor(Math.random()*800),
    rotation = Math.floor(Math.random()*6,-2),
    scale = Math.floor(Math.random()*3);

//Create negative rotation,so some would rotate left.
    rotation = i % 2 ? rotation*-1 : rotation;
//Headle the touchevent x,y position.
    if(typeof event.offsetX === 'undefined') {
        let rect = event.target.getBoundingClientRect();       
        event.offsetX = event.targetTouches[0].pageX - rect.left;
        event.offsetY = event.targetTouches[0].pageY - rect.top;
    }


    cats.putOn(frame);
    cats.set({ position:{'x':positionX,'y':positionY},rotation,anchor:{'x':0.5,'y':0.5},scale:{'x':scale,'y':scale}});
    
//Change from A to B in what time span,just like CSS.
    let catsRun = new Animation(cats);
    catsRun
    .add({position:{x:event.offsetX,y:event.offsetY},rotation:0,scale:{x:1,y:1}},2000)
    .add({position:{x:positionX,y:positionY},rotation,scale:{'x':scale,'y':scale}},2000)
    .add({},2000)
    .moveTo(true);
}
