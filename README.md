# pixi-project
Where I learn to build with pixi.

<hr>

Learning to use pixi.js.
The project should build with es6's syntax and oop structure.

5-12-2016   .......start from here.

6-12-2016   Start working on sprite!

7-12-2016   Add a animation class to handle sprite motion.Add a simple demo too,please don't laugh at me....

PS.Use firefox or IE-edge to view the index page,or else host a local server,for Chrome and some other browser won't load local image,(Cross-origin request.)it seem PIXI has a method to work with this issue,will look into it.

PS2.The app.js file lay in the build folder was compressed,check the src folder instead.

<hr>

app.js
<pre>
import {resolution, 
    backgroundColor, 
    Frame, 
    Sprite,
    Animation, 
    resources, 
    loader} from "./init.js";

import check from '../../function/checkDefine.js'

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

</pre>

The idea is to create an object than controt it's behaviour with command like set/put/add/run.
I would love to keep it as simple as it been.

Here's how it look like: https://rawgit.com/HaydenChung/pixi-project/master/index.html
