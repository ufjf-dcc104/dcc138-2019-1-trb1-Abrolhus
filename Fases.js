//esse arquivo é uma gambiarra, n repara a bagunça. Eu só n queria manter essas 400 linhas de codigo no index.

function Fases(){
    //fase1
    this.fase1 = {
        started : false,
        ended : false,
        tipo: "jogavel",
        objective: function(cena){
            return cena.eventos.length == 0 && cena.inimigos.length == 0;
        },
        eventos: [
        {t:0, tipo: "spawnaInimigos", inimigos:[
                { //se eu colocar a = { .......} para de dar erro, mas sei la;
                    x:(1 +0.25*Math.random())*canvas.width,
                    y:Math.random()*canvas.height,
                    vMax: (0.9 + 0.5*Math.random())*200,
                    tipo: "soldado",
                    color: "red",
                    w:15,
                    h:15
                },
                { 
                    x:(1 +0.25*Math.random())*canvas.width,
                    y:Math.random()*canvas.height,
                    vMax: (0.9 + 0.5*Math.random())*200,
                    tipo: "soldado",
                    color: "red",
                    w:15,
                    h:15
                },
                { 
                    x:(1 +0.25*Math.random())*canvas.width,
                    y:Math.random()*canvas.height,
                    vMax: (0.9 + 0.5*Math.random())*200,
                    tipo: "soldado",
                    color: "red",
                    w:15,
                    h:15
                },
                { 
                    x:(1 +0.25*Math.random())*canvas.width,
                    y:Math.random()*canvas.height,
                    vMax: (0.9 + 0.5*Math.random())*200,
                    tipo: "soldado",
                    color: "red",
                    w:15,
                    h:15
                },
                { 
                    x:(1 +0.25*Math.random())*canvas.width,
                    y:Math.random()*canvas.height,
                    vMax: (0.9 + 0.5*Math.random())*200,
                    tipo: "soldado",
                    color: "red",
                    w:15,
                    h:15
                },
    
            ]},
            {t:10, tipo: "spawnaInimigos", inimigos:[
                {
                    x: (1 -0.25*Math.random())*canvas.width,
                    y: (1 + 0.3*Math.random())*canvas.height,
                    vMax: (1.9 + 0.5*Math.random())*200,
                    tipo: "soldado",
                    color: "red",
                    w:15,
                    h:15
                },
                {
                    x:(1 -0.25*Math.random())*canvas.width,
                    y:(1+ 0.3*Math.random())*canvas.height,
                    vMax: (0.5 + 0.5*Math.random())*200,
                    tipo: "soldado",
                    color: "red",
                    w:15,
                    h:15
                },
                {
                x: (1 -0.25*Math.random())*canvas.width,
                y: (1 + 0.3*Math.random())*canvas.height,
                vMax: (1.9 + 0.5*Math.random())*200,
                tipo: "soldado",
                color: "red",
                w:15,
                h:15
            },
            {
                x: (1 -0.25*Math.random())*canvas.width,
                y: (1 + 0.3*Math.random())*canvas.height,
                vMax: (1.9 + 0.5*Math.random())*200,
                tipo: "soldado",
                color: "red",
                w:15,
                h:15
            },
            
    
            ]},
        ]
    }
    //fase 2
    this.fase2 = {
        started : false,
        ended : false,
        tipo: "jogavel",
        objective: function(cena){
            return cena.eventos.length == 0 && cena.inimigos.length == 0;
        },
        eventos: [
            {t:0, tipo: "spawnaInimigos", inimigos:[
                    { //se eu colocar a = { .......} para de dar erro, mas sei la;
                        x:(1 +0.25*Math.random())*canvas.width,
                        y:Math.random()*canvas.height,
                        vMax: (0.9 + 0.5*Math.random())*200,
                        tipo: "soldado",
                        color: "red",
                        w:15,
                        h:15
                    },
                    { 
                        x:(1 +0.25*Math.random())*canvas.width,
                        y:Math.random()*canvas.height,
                        vMax: (0.9 + 0.5*Math.random())*200,
                        tipo: "soldado",
                        color: "red",
                        w:15,
                        h:15
                    },
                    { 
                        x:(1 +0.25*Math.random())*canvas.width,
                        y:Math.random()*canvas.height,
                        vMax: (0.9 + 0.5*Math.random())*200,
                        tipo: "soldado",
                        color: "red",
                        w:15,
                        h:15
                    },
                    { 
                        x:(1 +0.25*Math.random())*canvas.width,
                        y:Math.random()*canvas.height,
                        vMax: (0.9 + 0.5*Math.random())*200,
                        tipo: "soldado",
                        color: "red",
                        w:15,
                        h:15
                    },
                    { 
                        x:(1 +0.25*Math.random())*canvas.width,
                        y:Math.random()*canvas.height,
                        vMax: (0.9 + 0.5*Math.random())*200,
                        tipo: "soldado",
                        color: "red",
                        w:15,
                        h:15
                    },
                    { 
                        x:(1 +0.25*Math.random())*canvas.width,
                        y:Math.random()*canvas.height,
                        vMax: (0.9 + 0.5*Math.random())*200,
                        tipo: "soldado",
                        color: "red",
                        w:15,
                        h:15
                    },
                    { 
                        x:(1 +0.25*Math.random())*canvas.width,
                        y:Math.random()*canvas.height,
                        vMax: (0.9 + 0.5*Math.random())*200,
                        tipo: "mago",
                        color: "purple",
                        w:15,
                        h:15
                    },
    
    
                ]
            },
            {t:10, tipo: "spawnaInimigos", inimigos:[
                {
                    x: (-0.25*Math.random())*canvas.width,
                    y: (1 + 0.3*Math.random())*canvas.height,
                    vMax: (1.9 + 0.5*Math.random())*200,
                    tipo: "soldado",
                    color: "red",
                    w:15,
                    h:15
                },
                {
                    x:(-0.25*Math.random())*canvas.width,
                    y:(1+ 0.3*Math.random())*canvas.height,
                    vMax: (0.5 + 0.5*Math.random())*200,
                    tipo: "soldado",
                    color: "red",
                    w:15,
                    h:15
                },
                {
                    x: (-0.25*Math.random())*canvas.width,
                    y: (1 + 0.3*Math.random())*canvas.height,
                    vMax: (1.9 + 0.5*Math.random())*200,
                    tipo: "soldado",
                    color: "red",
                    w:15,
                    h:15
                },
                {
                    x: (-0.25*Math.random())*canvas.width,
                    y: (1 + 0.3*Math.random())*canvas.height,
                    vMax: (1.9 + 0.5*Math.random())*200,
                    tipo: "soldado",
                    color: "red",
                    w:15,
                    h:15
                },
                {
                    x: (-0.25*Math.random())*canvas.width,
                    y: (1 + 0.3*Math.random())*canvas.height,
                    vMax: (1.9 + 0.5*Math.random())*200,
                    tipo: "soldado",
                    color: "red",
                    w:15,
                    h:15
                },
                {
                    x: (-0.35*Math.random())*canvas.width,
                    y: (1 + 0.3*Math.random())*canvas.height,
                    vMax: (1.9 + 0.5*Math.random())*200,
                    tipo: "soldado",
                    color: "red",
                    w:15,
                    h:15
                },
                {
                    x: (-0.25*Math.random())*canvas.width,
                    y: (1 + 0.3*Math.random())*canvas.height,
                    vMax: (1.9 + 0.5*Math.random())*200,
                    tipo: "soldado",
                    color: "red",
                    w:15,
                    h:15
                },
                {
                x: (-0.25*Math.random())*canvas.width,
                y: (-0.3*Math.random())*canvas.height,
                vMax: (1.9 + 0.5*Math.random())*200,
                tipo: "soldado",
                color: "red",
                w:15,
                h:15
            },
            {
                x: (-0.35*Math.random())*canvas.width,
                y: (-0.3*Math.random())*canvas.height,
                vMax: (1.9 + 0.5*Math.random())*200,
                tipo: "soldado",
                color: "red",
                w:15,
                h:15
            },
            {
                x: (-0.35*Math.random())*canvas.width,
                y: (-0.3*Math.random())*canvas.height,
                vMax: (1.9 + 0.5*Math.random())*200,
                tipo: "soldado",
                color: "red",
                w:15,
                h:15
            },
            {
                x: (-0.55*Math.random())*canvas.width,
                y: (-0.3*Math.random())*canvas.height,
                vMax: (1.9 + 0.5*Math.random())*200,
                tipo: "soldado",
                color: "red",
                w:15,
                h:15
            },
            { 
                x:(1 +0.25*Math.random())*canvas.width,
                y:Math.random()*canvas.height,
                vMax: (0.9 + 0.5*Math.random())*200,
                tipo: "mago",
                color: "purple",
                w:15,
                h:15
            },
            { 
                x:(1 +0.25*Math.random())*canvas.width,
                y:Math.random()*canvas.height,
                vMax: (0.9 + 0.5*Math.random())*200,
                tipo: "mago",
                color: "purple",
                w:15,
                h:15
            },
            { 
                x:(1 +0.25*Math.random())*canvas.width,
                y:Math.random()*canvas.height,
                vMax: (0.9 + 0.5*Math.random())*200,
                tipo: "mago",
                color: "purple",
                w:15,
                h:15
            },
    
            ]},
    
        ]
    
        
    }
    //fase 3
    this.fase3 = {
        started : false,
        ended : false,
        tipo: "jogavel",
        objective: function(cena){
            return cena.eventos.length == 0 && cena.inimigos.length == 0;
        },
        eventos: [
            {t:0, tipo: "spawnaInimigos", inimigos:[
                {
                    x: (1 -0.25*Math.random())*canvas.width,
                    y: (1 - 0.5)*canvas.height,
                    vMax: (1.9 + 0.5*Math.random())*200,
                    tipo: "Necromante",
                    color: "Green",
                    w:15,
                    h:15,
                    nivel: "Elite",
                },
            ]}
        ]
    }
    
    this.end = {
        started : false,
        ended : false,
        tipo: "estatico",
        objective: function(cena){
            return false;
        },
        eventos: [
            {t:0, tipo: "tela", conteudo: function(cena){
                cena.ctx.font = "50px Comic Sans MS"
                cena.ctx.textAlign = "center"
                cena.ctx.fillStyle = "darkgreen"
                cena.ctx.fillText("Acabou-se", cena.x + cena.w/2, cena.y + cena.h/2)
                }
            }
        ]
    }
    this.telaMorreu = {
        started : false,
        ended : false,
        tipo: "estatico",
        objective: function(cena){
            return false;
        },
        eventos: [
            {t:0, tipo: "tela", conteudo: function(cena){
                console.log("vai pufavô")
                cena.ctx.save();
                cena.ctx.filter = "grayscale(80%)";
                cena.ctx.drawImage(canvas, 0,0);
                cena.ctx.restore();
                //cena.ctx.filter = "grayscale(0%)";
                }
            },
            // {t:0.1, tipo: "filtro", conteudo: function(cena){
            //     cena.ctx.filter = "grayscale(0%)";
            //     cena.filtro = null; // quando chamada, a função se "aNULLa";
            //     }
            // },
            {t:0.2, tipo: "tela", conteudo: function(cena){
                cena.ctx.font = "50px Comic Sans MS";
                cena.ctx.textAlign = "center";
                cena.ctx.fillStyle = "darkred";
                cena.ctx.fillText("Morreste", cena.x + cena.w/2, cena.y + cena.h/2);
                
                }
            }
        ]
    }
}
