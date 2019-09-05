function Char(exemplo){
    var {
        a = new Vetor(0,0,0),
        aMax = 2000,
        vMax = 300,
        atrito = new Vetor(0,0,0),
        fAtrito = 300,
        cat =1,
        dir = new Vetor(0,0,0),
        arma = new Arma({rounds:220}),
        dash = new Skill({
            start: function(char, dt){
                char.vmod = 5*char.vMax;
            },
            active: function(char, dt){
                char.vmod = 5*char.vMax;
            },
            recovery: function(char, dt){
                return;
            },
            duration: 0.1,
            cooldown: 1,


        }),
        recarregar = new Skill({
            start: function(char, dt){
                if(char.rounds == 54){
                    this.onGoing = 0;
                    this.onCooldown = this.cooldown; //força a entrada em cooldown
                }
                else{
                    char.vModifier = 1;
                }
            },
            active: function(char, dt){
                char.vModifier *= (1 - 10*dt);
                if(this.onGoing <= 0){
                    char.arma.rounds = 54; //colocar um maxRounds no char dps;
                    char.vModifier = 1;
                }
            },
            recovery: function(char, dt){
                return;
            },
            duration: 1.5,
            cooldown: 0.5,
        }),
        atirar = new Skill({
            start: function(char, dt){
                if(char.rounds > 0){
                    char.rounds--;
                }
                else{
                    this.onGoing = 0;
                    this.onCooldown = this.cooldown; //força a entrada em cooldown
                }
                },
            active: function(char, dt){
                char.vModifier *= (1 - 5*dt);
                if(this.onGoing <= 0){
                    this.arma.pullTheTrigger(tiros);
                    char.vModifier = 1;
                }
            },
            recovery: function(char, dt){
                return;
            },
            duration: 0.02,
            cooldown: 0.5,
        }),
        andar = new Skill({
            start: function(char, dt){
                // if(char.rounds > 0){
                //     char.rounds--;
                // }
                // else{
                //     this.onGoing = 0;
                //     this.onCooldown = this.cooldown; //força a entrada em cooldown
                // }
                },
            active: function(char, dt){
                char.vModifier = 1;
                this.atualizaAtrito();
                this.atualizaAceleracao();
                this.atualizaVelocidade(dt);
                if(Math.sign(this.atrito.x) == -Math.sign(this.v.x) && Math.sign(this.atrito.y) == -Math.sign(this.v.y) && this.a.mod == 0){
                    this.v.mod = 0;
                    this.atrito.mod = 0;
                }
                // if(this.onGoing <= 0){
                //     this.arma.pullTheTrigger(tiros);
                //     char.vModifier = 1;
                // }
            },
            recovery: function(char, dt){
                return;
            },
            duration: 0.01, //AQUI QUE TÀ O PROBLEMA, ANDAR N TEM DURAÇÂO TLG? OU TEM? SEI La
            cooldown: 0.5, // OUTRO PROBLEMA: QUANDO O CHAR PARA DE "ANDAR" TEM QUE TER O ATRITO TLG?, tem q ter a deslizada
        }),

    } = exemplo;
    Sprite.call(this, exemplo);
    this.a = a
    this.aMax = aMax,
    this.vMax = vMax,
    this.atrito = atrito,
    this.fAtrito = fAtrito,
    this.cat =1,
    //this.atirando = 0;
    this.imune = 0;
    this.dir = dir;
    // this.cooldown = 0.1; 
    // this.spread = 0.1;
    this.arma = arma;
    this.speedState = 1;
    this.dashing = 0;
    this.dashDuration = 0.1;
    this.dashOnCooldown = 0;
    this.dashCooldown = 1;
    this.tryingToDash = 0;
    this.defautColor = this.color;


    this.tentandoAtirar = false;
    this.tentandoDashar = false;
    this.tentandoAndar = false;
    this.tentandoRecarregar = false;

    this.atirando = false;
    this.dashando = false;
    this.andando = false;
    this.recarregando = false;

    this.imune = false;

    this.vModifier = 1;
}
