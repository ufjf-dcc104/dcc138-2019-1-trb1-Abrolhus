function Char(exemplo){
    var {
        a = new Vetor(0,0,0),
        aMax = 2000,
        vMax = 300,
        atrito = new Vetor(0,0,0),
        fAtrito = 300,
        cat =1,
        dir = new Vetor(0,0,0),
        arma = new Arma({rounds:50, maxRounds:50}),
        dash = new Skill({
            start: function(char, dt, particulas, tiros){
                
                char.v.x = char.a.x;
                char.v.y = char.a.y;
                if(char.a.x == 0 && char.a.y == 0){
                    this.onGoing = 0;
                    this.onCooldown = 0;
                }
                else {
                    char.vModifier = 5;
                    char.v.mod = char.vMax*char.vModifier;
                }
            },
            active: function(char, dt, particulas, tiros){
                //char.v.mod = 5*char.vMax;
                char.vModifier = 5;
                char.v.mod = char.vMax*char.vModifier;

                //cria rasto    
                char.rastro(dt, particulas);
                
            },
            end: function(char, dt, particulas, tiros){
                char.vModifier = 1;
            },
            recovery: function(char, dt, particulas, tiros){
                return;
            },
            desenhaActive: function(char, dt, particulas, tiros){
                
            },
            duration: 0.04,
            cooldown: 1,
        
            
        }),
        walkDir = new Vetor(1,0,1),
        recarregar = new Skill({
            start: function(char, dt){
                if(char.arma.rounds == char.arma.maxRounds){
                    this.interrupt(); //força a entrada em cooldown
                }
                else{
                    char.vModifier = 1;
                    console.log("recarregar");
                }
            },
            active: function(char, dt, particulas, tiros){
                if(char.vModifier != 0.25){
                    char.estabilizaVmodifier(0.25, dt, 1)
                }
            },
            end: function(char, dt, particulas, tiros){
                char.arma.recarregar();
                char.vModifier = 1;
                console.log("recarregando");
            },
            recovery: function(char, dt){
                return;
            },
            desenhaActive: function(ctx, char){
                //ctx.clearRect();
                ctx.strokeStyle = "white";
                ctx.fillStyle = "white";
                ctx.globalAlpha = 0.25
                ctx.save();
                ctx.moveTo(char.x + char.w/2, char.y + char.h/2);
                ctx.beginPath();
                ctx.arc(char.x + char.w/2, char.y + char.h/2,char.w*1.5,0,(1-this.onGoing/this.duration)*Math.PI*2);
                
                ctx.lineTo(char.x + char.w/2, char.y + char.h/2);
                ctx.fill();
                ctx.restore();
                ctx.globalAlpha = 1;
            },
            duration: 0.75,
            cooldown: 0.5,
        }),
        atirar = new Skill({
            start: function(char, dt, particulas, tiros){
                if(char.arma.rounds > 0){
                    char.arma.rounds--;
                }
                else{
                    this.interrupt(); //força a entrada em cooldown
                }
                },
            active: function(char, dt, particulas, tiros){
                if(char.vModifier != 0.1){
                    char.estabilizaVmodifier(0.1, dt, 1);
                }
            },
            end: function(char, dt, particulas, tiros){
                char.arma.pullTheTrigger(tiros);
                //char.vModifier = 1;
            },
            recovery: function(char, dt, particulas, tiros){
                return;
            },
            duration: 0.02,
            cooldown: 0.04 ,
        }),
        andar = new Skill({
            start: function(char, dt, particulas, tiros){
                // if(char.rounds > 0){
                //     char.rounds--;
                // }
                // else{
                //     this.onGoing = 0;
                //     this.onCooldown = this.cooldown; //força a entrada em cooldown
                // }
                },
            active: function(char, dt, particulas, tiros){
                if(char.vModifier != 1 && char.atirar.onGoing <= 0 && char.recarregar.onGoing <= 0){
                    
                    char.estabilizaVmodifier(1, dt, 10) //vai pra 1, num crescimento de 5 unidades por segundo; Ou seja, em 0.2 segundos vira 1
                }
                //char.vModifier = 1;
                char.a.x = char.walkDir.x;
                char.a.y = char.walkDir.y;
                char.a.mod = char.aMax;
            },
            end: function(char, dt, particulas, tiros){
                char.a.mod = 0;
            },
            recovery: function(char, dt, particulas, tiros){
                return;
            },
            duration: 0.04, //AQUI QUE TÀ O PROBLEMA, ANDAR N TEM DURAÇÂO TLG? OU TEM? SEI La
            cooldown: 0, // OUTRO PROBLEMA: QUANDO O CHAR PARA DE "ANDAR" TEM QUE TER O ATRITO TLG?, tem q ter a deslizada
        }),

    } = exemplo;
    Sprite.call(this, exemplo);
    this.a = a; //aceleracao
    this.aMax = aMax; 
    this.vMax = vMax;
    this.vModifier = 1; //Multiplicador de Velocidade, enquanto recarrega, por exemplo, esse multiplicador cai de 1 para 0.25
    this.atrito = atrito;
    this.fAtrito = fAtrito;
    this.cat =1; //constante de atrito, nunca foi utilizado, mas deixei aqui.
    
    this.dir = dir; //direcao que o mouse aponta basicamente;
    
    this.defautColor = this.color;
    this.imune = 0;
    this.walkDir = walkDir; //direção q o char tá caminhando para, basicamente a direção da aceleraçõa

    //Equipamento
    this.arma = arma;
    //Skills
    this.dash = dash;
    this.atirar = atirar;
    this.recarregar = recarregar;
    this.andar = andar;

    this.hp  = 3;
}
Char.prototype = new Sprite({});
Char.prototype.controlePorTeclas = function(opcoes){
    var dirX = 0;
    var dirY = 0;
    var mod = 1;
    if(opcoes.teclas.esquerda && opcoes.teclas.last == "left"){
        dirX = -1;
    } 
    else if(opcoes.teclas.direita && opcoes.teclas.last == "right"){ 
        dirX = 1; 
    }
    else{

    }
    if(opcoes.teclas.cima && opcoes.teclas.lastY == "up"){
        dirY = -1;
    } else if(opcoes.teclas.baixo && opcoes.teclas.lastY == "down"){ 
        dirY = 1; 
    }
    else{

    }
    this.walkDir = this.walkDir.vetorUnitario(dirX, dirY);
    if(dirX == 0 && dirY == 0){
        this.walkDir.mod = 0;
        this.andar.isTryingTo = false;
    }
    else{
        this.walkDir.mod = 1;
        this.andar.isTryingTo = true;
    }
    


    if(opcoes.teclas.mb1 == 1){
        this.atirar.isTryingTo = true;
    }
    else{
        this.atirar.isTryingTo = false;
    }
    if(opcoes.teclas.shift == 1){
        this.dash.isTryingTo = true;

    }
    else{
        this.dash.isTryingTo = false;
    }
    if(opcoes.teclas.espaco == 1 || opcoes.teclas.r == 1){
        this.recarregar.isTryingTo = true;
    } else{
        this.recarregar.isTryingTo = false;
    }
}
Char.prototype.mover = function(dt, mouse, particulas, tiros){
    this.checkPrecedenciaSkills();
    if(this.andar.isTryingTo == true){
        //console.log("tentando andar")
    }
    this.updateSkills(dt, particulas, tiros);

    this.atualizaDir(mouse);
    this.atualizaAtrito();
    this.atualizaAceleracao();
    this.atualizaVelocidade(dt);
    
    if(Math.sign(this.atrito.x) == -Math.sign(this.v.x) && Math.sign(this.atrito.y) == -Math.sign(this.v.y) && this.a.mod == 0){
        this.v.mod = 0;
        this.atrito.mod = 0;
        //console.log("vmod = 0");
    }

    this.x += this.v.x*this.v.mod*dt;
    this.y += this.v.y*this.v.mod*dt;
    this.arma.mover(this);
    }
Char.prototype.checkPrecedenciaSkills = function(){

    //andar
    if(this.dash.onGoing >0){
        this.andar.isAbleTo = false;
        this.andar.interrupt();
    }
    else{
        this.andar.isAbleTo = true
    }
    //atirar
    if(this.dash.onGoing >0 || this.recarregar.onGoing > 0){
        this.atirar.isAbleTo = false;
        this.atirar.interrupt();
    }
    else{
        this.atirar.isAbleTo = true
    }
    //recarregar
    if(this.dash.onGoing >0){
        this.recarregar.isAbleTo = false;
        this.recarregar.interrupt();
    }
    else{
        this.recarregar.isAbleTo = true
    }
    //dashar
    if(false){
        this.dash.isAbleTo = false;
        this.dash.interrupt();
    }
    else{
        this.dash.isAbleTo = true
    }
}
Char.prototype.updateSkills = function(dt, particulas, tiros){
    
    this.dash.update(this, dt, particulas, tiros);
    this.atirar.update(this, dt, particulas, tiros);
    //console.log(this.andar.onGoing);
    this.andar.update(this, dt, particulas, tiros);
    this.recarregar.update(this, dt, particulas, tiros);

}

Char.prototype.atualizaVelocidade = function(dt){
    
    this.v = this.v.returnAdd(this.aResultante.returnFloatProd(dt));
    if(this.v.mod > this.vMax*this.vModifier){
        this.v.mod = this.vMax*this.vModifier;
    }
    return;
    var x =  this.v.x*this.v.mod + this.a.x*this.a.mod*dt;
    var y =  this.v.y*this.v.mod + this.a.y*this.a.mod*dt;
    this.v = this.v.normal(x,y);
    if(this.v.mod > this.vMax*this.vModifier){
        this.v.mod = this.vMax*this.vModifier;
    }
}
Char.prototype.atualizaAceleracao = function(){
    this.aResultante = this.a.returnAdd(this.atrito);
    //console.log(this.a)
}
Char.prototype.atualizaDir = function(mouse){
    this.dir = this.dir.vetorUnitario(mouse.x - this.x, mouse.y - this.y);
    //console.log(this.dir);
}
Char.prototype.atualizaAtrito = function(){
    if(this.v.mod == 0){
        this.atrito.mod = 0;
    } else if(this.a.mod == 0){
        this.atrito.mod = -Math.sign(this.v.mod)*this.fAtrito*3;
    }
    else{
        this.atrito.mod = -Math.sign(this.v.mod)*this.fAtrito;
        
    }
    this.atrito.x = this.v.x;
    this.atrito.y = this.v.y;
}
Char.prototype.desenhar = function(ctx){  
    //console.log("aaaA") 
    if(this.recarregar.onGoing > 0){
        //ctx.fillStyle = "orange";
        this.recarregar.desenhaActive(ctx, this);
    }
    if(this.dash.onGoing > 0){
        ctx.fillStyle= "blue";
        //this.dash.desenhaActive(this, dt, particulas)    
    } 
    else if(this.dash.onCooldown > 0){
        ctx.fillStyle= "purple";    
    }
    else{
        ctx.fillStyle= this.color;
    }
    
    ctx.strokeStyle="black";
    ctx.fillRect(this.x, this.y, this.w, this.h);
    this.arma.desenhar(ctx);
    
    ctx.fillStyle = "red";
    ctx.fillText(this.arma.rounds, canvas.width - 40, canvas.height - 30, 35);
}
Char.prototype.rastro = function(dt, particulas){
    console.log(particulas);
    var rastro = new Projectile({w: this.w, h: this.h, x: this.x, y: this.y, color: "rgb(0,0, 255, 0.3", decayRate: 5, particulasDeRastro: 9});
    particulas.push(rastro);
    rastro = null;
}
Char.prototype.estabilizaVmodifier = function(goal, dt, rate){
    var crescimento = goal - this.vModifier
    if(this.vModifier == goal){
        return;
    }
    
    if(crescimento > 0){
        this.vModifier += rate*dt;
        if(this.vModifier >= goal){
            this.vModifier = goal;
            return;
        }
        
    }
    else if(crescimento < 0){
        this.vModifier -= rate*dt
        if(this.vModifier <= goal){
            this.vModifier = goal;
            return;
        }
        
    }
    
        
}
Char.prototype.tomarDano = function(dano){
    if(this.imune <= 0 && this.dash.onGoing <= 0){
        this.hp -= dano;
    }
    else console.log("MISS")
}
Char.prototype.checkVida = function(){
    if(this.hp <= 0){
        return false;
    }
    return true;
}
