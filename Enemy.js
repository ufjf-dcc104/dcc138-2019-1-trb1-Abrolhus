function Enemy(exemplo){
    var {
        color = "dark red",
        tipo = "soldado", //soldado, atirador, mago, necromante, ogre
        vMax = 200,
        a = 10,
        nivel = "Normal"
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
    this.nivel = nivel;
    if(this.tipo == "soldado"){
        this.hp = 3;
        this.maxHp = this.hp;
    }
    else if( this.tipo == "Mago"){
        this.color = "purple";
        this.hp = 2;
        this.maxHp = this.hp;
        this.cooldown = 1;
        this.onCooldown = Math.random();
    }
    else if(this.tipo == "Necromante"){
        this.hp = 2;
        this.maxHp = this.hp;
        this.cooldown = 2;
        this.onCooldown = 0.1;
        this.a *= 5;
    }
    else if(this.tipo == "Abelha"){
        this.hp = 1;
        this.maxHp = 1;
        this.color = "darkgreen";
        this.vMax = 300; 
        this.a = 20;
        this.w = 7;
        this.h = 7;
    }
    if(this.nivel == "Elite"){
        this.hp *= 10
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
        color: "darkred",
        duration: 3,
        particulasDeRastro: 5,
    });
    tirosInimigos.push(tiro);
    tiro = null;
}
Enemy.prototype.comportar = function(dt, alvo, tirosInimigos, cena){
    this.onCooldown -= dt;
    if(this.tipo == "soldado"){
        this.perseguir(alvo)
    }
    if(this.tipo == "Abelha"){
        //vou chamar essa função aqui mas ela deveria estar no "mover" ou no "desenhar"
        this.color = "rgb(" + this.v.mod/this.vMax *255 + ", 100, " +" 0)";
        this.perseguir(alvo)
    }
    else if(this.tipo == "mago"){
        if(this.onCooldown < 0 && this.estaDentroDe(cena, this.w)){
            this.v.mod = 0;
            this.atirar(alvo, tirosInimigos)
            this.onCooldown = this.cooldown;
        }
        else if(this.estaDentroDe(cena, this.w)){ //se tirar esse alse ele fica andando de um lado pro outro
            this.v.mod = 0;
        }
        else{
            this.entrarNaAreaVisivel(cena);
            //this.v.mod = this.vMax;
        }
    }
    else if(this.tipo == "Necromante"){

        if(this.onCooldown < 0 && this.estaDentroDe(cena, this.w)){
            //console.log("hm1");
            this.v.mod = 0;
            console.log(this.hp/this.maxHp)
            if(this.tempoVivo < 1){
            
                this.spawnarAbelhas(10, cena.inimigos);
            }
                else if(this.hp/this.maxHp < 0.2){
                console.log("uai2")
                this.spawnarAbelhas(20, cena.inimigos);
            }
            else
            this.spawnarAbelhas(7, cena.inimigos);
            this.onCooldown = this.cooldown;
        }
        else if(this.estaDentroDe(cena, this.w)){ //se tirar esse alse ele fica andando de um lado pro outro
            this.v.mod = 0;
        }
        else{
            this.entrarNaAreaVisivel(cena);
            //this.v.mod = this.vMax;
        }
    }

    
}
Enemy.prototype.desenhar = function(ctx){
    ctx.strokeStyle="black";
    ctx.fillStyle= "darkred";
    ctx.fillRect(this.x, this.y, this.w, this.h);

    ctx.fillStyle= this.color;
    ctx.globalAlpha = this.hp/this.maxHp;

    ctx.strokeStyle="black";
    ctx.fillRect(this.x, this.y, this.w, this.h);
    ctx.globalAlpha = 1;
    if(this.nivel == "Elite"){
        this.desenhaBarraDeVida(ctx, this.x - 0.5*this.w, this.y + 1.5*this.h, 2* this.w, 0.2* this.h)
    }
}
Enemy.prototype.entrarNaAreaVisivel = function(cena){
    if(!this.estaDentroDe(cena, this.w)){
        this.v.x = ((cena.x + cena.w/2) - (this.x + this.w/2))/this.distanciaDoCentroDe(cena);
        this.v.y = ((cena.y + cena.h/2) - (this.y + this.h/2))/this.distanciaDoCentroDe(cena);
    }
}
Enemy.prototype.estaDentroDe = function(alvo, margem){
    return (this.x + this.w < alvo.x + alvo.w - margem &&
    this.x > alvo.x + margem &&
    this.y > alvo.y + margem &&
    this.y + this.h < alvo.y + alvo.h - margem)
}
Enemy.prototype.spawnarAbelhas = function(num, inimigos){
    if(inimigos)
        for(var i = 0; i < num; i++){
            var ini = new Enemy({
                x: (this.x + (2 - 4*Math.random())*this.w),
                y: (this.y + (2 - 4*
                    Math.random())*this.h),
                //vMax: (1.9 + 0.5*Math.random())*200,
                tipo: "Abelha",
                //color: "red",
                w:15,
                h:15
            })
            inimigos.push(ini);
        }
    else{
        ;
    }
}
Enemy.prototype.morrer = function(cena){
    if(this.tipo == "Necromante"){
        for(var i = cena.inimigos.length - 1; i >= 0; i--){
            if(cena.inimigos[i].tipo == "Abelha"){
                cena.inimigos.splice(i, 1);
            }
        }
    }
}




