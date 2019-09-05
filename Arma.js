function Arma(exemplo){
    var {
        x = 10,
        y = 10,
        w = 10,
        h = 2,
        dir = new Vetor(1,0,1),

        damage = 10,
        fireRate = 10,
        spread = 0.1,
        reloadTime = 1,

        rounds = 24,
        
        bulletSize = 5,
        bulletSpeed = 500,
        bulletDuration = 2,
        
        bulletColor = "white",
        color = "Black",
        reloadingColor = "Brown"
    } = exemplo;

    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.damage = damage;
    this.fireRate = fireRate;
    this.spread = spread;
    this.reloadTime = reloadTime;
    this.rounds = rounds;
    this.bulletSize = bulletSize;
    this.bulletSpeed = bulletSpeed;
    this.bulletDuration = bulletDuration
    this.bulletColor = bulletColor;
    this.color = color;
    this.reloadingColor = reloadingColor;

    this.dir = dir;

}
Arma.prototype.fire = function(){
    var tiro = Object.create(Sprite);
}
Arma.prototype.atualizaPosicao = function(char){
    this.x = char.x + char.w/2;
    this.y = char.y + char.h/2;
    
}
Arma.prototype.atualizaDir = function(char){
    Object.assign(this.dir, char.dir);
}
Arma.prototype.desenhar = function(ctx){
    //ctx.fillRect(0,0, this.w,this.h);

    ctx.save();
    ctx.translate(this.x, this.y + this.h/2);
    ctx.rotate(Math.atan2( this.dir.y, this.dir.x)); // in the screenshot I used angle = 20
    ctx.fillStyle = this.color;
    ctx.fillRect(0 + this.h/2,0, this.w,this.h);
    //console.log("aBC")
    ctx.restore();

}
Arma.prototype.mover = function(char){
    this.atualizaDir(char);
    this.atualizaPosicao(char);
}
Arma.prototype.fire = function(tiros){
    var ex= new Vetor(0,0,1000);
    var v = ex.vetorUnitario(this.dir.x + this.spread - Math.random()*2*this.spread, this.dir.y + this.spread - Math.random()*2*this.spread);
    v.mod = this.bulletSpeed;
    var tiro = new Projectile({
        x: this.x + this.dir.x*this.w,
        y : this.y + this.dir.y*this.w - this.h/2,
        w : 4,
        h: 4,
        v: v,
        color: "white",
        duration: this.bulletDuration
    });
    tiros.push(tiro);
    //this.atirando = this.cooldown;
    tiro = null;
}
Arma.prototype.pullTheTrigger = function(tiros){
    if(this.rounds > 0){
        this.rounds -= 1;
        this.fire(tiros);
    }
    else{
        ;
    }
}



