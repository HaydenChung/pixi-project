import {
    resolution, 
    backgroundColor , 
    autoRenderer, 
    Container } from '../src/js/init.js';

export default class Frame {
    constructor({resolution,backgroundColor,Option}) {
        this.resolution = resolution;
        this.backgroundColor = backgroundColor;
        this.renderer = new autoRenderer(this.resolution.width, this.resolution.height);

    }

    putOn(root) {
        root.appendChild(this.renderer.view);
        this.stage = new Container();
        this.renderer.render(this.stage);     
    }

    render() {
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