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
        h: 300,
        mouse: {x:0,y:0},
        teclas: {},
        fases: [],
        eventos: [],
        faseAtual: 0,
        x: 0,
        y: 0,
        telaPersonalizada: undefined,
    }
    Object.assign(this, exemplo, params);
    this.tempoDeFase = 0;
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
    
    
    
    if(this.telaPersonalizada){
        this.telaPersonalizada(this);

        // (function(cena){
        //     cena.ctx.font = "50px Comic Sans MS"
        //     cena.ctx.textAlign = "center"
        //     cena.ctx.fillStyle = "orange"
        //     cena.ctx.fillText("Acabou-se", cena.x + cena.w/2, cena.y + cena.h/2)
        //     }) (this);
        return;
    }
    ctx.fillStyle= "tan";
    ctx.strokeStyle="black";
    ctx.fillRect(0, 0, this.w, this.h);

    ctx.fillStyle = "blue";
    ctx.font = "20px Georgia";
    ctx.fillText(this.tempoDeFase.toFixed(2), 10, 10);

    this.coisas = [];
    // this.coisas.concat(this.inimigos, this.tiros, this.tirosInimigos, this.particulas, this.char);
    
    // for(var i = 0; i<this.coisas.length; i++){
    //     this.coisas[i].desenhar(this.ctx);
    // }
    
    for(var i = 0; i<this.char.length; i++){
        this.char[i].desenhar(this.ctx);
    }
    for(var i = 0; i<this.inimigos.length; i++){
        this.inimigos[i].desenhar(this.ctx);
    }  
    for(var i = 0; i<this.particulas.length; i++){
        this.particulas[i].desenhar(this.ctx);
    }  
    for(var i = 0; i<this.tiros.length; i++){
        this.tiros[i].desenhar(this.ctx);
    }  
    for(var i = 0; i<this.tirosInimigos.length; i++){
        this.tirosInimigos[i].desenhar(this.ctx);
    }    
    ctx.fillStyle = "red";
    ctx.fillRect(mouse.x, mouse.y, 5,5);
};

Scene.prototype.mover = function(dt){
    for(var i = 0; i<this.char.length; i++){
        this.char[i].controlePorTeclas({teclas:this.teclas})
        this.char[i].mover(dt, this.mouse, this.particulas, this.tiros);
    }
    for(var i = 0; i<this.inimigos.length; i++){
        this.inimigos[i].comportar(dt, pc, this.tirosInimigos, this);
        this.inimigos[i].mover(dt);
    }  
    for(var i = 0; i<this.particulas.length; i++){
        this.particulas[i].mover(dt, this.particulas);
        if(this.particulas[i].duration <= 0){
            this.particulas.splice(i, 1);
        }
    }  
    for(var i = 0; i<this.tiros.length; i++){
        this.tiros[i].mover(dt, this.particulas);
        //this.tiros[i].rastro(this.particulas);
        if(this.tiros[i].duration <= 0){
            this.tiros.splice(i, 1);
        }
    }  
    for(var i = 0; i<this.tirosInimigos.length; i++){
        this.tirosInimigos[i].mover(dt, this.particulas);
        //this.tirosInimigos[i].rastro(this.particulas);
        if(this.tirosInimigos[i].duration <= 0){
            this.tirosInimigos.splice(i, 1);
        }
    }     
};

Scene.prototype.comportar = function(){
    for(var i = 0; i<this.inimigos.length; i++){
        ;
    }
};


Scene.prototype.limpar = function(){
    this.ctx.clearRect(0,0, this.w, this.h);
}

Scene.prototype.checaColisao = function(){

    //tiros aliados
    for(i=this.tiros.length - 1; i >= 0; i--){
        for(var j=this.inimigos.length - 1; j >= 0; j--){
            if(this.inimigos[j].colidiuCom(this.tiros[i])){
                this.inimigos[j].hp--;
                if(this.inimigos[j].hp <= 0)
                    this.inimigos.splice(j, 1);
                this.tiros.splice(i, 1);
                break
            }
        }
    }
    //tiros inimigos
    for(i=this.tirosInimigos.length - 1; i >= 0; i--){
        for(var j=this.char.length - 1; j >= 0; j--){
            if(this.char[j].colidiuCom(this.tirosInimigos[i])){
                this.char[j].tomarDano(1);
                if(!this.char[j].checkVida())
                    ;//console.log("ded1")
                }
        }
    }

    //Dano de contato Inimigos
    for(var i=this.inimigos.length - 1; i >= 0; i--){ //complexidade r1 para cena com apenas um char;
        for(var j=this.char.length - 1; j >= 0; j--){ 
            if(this.inimigos[i].colidiuCom(this.char[j])){
                this.char[j].tomarDano(1);
                if(!this.char[j].checkVida())
                    ;//console.log("ded2")
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

Scene.prototype.passo = function(dt, mouse, teclas){
    

    this.tempoDeFase += dt;
    this.controleDeFases();
    this.eventHandler();

    this.mouse.x = mouse.x;
    this.mouse.y = mouse.y;
    Object.assign(this.teclas, teclas);
    
    
    // if(this.char[0].hp <= 0){
    //     this.ctx.fillStyle = "grey";
    //     this.ctx.globalAlpha = 0.01;
    //     ctx.fillRect(0,0,this.w,this.h);
    //     this.ctx.globalAlpha = 1;
    //     this.ctx.fillStyle = "Brown"
    //     this.ctx.font = "100px Georgia Bold"
    //     this.ctx.textAlign = "center";
    //     this.ctx.fillText("Morreste", this.w/2, this.h/2);
    //     return;
    // }
    // else if(this.inimigos.length == 0){
    //     this.ctx.fillStyle = "Pink"
    //     this.ctx.textAlign = "center";
    //     this.ctx.font = "100px Comic Sans MS Bold"
    //     this.ctx.fillText("¡Ganhaste!", this.w/2, this.h/2); //comic sans e em espanhol, desculpa.
    //     return;
    // }
    //this.limpar();
    //this.comportar();
    this.mover(dt);
    this.desenhar();
    this.checaColisao();
    //this.removeSprites();
}
Scene.prototype.eventHandler = function(){
    //aparentemente functional mas só consegue ativar um evento por vez (por frame)
    for(var i=0;i<this.eventos.length;i++){
        if(this.eventos[i].t < this.tempoDeFase){
            this.eventos[i].active(this);
            this.eventos.splice(i, 1);
            return;
        }
    }
}
Scene.prototype.iniciaFase = function(num){ // inicia a fase "num"
    console.log("uai")
    this.tempoDeFase = 0;
    this.eventos = [];
    for(var i = 0; i < this.fases[num].eventos.length; i++){

        // encampusation. 
        // Caso contrario, quando o active (função) fosse chamado, 
        // seria usado um evt.inimigos mais recente 
        // (sempre o ultimo da lista de eventos da fase)
        // // Javascript é muito legal, e estranho.
        (function (cena){
            var evt = cena.fases[num].eventos[i]
        if(evt.tipo == "spawnaInimigos"){
            cena.eventos.push({
                t: evt.t,
                active: function(cena){
                    cena.spawnaInimigos(evt.inimigos);
                }
            });
        }
        else if(evt.tipo == "tela"){
            console.log(evt.conteudo);
            cena.telaPersonalizada = evt.conteudo;
        }
    }) (this);

    }
}
Scene.prototype.spawnaInimigos = function(enemies){ //recebe um vetor de objetos que definem os inimigos
    for(var i = 0; i < enemies.length; i++){
        if(enemies[i]){
            this.inimigos.push(new Enemy(enemies[i]));
        }
    }
}
Scene.prototype.controleDeFases = function(){
    if(this.faseAtual >= this.fases.length){
        console.log("acabou as fases");
        return;
    }
    else if(!this.fases[this.faseAtual].started){
        this.iniciaFase(this.faseAtual);
        this.fases[this.faseAtual].started = true;
    }
    
    else if(this.fases[this.faseAtual].ended){
        this.faseAtual++; //na real o controle de pra qual fase vai, dado que um dos objetivos foi cumprido tem q ficar na prorpria fase
    }
    else if(this.fases[this.faseAtual].objective(this)){
        this.faseAtual++;
    }
    
    else{

    }
}

