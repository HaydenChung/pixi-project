# pixi-project
Where I learn to build with pixi.

<hr>

Learning to use pixi.js.
The project should build with es6's syntax and oop structure.

5-12-2016   .......start from here.

6-12-2016   Start working on sprite!

7-12-2016   Add a animation class to handle sprite motion.Add a simple demo too,please don't laugh at me....

12-12-2016  Try to refine the animation class then add a new feature,now it need a refine again...
            The new function is cool thought,now the animate could bind with absolute value,from A to B in given time,just like the CSS3 animation.
            Find out move the demo.

PS.Use firefox or IE-edge to view the index page,or else host a local server,for Chrome and some other browser won't load local image(Cross-origin request.).

PS2.The app.js file lay in the build folder was compressed,check the src folder instead.

<hr>

app.js
<pre>

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

</pre>

The idea is to create an object than controt it's behaviour with commands like set/put/add/run.
I would love to keep it as simple as it be.

Here's how it looks: https://rawgit.com/HaydenChung/pixi-project/master/index.html
