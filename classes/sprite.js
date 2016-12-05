import {
    PIXI,
    resources,
    loader,
} from '../src/js/init.js';

import Frame from './frame.js'
// Import Frame for type checking 'frame'' object in put(),
// need a workaround.

export default class Sprite {
    constructor(src){
        if(typeof src != 'string') throw new Error('Sprite class need string as path to the image file.')
        this.src = src;
        //this.multiple = Array.isArray(src);
        this.loaded = new Promise((resolve, reject) =>{
            //Pass the promise's callbacks to current object.
            //They will be call else where.
            this.onResolve = resolve;
            this.onReject = reject;
        });
        this.load();
    }

    load() {
        loader.add(this.src);
    }

    putOn(frame) {
        if(frame instanceof Frame) {
            self = {boy:'12'};
            this.frame = frame;
            loader.load(() => {
                this.sprite = new PIXI.Sprite(
                resources[this.src].texture
            );
            frame.stage.addChild(this.sprite);
            frame.renderer.render(frame.stage);
            //Sending out this.onload's promised state.
            //Please find a way to tell if the image load succeeded.
            this.onResolve('It\'s a go');
            });
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
    }

    // set(key,value) {
    //     if(this.exists()) return this[key] = value;        
    //     return false;
    // }

    delete() {
        if(this.exists('frame')) {
            this.loaded.then((res) => {
                this.frame.stage.removeChild(this.sprite);
                this.frame.renderer.render(this.frame.stage);
            return true;
            });
        }
    return false;
    }

    hidden() {
        this.loaded.then((res) => {
            if(this.exists('sprite')) {                
                this.sprite.visible = false;
                this.frame.renderer.render(this.frame.stage);
                return true;
            }
        });
    return false;
    }

    appear() {
        this.loaded.then((res) => {
            if(this.exists('sprite')) {                
                this.sprite.visible = true;
                this.frame.renderer.render(this.frame.stage);
                return true;
            }
        });
    return false;
    }

    set( {position,size,scale,rotation,anchor,pivot} ) {
        this.loaded.then((res) => {
            if(this.exists('sprite')) {

                function check(item) {
                    return (typeof item != 'undefined');
                }

                if(check(position)) {
                    let {x,y} = position;
                    check(x)? this.sprite.x = x : null;
                    check(y)? this.sprite.y = y : null;
                }

                if(check(size)) {
                    let {width,height} = size;
                    check(width)? this.sprite.width = width : null;
                    chekc(height)? this.sprite.height = height : null;
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
            }

                //this.frame.renderer.render(this.frame.stage);
                return true;
        });
    return false;
    }
}
