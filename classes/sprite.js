import {
    orgSprite,
    resources,
    loader,
    Frame
} from '../src/js/init.js';

import check from '../function/checkDefine.js'

export default class Sprite {
    constructor(src){
        if(typeof src != 'string') throw new Error('Sprite class need string as path to the image file.')
        this.src = src;
        this.stopLoop = false;
        this.toDo = [];
        //this.multiple = Array.isArray(src);
        this.loaded = new Promise((resolve, reject) =>{
            //Pass the promise's callbacks to current object.
            this.onResolve = resolve;
            this.onReject = reject;
        });
    }

    add( {position,size,scale,rotation,anchor,pivot},time ) {
        this.toDo.push(arguments);
        return this;
    }

    run() {
        let toDo = this.toDo;
        this.toDo = [];

        //Prev is a promise object return from the center of the nest.
        toDo.reduce((prev, newToDo) => {
            //This statement waiting for the prev promise,
            //when it fulfilled it will create the next promise. 
            return prev.then(() => {
                this.move( newToDo[0] );
                //A new promise created,the resolve statement where holded
                //in the setTimeout chamber.
                return new Promise((resolve) => {
                    setTimeout(resolve, newToDo[1]);
                });
            });
        //The initial promise.
        },Promise.resolve()).
        //Do you notice the reduce syntax already ended.
        //Here lay the last 'than'.
        then(() =>{
            this.stop();
        })
    }

    stop() {
        // this.stopLoop = true;
        cancelAnimationFrame(this.loop);
    }

    stopMove() {
        this.stopLoop = true;
    }

    load() {
        loader.add(this.src);
    }

    putOn(frame) {
        if(frame instanceof Frame) {
            this.frame = frame;
            
            if(check(resources[this.src])) {
                loader.load(() =>{
                    this.sprite = new orgSprite(
                        resources[this.src].texture
                    );
                    frame.stage.addChild(this.sprite);
                    frame.renderer.render(frame.stage);
                    this.onResolve('Already loaded');
                });
                return true;
            }

            //Use the loader callback to send out promise.
            loader.add({url: this.src,crossOrigin: true})
            .load(() => {
                this.sprite = new orgSprite(
                    resources[this.src].texture
                );
                frame.stage.addChild(this.sprite);
                frame.renderer.render(frame.stage);
                //Sending out this.onload's promised state.
                this.onResolve('It\'s a go');
            });
            return true;
        } else {
            console.log('Make sure:',frame,'is a Frame object.')
        };

    }

    exists(item) {
        return (typeof this[item] != 'undefined');
    }

    get(item) {
        if(this.exists()) return this[item];        
        return false;
    };

    // set(key,value) {
    //     if(this.exists()) return this[key] = value;        
    //     return false;
    // }

    delete() {
        this.loaded.then((res) => {
            if(this.exists('sprite')) {
                this.frame.stage.removeChild(this.sprite);
                this.frame.renderer.render(this.frame.stage);
                return true;
            }
            return false;
        });
    };

    hidden() {
        this.loaded.then((res) => {
            if(this.exists('sprite')) {                
                this.sprite.visible = false;
                this.frame.renderer.render(this.frame.stage);
                return true;
            }
            return false;
        });
    }

    appear() {
        this.loaded.then((res) => {
            if(this.exists('sprite')) {                
                this.sprite.visible = true;
                this.frame.renderer.render(this.frame.stage);
                return true;
            }
            return false;
        });

    }

    newMove( {position,size,scale,rotation,anchor,pivot} ) {
        this.moveSetting = arguments[0];


        this.loop = requestAnimationFrame(this.newMove.bind(this,arguments[0] ));

        this.setMove();

        this.frame.renderer.render(this.frame.stage);

    }

    setMove( ) {

        let { position, size, scale, rotation, anchor, pivot } = this.moveSetting;

        this.loaded.then((res) => {

                if(check(position)) {
                    let {x,y} = position;
                    this.sprite.x += check(x)? x : 0;
                    this.sprite.y += check(y)? y : 0;
                }

                if(check(size)) {
                    let {width,height} = size;
                    this.sprite.width += check(width)? width : 0;
                    this.sprite.height += check(height)? height : 0;
                }

                if(check(scale)) {
                    let {x,y} = scale;
                    this.sprite.scale.x += check(x)? x : 0;
                    this.sprite.scale.y += check(y)? y : 0;
                }

                this.sprite.rotation += check(rotation) ? rotation : 0;

                if(check(anchor)) {
                    let {x,y} = anchor;
                    this.sprite.anchor.x += check(x)? x : 0;
                    this.sprite.anchor.y += check(y)? y : 0;
                }

                if(check(pivot)) {
                    let {x,y} = pivot;
                    this.sprite.pivot.x += check(x)? x : 0;
                    this.sprite.pivot.y += check(y)? y : 0;
                }
        });
    }

    move( {position,size,scale,rotation,anchor,pivot} ) {
        this.loaded.then((res) => {

            if(this.stopLoop === true) {
                cancelAnimationFrame(loop);
                //Can't stop the animation loop for unknown reason,
                //I set a timeout so the value will stay in false for alittle longer.
                setTimeout(() => this.stopLoop = false,40);
                return;
            }

            let loop = requestAnimationFrame(this.move.bind(this,arguments[0] ));

                if(check(position)) {
                    let {x,y} = position;
                    this.sprite.x += check(x)? x : 0;
                    this.sprite.y += check(y)? y : 0;
                }

                if(check(size)) {
                    let {width,height} = size;
                    this.sprite.width += check(width)? width : 0;
                    this.sprite.height += check(height)? height : 0;
                }

                if(check(scale)) {
                    let {x,y} = scale;
                    this.sprite.scale.x += check(x)? x : 0;
                    this.sprite.scale.y += check(y)? y : 0;
                }

                this.sprite.rotation += check(rotation) ? rotation : 0;

                if(check(anchor)) {
                    let {x,y} = anchor;
                    this.sprite.anchor.x += check(x)? x : 0;
                    this.sprite.anchor.y += check(y)? y : 0;
                }

                if(check(pivot)) {
                    let {x,y} = pivot;
                    this.sprite.pivot.x += check(x)? x : 0;
                    this.sprite.pivot.y += check(y)? y : 0;
                }

            this.frame.renderer.render(this.frame.stage);

        });
    }

    set( {position,size,scale,rotation,anchor,pivot} ) {
        this.loaded.then((res) => {
            if(this.exists('sprite')) {

                if(check(position)) {
                    let {x,y} = position;
                    check(x)? this.sprite.x = x : 0;
                    check(y)? this.sprite.y = y : 0;
                }

                if(check(size)) {
                    let {width,height} = size;
                    check(width)? this.sprite.width = width : null;
                    check(height)? this.sprite.height = height : null;
                }

                if(check(scale)) {
                    let {x,y} = scale;
                    check(x)? this.sprite.scale.x = x : null;
                    check(y)? this.sprite.scale.y = y : null;
                }

                if(check(rotation)) {
                    this.sprite.rotation = rotation;
                }

                if(check(anchor)) {
                    let {x,y} = anchor;
                    check(x)? this.sprite.anchor.x = x : null;
                    check(y)? this.sprite.anchor.y = y : null;
                }

                if(check(pivot)) {
                    let {x,y} = pivot;
                    check(x)? this.sprite.pivot.x = x : null;
                    check(y)? this.sprite.pivot.y = y : null;
                }
                this.frame.renderer.render(this.frame.stage);
            }
        });
    return this;
    }

}
