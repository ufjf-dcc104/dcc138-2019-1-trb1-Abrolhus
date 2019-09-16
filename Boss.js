function Boss(exemplo){
    var {
        vMax = 300,
        dir = new Vetor(0,0,0),
        x = 300,
        y = 300,
        w = 100,
        h = 100,
    } = exemplo;
    Sprite.call(this, exemplo);
    //this.atirando = 0;
    this.imune = 0;
    // this.cooldown = 0.1; 
    // this.spread = 0.1;
    this.defautColor = this.color;

    this.imune = false;
}
Boss.prototype = new Sprite({});
Boss.prototype.constructor = Boss;

