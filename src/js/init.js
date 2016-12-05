let PIXI = require('pixi.js');

import Frame from '../../classes/frame.js';
import Sprite from '../../classes/sprite.js';

const   resolution      = { 'width': 640, 'height': 480},
        backgroundColor = 0x061639,
        Container       = PIXI.Container,
        autoRenderer    = PIXI.autoDetectRenderer,
        loader          = PIXI.loader,
        resources       = PIXI.loader.resources,
//        Sprite          = PIXI.Sprite,
        TextureCache    = PIXI.utils.TextureCache;


export { 
    PIXI, 
    resolution, 
    backgroundColor, 
    Container, 
    autoRenderer, 
    loader, 
    resources, 
//    Sprite,
    TextureCache,
    Frame,
    Sprite,
};