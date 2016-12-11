let PIXI = require('pixi.js');

import Frame from '../../classes/frame.js';
import Sprite from '../../classes/sprite.js';
import Animation from '../../classes/animation.js';

const   resolution      = { 'width': 800, 'height': 800},
        backgroundColor = 0x061639,
        Container       = PIXI.Container,
        autoRenderer    = PIXI.autoDetectRenderer,
        loader          = PIXI.loader,
        resources       = PIXI.loader.resources,
        orgSprite          = PIXI.Sprite,
        TextureCache    = PIXI.utils.TextureCache;


export { 
    PIXI, 
    resolution, 
    backgroundColor, 
    Container, 
    autoRenderer, 
    loader, 
    resources, 
    orgSprite,
    TextureCache,
    Frame,
    Sprite,
    Animation,
};