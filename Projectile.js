function Projectile(exemplo){
    var {
        x = 10,
        y = 10,
        w = 10,
        h = 10,
        duration = 0.1,
        v = new Vetor(0,0, 0),
        color = "white",
        decayRate = 0,
        opacity = 1,
        particulasDeRastro = 0,
    } = exemplo;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.v = v;
    this.duration = duration;
    this.decayRate = decayRate;
    this.opacity = opacity;
    this.fullDuration = duration;
    this.particulasDeRastro = particulasDeRastro;

    this.color = color;
}
//Projectile.prototype = new Projectile({});
Projectile.constructor = Projectile;

Projectile.prototype.desenhar = function(ctx){
    // ctx.fillStyle= this.color;
    // ctx.strokeStyle="black";
    // ctx.globalAlpha = 1;
    // ctx.fillRect(this.x, this.y, this.w, this.h);

    ctx.save();
    ctx.translate(this.x, this.y + this.h/2);
    ctx.rotate(Math.atan2( this.v.y, this.v.x)); // in the screenshot I used angle = 20
    ctx.fillStyle = this.color;
    ctx.globalAlpha = this.opacity;
    ctx.fillRect(0,-this.h/2, this.w,this.h);
    //console.log("aBC")
    ctx.restore();
}
Projectile.prototype.mover = function(dt){
    this.decay(dt);
    this.duration -= dt;

    this.x += this.v.x*this.v.mod*dt;
    this.y += this.v.y*this.v.mod*dt;
}
Projectile.prototype.colidiuCom = function(alvo){
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
Projectile.prototype.perseguir = function(opcoes){
    this.vx = 20*Math.sign(opcoes.alvo.x-this.x);
    this.vy = 20*Math.sign(+ opcoes.alvo.y-this.y );
}
Projectile.prototype.decay = function(dt){
    this.opacity -= this.decayRate*dt; //meio meh pq ele pode ficar transparente antes da duração acabar, entao sei la, podia ter uma aceleracao no decaimento da opcacidade...
    if(this.opacity < 0){
        this.opacity = 0;
    }
}
Projectile.prototype.rastro = function(times){
    if(times == 0){
        return;
    }
        var rastro = new Projectile({w: this.w, h: this.h, x: this.x, y: this.y, color: "rgb(0,0, 255, " + times*0.01 + ")", decayRate: 5});
        particulas.push(rastro);
        rastro = null;
        times--;
}

