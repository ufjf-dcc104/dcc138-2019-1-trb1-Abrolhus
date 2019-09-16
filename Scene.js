function Scene(params) {
    var exemplo ={
        inimigos: [],
        tiros: [],
        tirosInimigos: [],
        particulas: [],
        char: [],
        coisas: [],
        ctx: null,
        w: 600,
        h: 300
    }
    Object.assign(this, exemplo, params);
}

Scene.prototype = new Scene();
Scene.prototype.constructor = Scene;

Scene.prototype.addInimigo = function(coisa){
    if(this)
    {this.inimigos.push(coisa);
    coisa.scene = this;}
};
Scene.prototype.addChar = function(coisa){
    if(this)
    {this.char.push(coisa);
    coisa.scene = this;}
};
Scene.prototype.addParticula = function(coisa){
    if(this)
    {this.particulas.push(coisa);
    coisa.scene = this;}
};
Scene.prototype.addTiroInimigo = function(coisa){
    if(this)
    {this.tirosInimigos.push(coisa);
    coisa.scene = this;}
};
Scene.prototype.addTiro = function(coisa){
    if(this)
    {this.tiros.push(coisa);
    coisa.scene = this;}
};


Scene.prototype.desenhar = function(){
    this.coisas = [];
    this.coisas.concat(this.inimigos, this.tiros, this.tirosInimigos, this.particulas, this.char);
    for(var i = 0; i<this.coisas.length; i++){
        this.coisas[i].desenhar(this.ctx);
    }
    
    // for(var i = 0; i<this.char.length; i++){
    //     this.char[i].desenhar(this.ctx);
    // }
    // for(var i = 0; i<this.inimigos.length; i++){
    //     this.inimigos[i].desenhar(this.ctx);
    // }  
    // for(var i = 0; i<this.particulas.length; i++){
    //     this.particulas[i].desenhar(this.ctx);
    // }  
    // for(var i = 0; i<this.tiros.length; i++){
    //     this.tiros[i].desenhar(this.ctx);
    // }  
    // for(var i = 0; i<this.tirosInimigos.length; i++){
    //     this.tirosInimigos[i].desenhar(this.ctx);
    // }    
};

Scene.prototype.mover = function(dt){
    for(var i = 0; i<this.char.length; i++){
        this.char[i].mover(dt);
    }
    for(var i = 0; i<this.inimigos.length; i++){
        this.inimigos[i].comportar(dt, pc);
        this.inimigos[i].mover(dt);
    }  
    for(var i = 0; i<this.particulas.length; i++){
        this.particulas[i].mover(dt);
    }  
    for(var i = 0; i<this.tiros.length; i++){
        this.tiros[i].mover(dt);
        if(tiros[i].duration <= 0){
            tiros.splice(i, 1);
        }
    }  
    for(var i = 0; i<this.tirosInimigos.length; i++){
        this.tirosInimigos[i].mover(dt);
        tirosInimigos[i].rastro(tirosInimigos[i].particulasDeRastro);
        if(tirosInimigos[i].duration <= 0){
            tirosInimigos.splice(i, 1);
        }
    }     
};

Scene.prototype.comportar = function(){
    for(var i = 0; i<this.inimigos.length; i++){
        
    }
};


Scene.prototype.limpar = function(){
    this.ctx.clearRect(0,0, this.w, this.h);
}

Scene.prototype.checaColisao = function(){
    for(var i = 0; i<this.sprites.length; i++){
        for(var j = i+1; j<this.sprites.length; j++){
            if(this.sprites[i].colidiuCom(this.sprites[j])){
                if(this.sprites[i].props.tipo === "pc"
                && this.sprites[j].props.tipo ==="npc"){
                    this.toRemove.push(this.sprites[j]);
                }
                else 
                if(this.sprites[i].props.tipo === "npc"
                && this.sprites[j].props.tipo ==="tiro"){
                    this.toRemove.push(this.sprites[i]);
                    this.toRemove.push(this.sprites[j]);
                }
            }
        }
    }  
};

Scene.prototype.removeSprites = function () {
    for (var i = 0; i < this.toRemove.length; i++) {
        var idx = this.sprites.indexOf(this.toRemove[i]);
        if(idx>=0){
            this.sprites.splice(idx,1);
        }
    }
    this.toRemove = [];
};

Scene.prototype.passo = function(dt){
    this.limpar();
    //this.comportar();
    this.mover(dt);
    this.desenhar();
    //this.checaColisao();
    //this.removeSprites();
}