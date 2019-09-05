function  Vetor(x, y, mod) { //x,y é um vetor unitario
    this.mod = mod; //modulo
    this.x = x;
    this.y = y; //({x,y}) vetor unitario
}
// Vetor.prototype.add = function(v){
//     this.x += v.x;
//     this.y += v.y;
// }
// Vetor.prototype.normal = function(){
//     var len = this.len();
//     if(len == 0)
//         return new Vetor(0,0) 
//     return new Vetor(this.x/len, this.y/len);   
// }
// Vetor.prototype.len = function(){
//     return Math.sqrt(this.x*this.x + this.y*this.y);
// }
Vetor.prototype.floatProd = function(num){
    this.mod *= num;
}
Vetor.prototype.dotproduct = function(v){
    return (this.mod*v.mod)*(this.x*v.x + this.y*v.y);
}
Vetor.prototype.angleBetween = function(v){
    return Math.acos(this.dotproduct(v)/this.mod*v.mod);
}
// Vetor.prototype.angleXaxis = function(){
//     var v = new Vetor(1,0);
//     return Math.acos(this.dotproduct(v)/this.len*v.len);
// }
Vetor.prototype.normal = function(x,y){
    var len = Math.hypot(x,y);
    if(len == 0)
        return new Vetor(0,0,0);
    return new Vetor(x/len, y/len, len);
}
Vetor.prototype.returnAdd = function(v){
    var x =  this.x*this.mod + v.x*v.mod;
    var y =  this.y*this.mod + v.y*v.mod;
    return this.normal(x,y);
}
Vetor.prototype.returnFloatProd = function(num){
    return new Vetor(this.x, this.y, this.mod*num);
}
Vetor.prototype.vetorUnitario = function(x,y){
    var len = Math.hypot(x,y);
    if(len == 0)
        return new Vetor(0,0,0);
    return new Vetor(x/len, y/len, 1);
}
