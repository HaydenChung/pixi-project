import {resolution, backgroundColor} from '../src/js/init.js';
var PIXI = require('pixi.js');

export default class Frame {
    constructor(resolution,backgroundColor) {
        this.resolution = resolution;
        this.backgroundColor = backgroundColor;
        this.renderer = new PIXI.autoDetectRenderer(this.resolution.width, this.resolution.height);

    }

    put(root) {
        root.appendChild(this.renderer.view);
        this.stage = new PIXI.Container();
        this.renderer.render(this.stage);        
    }

    color(hex) {
        this.renderer.backgroundColor = hex;
        return this;
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