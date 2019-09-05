function Skill(exemplo){
    var {
        duration = 0.1,
        cooldown = 1,
        isActive = false,
        onGoing = 0,
        onCooldown = 0,
        start = undefined,
        active = undefined,
        recovery = undefined,
        isTryingTo = false,
        isAbleTo = true,
        desenhaActive = undefined,
        desenhaRecovery = undefined,
    } = exemplo;
    this.duration =  duration;
    this.cooldown = cooldown;
    this.isActive = isActive;
    this.onGoing = onGoing;
    this.onCooldown = onCooldown;
    this.start = start;
    this.active = active;
    this.recovery = recovery;
    this.isTryingTo = isTryingTo;
    this.isAbleTo = isAbleTo;
}
Skill.prototype.update = function(char, dt){
    if(this.onGoing <= 0 && this.onCooldown <= 0 && this.isTryingTo == true){
        //console.log(this)
        this.onGoing = this.duration;
        console.log(this.onGoing);
        this.start(char);
    }
    else if(this.onGoing > 0){ //tryingTo n importa, pq tá no meio da skill, coolDown n importa pq ta no meio da skill
        console.log("hmmn");
        this.onGoing -= dt;
        if(this.onGoing <= 0){
            this.onCooldown = this.cooldown;
        }
        this.active(char, dt);
        
    }
    else if(this.onGoing <= 0 && this.onCooldown > 0){
        this.onCooldown -= dt;
        this.recovery(char, dt);
    }
    else if(this.onGoing <= 0 && this.onCooldown > 0 && this.isTryingTo == true){
        console.log("Tá no Cooldown");
    }
    else{
        ; 
    }
}
Skill.prototype.desenhar = function(ctx, char, dt){
    // if(this.onGoing <= 0 && this.onCooldown <= 0 && this.isTryingTo == true){
    //     this.start(char);
    //     this.onGoing = this.duration
    // } else 
    if(this.onGoing > 0){ //tryingTo n importa, pq tá no meio da skill, coolDown n importa pq ta no meio da skill
        this.desenhaActive(ctx, char, dt);
    }
    else if(this.onGoing <= 0 && this.onCooldown > 0){
        this.desenhaRecovery(ctx, char, dt);
    }
    else if(this.onGoing <= 0 && this.onCooldown > 0 && this.isTryingTo == true){
        console.log("Tá no Cooldown"); //NUNCA VAI ENTRAR NESSE IF, esqueci;
    }
    else{
        ; 
    }
}
Skill.prototype.interrupt = function(){
        this.onGoing = 0;
        this.onCooldown = this.cooldown;
}