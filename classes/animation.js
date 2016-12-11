export default class Animation {
    constructor(sprite) {
        this.sprite = sprite;
        this.breakLoop = false;
    }

    add( {position,size,scale,rotation,anchor,pivot},time ) {
        this.sprite.toDo.push(arguments);
        return this;
    }

    moveTo(loop = false) {
        let toDo = this.sprite.toDo;
        if(loop === false) {
            this.sprite.stop();
            this.sprite.toDo = [];
        }
        toDo.reduce((prev, newToDo) => {
            return prev.then(() => {
                return new Promise((resolve,reject) => {
                    this.sprite.moveTo( newToDo[0], newToDo[1] ,resolve );
                    this.onReject = reject;
                    if(this.breakLoop === true) {
                        reject(); 
                    }
                });
        }).catch(() =>{
            loop = false;
        });
    },Promise.resolve()).then(() =>{
            if(loop === true) {
                this.moveTo(true);
            } else{
                this.breakLoop = false;
                this.sprite.stop();
                this.sprite.toDo=[];         
            }
        })
    }

    run(loop = false) {
        let toDo = this.sprite.toDo;
        if(loop === false ) {
            this.sprite.stop();
            this.sprite.toDo = [];
        }
        //Prev is a promise object return from the center of the nest.
        toDo.reduce((prev, newToDo) => {
            //This statement waiting for the prev promise,
            //when it fulfilled it will create the next promise. 
            return prev.then(() => {
                this.sprite.stop();
                this.sprite.newMove( newToDo[0] );
                //A new promise created,the resolve statement stay
                //in the setTimeout chamber.
                return new Promise((resolve,reject) => {
                    var delayRes = setTimeout(resolve, newToDo[1]);
                    this.onReject = reject;
                    if(this.breakLoop=== true) {
                        reject()};
                });
            }).catch(() =>{
                loop = false;
            });
        //The initial promise.
        },Promise.resolve()).
        //Do you notice the reduce syntax ended?
        //Here lay the last 'than'.
        then(() =>{
            if(loop === true) {
                this.run(true);
            } else{
                this.breakLoop = false;
                this.sprite.stop();
                this.sprite.toDo=[];         
            }
        })
    }

    stop() {
        this.breakLoop = true;
        this.sprite.stop();
        this.onReject();
    }
}