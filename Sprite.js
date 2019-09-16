function Sprite(exemplo){
    var {
        x = 10,
        y = 10,
        w = 10,
        h = 10,
        v = new Vetor(0,0, 0),
        color = "blue",
    } = exemplo;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.v = v;
    this.vMax = 300;

    this.color = color;
    this.dir = new Vetor(1,0,1);
}
//Sprite.prototype = new Sprite({});
// Sprite.constructor = Sprite;

Sprite.prototype.desenhar = function(ctx){
    ctx.fillStyle= this.color;
    ctx.strokeStyle="black";
    ctx.fillRect(this.x, this.y, this.w, this.h);
}
Sprite.prototype.mover = function(dt){
    this.x += this.v.x*this.v.mod*dt;
    this.y += this.v.y*this.v.mod*dt;
}
Sprite.prototype.colidiuCom = function(alvo){
    if(alvo.x + alvo.w < this.x)
        return false;
    if(alvo.x > this.x + this.w)
        return false;
    if(alvo.y + alvo.h < this.y)
        return false;
    if(alvo.y > this.y + this.h)
        return false;
    return true;
}





