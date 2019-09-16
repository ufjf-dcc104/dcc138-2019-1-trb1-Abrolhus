function Enemy(exemplo){
    var {
        color = "dark red",
        tipo = "soldado", //soldado, atirador, mago, necromante, ogre
        vMax = 200,
        a = 10
    } = exemplo;
    Sprite.call(this, exemplo);
    this.color = color;
    this.dir = new Vetor(1,0,1);
    this.vMax = vMax;
    this.onCooldown = 1;
    this.cooldown = 1;
    this.tipo = tipo
    this.a = a;
    this.hp = 2;
    this.maxHp = this.hp;
    if(this.tipo == "soldado"){
        this.hp = 4;
        this.maxHp = this.hp;
    }
    else if( this.tipo == "Mago"){
        this.hp = 2;
        this.maxHp = this.hp;
    }
    else if(this.tipo == "Necromante"){
        this.hp = 2;
        this.maxHp = this.hp;
    }
}
Enemy.prototype = new Sprite({});
Enemy.constructor = Enemy;

Enemy.prototype.mover = function(dt){
    this.v.mod += this.a*dt;
    if(this.v.mod > this.vMax){
        this.v.mod = this.vMax;
    }
    this.x += this.v.x*this.v.mod*dt;
    this.y += this.v.y*this.v.mod*dt;
}
Enemy.prototype.perseguir = function(alvo){
    var dist = Math.hypot(alvo.y - this.y, alvo.x - this.x);
    if(dist > 1){
        this.v.x = (alvo.x - this.x)/dist;
        this.v.y = (alvo.y - this.y)/dist;
    }    else{
        this.v.mod = 0;
    }
}
Enemy.prototype.manterDistancia = function(alvo){
    var dist = Math.hypot(alvo.y - this.y, alvo.x - this.x);
    if(this.x < canvas.width - 2*this.w && this.y < canvas.height - 2*this.h && this.y > 2*this.h && this.x > 2*this.w){
        this.v.x = -(alvo.x - this.x)/dist;
        this.v.y = -(alvo.y - this.y)/dist;
        this.v.mod = this.vMax;
    }   else{
        this.v.mod = 0;
    }

    
}
Enemy.prototype.enrage= function(){

}
Enemy.prototype.atirar = function(alvo, tirosInimigos){
    var v = new Vetor(0,0,0)
    var dist = Math.hypot(alvo.y - this.y, alvo.x - this.x);
    v.x = (alvo.x - this.x)/dist;
    v.y = (alvo.y - this.y)/dist;

    v.mod = 350;
    var tiro = new Projectile({
        x: this.x + this.w/2,
        y : this.y + this.h/2,
        w : 10,
        h: 10,
        v: v,
        color: "black",
        duration: 3,
        particulasDeRastro: 5,
    });
    tirosInimigos.push(tiro);
    tiro = null;
}
Enemy.prototype.comportar = function(dt, alvo, tirosInimigos){
    this.onCooldown -= dt;
    if(this.tipo == "soldado"){
        this.perseguir(alvo)
    }
    else if(this.tipo == "mago"){
        if(this.onCooldown < 0){
            this.atirar(alvo, tirosInimigos)
            this.onCooldown = this.cooldown;
        }
        else{
            //this.manterDistancia(alvo);
            this.v.mod = 0
        }
    }
    
}
Enemy.prototype.desenhar = function(ctx){
    ctx.strokeStyle="black";
    ctx.fillStyle= "grey";
    ctx.fillRect(this.x, this.y, this.w, this.h);

    ctx.fillStyle= this.color;
    ctx.globalAlpha = this.hp/this.maxHp;

    ctx.strokeStyle="black";
    ctx.fillRect(this.x, this.y, this.w, this.h);
    ctx.globalAlpha = 1;
}





