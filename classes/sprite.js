let PIXI = require('pixi.js');

export default class Sprite {
    constructor(src){
        if(typeof src != 'string') throw new Error('Sprite class need string as path to the image file.')
        this.src = src;
        this.multiple = Array.isArray(src);
        this.callback = this.multiple ? this.createMultiple : this.create ;
        this.load();
    }

    load() {
        PIXI.loader.add(this.src);
    }

    put(frame) {
        PIXI.loader.load(() => {
            var sprite = new PIXI.Sprite(
            PIXI.loader.resources[this.src].texture
        );
        frame.stage.addChild(sprite);
        frame.renderer.render(frame.stage);
        });
    }

    exists(item) {
        return (typeof this[item] != 'undefined');
    }

    get(item) {
        if(this.exists()) return this[item];        
        return false;
    }

    set(key,value) {
        if(this.exists()) return this[key] = value;        
        return false;
    }
}
