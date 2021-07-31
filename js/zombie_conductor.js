/* Para insipirarte para la implementacion del ZombieConductor podes usar
al ZombieCaminante de ejemplo. Tene en cuenta que tendra algunas diferencias.
Por ejemplo, la cantidad parametros que recibe su constructor. En ZombieConductor
no son exactamente los mismos parametros que en el objeto Enemigo, a diferencia
del ZombieCaminante que eran los mismos. */

var ZombieConductor = function(sprite, x, y, ancho, alto, velocidad, rangoMov, direccion) {
  /* Completar constructor a partir de Enemigo */
  Enemigo.call(this, sprite, x, y, ancho, alto, velocidad, rangoMov);
  this.direccion = direccion;

  /* No olvidar agregar la/s propiedad/es unicas de ZombieConductor necesarias */
}

ZombieConductor.prototype = Object.create(Enemigo.prototype);
ZombieConductor.prototype.constructor = ZombieConductor;
/* Completar creacion del ZombieConductor */

/* Completar metodos para el movimiento y el ataque */
ZombieConductor.prototype.mover = function(direccion) {
  
  if (this.direccion == 'h') {
    this.x -= this.velocidad;
      if (this.x < this.rangoMov.desdeX){
    this.x = this.rangoMov.hastaX;
  }
  } else if(this.direccion == 'v') {
    this.y += this.velocidad;
    if (this.y > this.rangoMov.hastaY){
    this.y = this.rangoMov.desdeY;
  }
  }
}

ZombieConductor.prototype.atacar = function(jugador) {
  jugador.perderVidas(6);
}

