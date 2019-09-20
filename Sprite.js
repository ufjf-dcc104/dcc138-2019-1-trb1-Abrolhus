function Sprite(exemplo){
    var {
        x = 10,
        y = 10,
        w = 10,
        h = 10,
        v = new Vetor(0,0, 0),
        color = "blue",
        tipo = undefined,
    } = exemplo;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.v = v;
    this.vMax = 300;
    this.tipo = tipo;
    this.color = color;
    this.dir = new Vetor(1,0,1);
    this.tempoVivo = 0;
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
Sprite.prototype.distanciaDoCentroDe = function(alvo){
    ///retorna distancia entre o centro disso e do alvo 
    return Math.hypot((alvo.x + alvo.w/2) - (this.x +this.w/2), (alvo.y + alvo.h/2) - (this.y + this.h/2))
}
Sprite.prototype.desenhaBarraDeVida = function(ctx, x,y,w,h){
    ctx.save()
    if(this.hp && this.maxHp){
        ctx.strokeStyle = "3px black"
        ctx.fillStyle = "red"
        //ctx.fillStroke(x,y,w,h);
        ctx.fillRect(x,y,w,h);
        ctx.fillStyle = "green";
        ctx.fillRect(x,y,w*(this.hp/this.maxHp),h);
    }
    ctx.restore();
}





