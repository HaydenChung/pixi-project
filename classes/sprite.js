import {
    orgSprite,
    resources,
    loader,
    Frame
} from '../src/js/init.js';

import check from '../function/checkDefine.js';
import loopObj from '../function/loopObj.js';

export default class Sprite {
    constructor(src){
        if(typeof src != 'string') throw new Error('Sprite class need string as path to the image file.')
        this.src = src;
        this.toDo = [];
        //this.multiple = Array.isArray(src);
        this.loaded = new Promise((resolve, reject) =>{
            //Pass the promise's callbacks to current object.
            this.onResolve = resolve;
            this.onReject = reject;
        });
    }

    stop() {
        // this.stopLoop = true;
        cancelAnimationFrame(this.loop);
    }

    load() {
        loader.add(this.src);
    }

    putOn(frame) {
        if(frame instanceof Frame) {
            this.frame = frame;
            
            if(check(resources[this.src])) {
                // loader.load(() =>{
                    this.sprite = new orgSprite(
                        resources[this.src].texture
                    );
                    frame.stage.addChild(this.sprite);
                    frame.renderer.render(frame.stage);
                    this.onResolve('Already loaded');
                // });
//                console.log(this.sprite);
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
        if(this.exists())  return this[item];        
        return false;
    };

    getSpr(item) {
        if(typeof this.sprite[item] !== 'undefined') return this.sprite[item];
    }

    // set(key,value) {
    //     if(this.exists()) return this[key] = value;        
    //     return false;
    // }

    delete() {
        this.loaded.then((res) => {
            if(this.exists('sprite')) {
                this.frame.stage.removeChild(this.sprite);
                this.render();
                return true;
            }
            return false;
        });
    };

    hidden() {
        this.loaded.then((res) => {
            if(this.exists('sprite')) {                
                this.sprite.visible = false;
                this.render();
                return true;
            }
            return false;
        });
    }

    appear() {
        this.loaded.then((res) => {
            if(this.exists('sprite')) {                
                this.sprite.visible = true;
                this.render();
                return true;
            }
            return false;
        });

    }

    newMove( {position,size,scale,rotation,anchor,pivot} ) {

        this.loop = requestAnimationFrame(this.newMove.bind(this,arguments[0] ));

        this.setMove( arguments[0] );

        this.render();

    }

    setMove( {position,size,scale,rotation,anchor,pivot} ) {

        this.loaded.then((res) => {

            Object.keys(arguments[0]).forEach((parentKey) => {
                if(typeof arguments[0][parentKey] !== 'object'){
                    this.sprite[parentKey] += arguments[0][parentKey];
                } else {
                    Object.keys(arguments[0][parentKey]).forEach((nodeKey) =>{
                        this.sprite[parentKey][nodeKey] += arguments[0][parentKey][nodeKey];
                    })
                }
            })
        });
    }

    moveTo( {position,size,scale,rotation,anchor,pivot},timeDuration,aminationEnded ) {

        let diff = {};
        let origin = {};
        this.loaded.then((res) => {


            Object.keys(arguments[0]).forEach((parentKey) => {
                diff[parentKey] = {};
                origin[parentKey] = {};
                if(typeof arguments[0][parentKey] !== 'object'){
                    diff[parentKey] = (arguments[0][parentKey] - this.sprite[parentKey])/timeDuration;
                    origin[parentKey] = this.sprite[parentKey];
                } else {
                    Object.keys(arguments[0][parentKey]).forEach((nodeKey) =>{
                        diff[parentKey][nodeKey] = (arguments[0][parentKey][nodeKey] - this.sprite[parentKey][nodeKey])/timeDuration;
                        origin[parentKey][nodeKey] = this.sprite[parentKey][nodeKey];
                    })
                }
            })
        })

        let run = new Promise((promisedEnd)=> this.moveMotion(diff,origin,Date.now(),timeDuration,promisedEnd));
        run.then(() => {
            this.set( arguments[0] );
            return aminationEnded();
        });
    }


    moveMotion({position,size,scale,rotation,anchor,pivot},origin,startTime,endTime,promisedEnd) {

        let currFrame = Date.now()-startTime;

        if(currFrame>endTime) {
            this.stop();
            return promisedEnd();
         }

        let currArgs = loopObj(arguments[0],(leafValue)=>{
            return leafValue *= currFrame;
        });

        this.loop = requestAnimationFrame(this.moveMotion.bind(this, arguments[0],origin,startTime,endTime,promisedEnd ));

        this.movePerFrame( currArgs,origin );

        this.render();

        
    }

    // handleArgs(args,callback,key) {
    //     Object.keys(args).forEach((key) => {
    //         if(typeof args[key] !== 'object'){
    //             return [keyArr,args[key]];
    //         } else {
    //             keyArr.push(key);
    //             handleArgs(args(key),callback);
    //         }
    //     });
    // }

    movePerFrame( {position,size,scale,rotation,anchor,pivot},origin ) {
        this.loaded.then((res) => {

        Object.keys(arguments[0]).forEach((parentKey) => {
            if(typeof arguments[0][parentKey] !== 'object'){
                this.sprite[parentKey] = origin[parentKey] + arguments[0][parentKey];
            } else {
                Object.keys(arguments[0][parentKey]).forEach((nodeKey) =>{
                    this.sprite[parentKey][nodeKey] = origin[parentKey][nodeKey] + arguments[0][parentKey][nodeKey];
                })
            }
        });
    })
    }



    // move( {position,size,scale,rotation,anchor,pivot} ) {
    //     this.loaded.then((res) => {

    //         if(this.stopLoop === true) {
    //             cancelAnimationFrame(loop);
    //             //Can't stop the animation loop for unknown reason,
    //             //I set a timeout so the value will stay in false for alittle longer.
    //             setTimeout(() => this.stopLoop = false,40);
    //             return;
    //         }

    //         let loop = requestAnimationFrame(this.move.bind(this,arguments[0] ));

    //             if(check(position)) {
    //                 let {x,y} = position;
    //                 this.sprite.x += check(x)? x : 0;
    //                 this.sprite.y += check(y)? y : 0;
    //             }

    //             if(check(size)) {
    //                 let {width,height} = size;
    //                 this.sprite.width += check(width)? width : 0;
    //                 this.sprite.height += check(height)? height : 0;
    //             }

    //             if(check(scale)) {
    //                 let {x,y} = scale;
    //                 this.sprite.scale.x += check(x)? x : 0;
    //                 this.sprite.scale.y += check(y)? y : 0;
    //             }

    //             this.sprite.rotation += check(rotation) ? rotation : 0;

    //             if(check(anchor)) {
    //                 let {x,y} = anchor;
    //                 this.sprite.anchor.x += check(x)? x : 0;
    //                 this.sprite.anchor.y += check(y)? y : 0;
    //             }

    //             if(check(pivot)) {
    //                 let {x,y} = pivot;
    //                 this.sprite.pivot.x += check(x)? x : 0;
    //                 this.sprite.pivot.y += check(y)? y : 0;
    //             }

    //         this.render();

    //     });
    // }

    set( {position,size,scale,rotation,anchor,pivot} ) {
        this.loaded.then((res) => {
            if(this.exists('sprite')) {

        Object.keys(arguments[0]).forEach((parentKey) => {
            if(typeof arguments[0][parentKey] !== 'object'){
                this.sprite[parentKey] = arguments[0][parentKey];
            } else {
                Object.keys(arguments[0][parentKey]).forEach((nodeKey) =>{
                    this.sprite[parentKey][nodeKey] = arguments[0][parentKey][nodeKey];
                })
            }
        })

                // if(check(position)) {
                //     let {x,y} = position;
                //     check(x)? this.sprite.x = x : 0;
                //     check(y)? this.sprite.y = y : 0;
                // }

                // if(check(size)) {
                //     let {width,height} = size;
                //     check(width)? this.sprite.width = width : null;
                //     check(height)? this.sprite.height = height : null;
                // }

                // if(check(scale)) {
                //     let {x,y} = scale;
                //     check(x)? this.sprite.scale.x = x : null;
                //     check(y)? this.sprite.scale.y = y : null;
                // }

                // if(check(rotation)) {
                //     this.sprite.rotation = rotation;
                // }

                // if(check(anchor)) {
                //     let {x,y} = anchor;
                //     check(x)? this.sprite.anchor.x = x : null;
                //     check(y)? this.sprite.anchor.y = y : null;
                // }

                // if(check(pivot)) {
                //     let {x,y} = pivot;
                //     check(x)? this.sprite.pivot.x = x : null;
                //     check(y)? this.sprite.pivot.y = y : null;
                // }
                this.render();
            }
        });
//    return this;
    }

    render() {
        this.frame.renderer.render(this.frame.stage);
    }

}
