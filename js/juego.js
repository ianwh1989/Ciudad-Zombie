/* El objeto Juego sera el encargado del control de todo el resto de los Objetos
existentes.
Le dara ordenes al Dibujante para que dibuje entidades en la pantalla. Cargara
el mapa, chequeara colisiones entre los objetos y actualizara sus movimientos
y ataques. Gran parte de su implementacion esta hecha, pero hay espacios con el
texto COMPLETAR que deben completarse segun lo indique la consigna.

El objeto Juego contiene mucho codigo. Tomate tu tiempo para leerlo tranquilo
y entender que es lo que hace en cada una de sus partes. */
  
var Juego = {
  // Aca se configura el tamanio del canvas del juego
  anchoCanvas: 961,
  altoCanvas: 577,
  jugador: Jugador,
  vidasInicial: Jugador.vidas,
  // Indica si el jugador gano
  ganador: false,

  obstaculosCarretera: [
    /*Aca se van a agregar los obstaculos visibles. Tenemos una valla horizontal
    de ejemplo, pero podras agregar muchos mas. */
    new Obstaculo('imagenes/valla_horizontal.png', 100, 370, 30, 30, 1),
    new Obstaculo('imagenes/valla_horizontal.png', 166, 200, 30, 30, 1),
    new Obstaculo('imagenes/valla_horizontal.png', 800, 430, 30, 30, 1),
    new Obstaculo('imagenes/valla_horizontal.png', 460, 300, 30, 30, 1),
    new Obstaculo('imagenes/valla_horizontal.png', 490, 300, 30, 30, 1),
    new Obstaculo('imagenes/valla_horizontal.png', 760, 150, 30, 30, 1),
    new Obstaculo('imagenes/valla_vertical.png', 390, 400, 30, 30, 1),
    new Obstaculo('imagenes/valla_vertical.png', 490, 420, 30, 30, 1),
    new Obstaculo('imagenes/valla_vertical.png', 200, 430, 30, 30, 1),
    new Obstaculo('imagenes/valla_vertical.png', 200, 460, 30, 30, 1),
    new Obstaculo('imagenes/valla_horizontal.png', 600, 72, 30, 30, 1),
    new Obstaculo('imagenes/bache.png', 120, 260, 30, 30, 1),
    new Obstaculo('imagenes/bache.png', 70, 370, 30, 30, 1),
    new Obstaculo('imagenes/bache.png', 850, 300, 30, 30, 1),
    new Obstaculo('imagenes/bache.png', 350, 200, 30, 30, 1),
    new Obstaculo('imagenes/bache.png', 200, 487, 30, 30, 1),
    new Obstaculo('imagenes/bache.png', 440, 380, 60, 60, 1),
    new Obstaculo('imagenes/bache.png', 65, 470, 45, 45, 1),
    new Obstaculo('imagenes/bache.png', 95, 470, 45, 45, 1),
    new Obstaculo('imagenes/auto_verde_derecha.png', 430, 125, 30, 15, 1),
    new Obstaculo('imagenes/auto_verde_abajo.png', 280, 200, 15, 30, 1),
    new Obstaculo('imagenes/auto_verde_derecha.png', 770, 250, 30, 15, 1),
    



  ],
  /* Estos son los bordes con los que se puede chocar, por ejemplo, la vereda.
   Ya estan ubicados en sus lugares correspondientes. Ya aparecen en el mapa, ya
   que son invisibles. No tenes que preocuparte por ellos.*/
  bordes: [
    // // Bordes
    new Obstaculo('', 0, 5, 961, 18, 0),
    new Obstaculo('', 0, 559, 961, 18, 0),
    new Obstaculo('', 0, 5, 18, 572, 0),
    new Obstaculo('', 943, 5, 18, 572, 0),
    // Veredas
    new Obstaculo('', 18, 23, 51, 536, 1),
    new Obstaculo('', 69, 507, 690, 52, 1),
    new Obstaculo('', 587, 147, 173, 360, 1),
    new Obstaculo('', 346, 147, 241, 52, 1),
    new Obstaculo('', 196, 267, 263, 112, 1),
    new Obstaculo('', 196, 23, 83, 244, 1),
    new Obstaculo('', 279, 23, 664, 56, 1),
    new Obstaculo('', 887, 79, 56, 480, 1)
  ],
  // Los enemigos se agregaran en este arreglo.(sprite, x, y, ancho, alto, velocidad, rangoMov)
  enemigos: [
    new ZombieCaminante('imagenes/zombie1.png', 200, 150, 10, 10, 1, {desdeX: 0, hastaX: 961, desdeY: 0, hastaY: 577} ),
    new ZombieCaminante('imagenes/zombie2.png', 500, 100, 10, 10, 2, {desdeX: 0, hastaX: 961, desdeY: 0, hastaY: 577} ),
    new ZombieCaminante('imagenes/zombie3.png', 200, 400, 10, 10, 0.5, {desdeX: 0, hastaX: 961, desdeY: 0, hastaY: 577} ),
    new ZombieCaminante('imagenes/zombie4.png', 400, 400, 10, 10, 1, {desdeX: 0, hastaX: 961, desdeY: 0, hastaY: 577} ),
    new ZombieCaminante('imagenes/zombie1.png', 500, 480, 10, 10, 0.5, {desdeX: 0, hastaX: 961, desdeY: 0, hastaY: 577}),

    new ZombieConductor('imagenes/tren_vertical.png', 644, 500, 30, 90, 2, {desdeX: 0, hastaX: 961, desdeY: -90, hastaY: 577}, 'v'),
    new ZombieConductor('imagenes/tren_vertical.png', 678, 500, 30, 90, 3, {desdeX: 0, hastaX: 961, desdeY: -90, hastaY: 577}, 'v'),
    new ZombieConductor('imagenes/tren_horizontal.png', 400, 322, 90, 30, 3, {desdeX: -90, hastaX: 961, desdeY: 0, hastaY: 577}, 'h')
  ]

}

/* Se cargan los recursos de las imagenes, para tener un facil acceso
a ellos. No hace falta comprender esta parte. Pero si queres agregar tus propies
imagenes tendras que poner su ruta en la lista para que pueda ser precargada como
todas las demas. */
Juego.iniciarRecursos = function() {
  Resources.load([
    'imagenes/Mensaje1.png',
    'imagenes/Mensaje2.png',
    'imagenes/mapa.png',
    'imagenes/mensaje_gameover.png',
    'imagenes/Splash2.png',
    'imagenes/bache.png',
    'imagenes/tren_horizontal.png',
    'imagenes/tren_vertical.png',
    'imagenes/valla_horizontal.png',
    'imagenes/valla_vertical.png',
    'imagenes/zombie1.png',
    'imagenes/zombie2.png',
    'imagenes/zombie3.png',
    'imagenes/zombie4.png',
    'imagenes/auto_rojo_abajo.png',
    'imagenes/auto_rojo_arriba.png',
    'imagenes/auto_rojo_derecha.png',
    'imagenes/auto_rojo_izquierda.png',
    'imagenes/auto_verde_abajo.png',
    'imagenes/auto_verde_derecha.png'
  ]);
  Resources.onReady(Juego.comenzar.bind(Juego));
};

// Agrega los bordes de las veredas a los obstaculos de la carretera
Juego.obstaculos = function() {
  return this.obstaculosCarretera.concat(this.bordes);
};



Juego.comenzar = function() {
  // Inicializar el canvas del juego
  Dibujante.inicializarCanvas(this.anchoCanvas, this.altoCanvas);

  /* El bucle principal del juego se llamara continuamente para actualizar
  los movimientos y el pintado de la pantalla. Sera el encargado de calcular los
  ataques, colisiones, etc*/
  this.buclePrincipal();};

;
  


Juego.buclePrincipal = function() {
  // Con update se actualiza la logica del juego, tanto ataques como movimientos
  this.update();
  // Funcion que dibuja por cada fotograma a los objetos en pantalla.
  this.dibujar();
  // Esto es una forma de llamar a la funcion Juego.buclePrincipal() repetidas veces
  window.requestAnimationFrame(this.buclePrincipal.bind(this));
};

Juego.update = function() {
  this.calcularAtaques();
  this.moverEnemigos();
};
// Captura las teclas y si coincide con alguna de las flechas tiene que
// hacer que el jugador principal se mueva
Juego.capturarMovimiento = function(tecla) {
  var movX = 0;
  var movY = 0;
  var velocidad = this.jugador.velocidad;

  // El movimiento esta determinado por la velocidad del jugador
  if (tecla == 'izq') {
    movX = -velocidad;
    Jugador.sprite = 'imagenes/auto_rojo_izquierda.png';
    Jugador.ancho = 30;
    Jugador.alto = 15;
  }
  if (tecla == 'arriba') {
    movY = -velocidad;
    Jugador.sprite = 'imagenes/auto_rojo_arriba.png';
    Jugador.ancho = 15;
    Jugador.alto = 30;
  }
  if (tecla == 'der') {
    movX = velocidad;
    Jugador.sprite = 'imagenes/auto_rojo_derecha.png';
    Jugador.ancho = 30;
    Jugador.alto = 15;
  }
  if (tecla == 'abajo') {
    movY = velocidad;
    Jugador.sprite = 'imagenes/auto_rojo_abajo.png';
    Jugador.ancho = 15;
    Jugador.alto = 30;
  }

  // Si se puede mover hacia esa posicion hay que hacer efectivo este movimiento
  if (this.chequearColisiones(movX + this.jugador.x, movY + this.jugador.y)) {
    /* Aca tiene que estar la logica para mover al jugador invocando alguno
    de sus metodos  */
    this.jugador.x += movX;
    this.jugador.y += movY;

  }
};

Juego.dibujar = function() {
  // Borrar el fotograma actual
  Dibujante.borrarAreaDeJuego();
  //Se pinta la imagen de fondo segun el estado del juego
  this.dibujarFondo();


  /* Aca hay que agregar la logica para poder dibujar al jugador principal
  utilizando al dibujante y los metodos que nos brinda.
  "Dibujante dibuja al jugador" */
//Busca que el jugador no haya perdido ni ganado para dibujar los objetos
  if (this.jugador.vidas > 0 && Juego.ganador == false){
  Dibujante.dibujarEntidad(Jugador);

  // Se recorren los obstaculos de la carretera pintandolos
  this.obstaculosCarretera.forEach(function(obstaculo) {
    Dibujante.dibujarEntidad(obstaculo);
  });

  // Se recorren los enemigos pintandolos
  this.enemigos.forEach(function(enemigo) {
    Dibujante.dibujarEntidad(enemigo);
});
  

  

  // El dibujante dibuja las vidas del jugador
  var tamanio = this.anchoCanvas / this.vidasInicial;

  Dibujante.dibujarRectangulo('white', 0, 0, this.anchoCanvas, 8);

  for (var i = 0; i < this.jugador.vidas; i++) {
    var x = tamanio * i
    Dibujante.dibujarRectangulo('red', x, 0, tamanio, 8);
  }

  

  for(k=759; k<887; k=k+16) {
     Dibujante.dibujarRectangulo('black', k, 500, 8, 8);
    Dibujante.dibujarRectangulo('white', k, 508, 8, 8);
  }
  for(j=767; j<887; j=j+16) {
     Dibujante.dibujarRectangulo('white', j, 500, 8, 8);
     Dibujante.dibujarRectangulo('black', j, 508, 8, 8);
  }


}
};



/* Recorre los enemigos haciendo que se muevan. De la misma forma que hicimos
un recorrido por los enemigos para dibujarlos en pantalla ahora habra que hacer
una funcionalidad similar pero para que se muevan.*/
Juego.moverEnemigos = function() {
  this.enemigos.forEach(function(enemigo) {
  enemigo.mover();
 })
 };

/* Recorre los enemigos para ver cual esta colisionando con el jugador
Si colisiona empieza el ataque el zombie, si no, deja de atacar.
Para chequear las colisiones estudiar el metodo posicionValida. Alli
se ven las colisiones con los obstaculos. En este caso sera con los zombies. */
Juego.calcularAtaques = function(jugador) {
 
  this.enemigos.forEach(function(enemigo) {

    if (this.intersecan(enemigo, this.jugador, this.jugador.x, this.jugador.y)) {
      enemigo.comenzarAtaque(this.jugador);
     enemigo.velocidad *= -1;
      /* Si el enemigo colisiona debe empezar su ataque*/
    } else {
      enemigo.dejarDeAtacar();
      /* Sino, debe dejar de atacar*/
    }
  }, this);

};



/* Aca se chequea si el jugador se peude mover a la posicion destino.
 Es decir, que no haya obstaculos que se interpongan. De ser asi, no podra moverse */
Juego.chequearColisiones = function(x, y) {
  var puedeMoverse = true
  this.obstaculos().forEach(function(obstaculo) {
    if (this.intersecan(obstaculo, this.jugador, x, y)) {
        obstaculo.chocar();
      /*obstaculo debe chocar al jugador*/
      puedeMoverse = false
    }
  }, this)
  return puedeMoverse
};



/* Este metodo chequea si los elementos 1 y 2 si cruzan en x e y
 x e y representan la coordenada a la cual se quiere mover el elemento2*/
Juego.intersecan = function(elemento1, elemento2, x, y) {
  var izquierda1 = elemento1.x
  var derecha1 = izquierda1 + elemento1.ancho
  var techo1 = elemento1.y
  var piso1 = techo1 + elemento1.alto
  var izquierda2 = x
  var derecha2 = izquierda2 + elemento2.ancho
  var techo2 = y
  var piso2 = y + elemento2.alto

  return ((piso1 >= techo2) && (techo1 <= piso2) &&
    (derecha1 >= izquierda2) && (izquierda1 <= derecha2))
};



  

Juego.dibujarFondo = function() {
  // Si se termino el juego hay que mostrar el mensaje de game over de fondo
  if (this.terminoJuego()) {
    Dibujante.dibujarImagen('imagenes/mensaje_gameover.png', 0, 5, this.anchoCanvas, this.altoCanvas);
    document.getElementById('reiniciar').style.visibility = 'visible';
  }

  // Si se gano el juego hay que mostrar el mensaje de ganoJuego de fondo, cambia el estado de "ganador"
  else if (this.ganoJuego()) {
    Dibujante.dibujarImagen('imagenes/Splash2.png', 190, 20, 500, 450);
    document.getElementById('reiniciar').style.visibility = 'visible';
    this.ganador = true;
  } else {
    Dibujante.dibujarImagen('imagenes/mapa.png', 0, 5, this.anchoCanvas, this.altoCanvas);
  }
};

Juego.terminoJuego = function() {
  return this.jugador.vidas <= 0;

};

/* Se gana el juego si se sobre pasa cierto altura y */
Juego.ganoJuego = function() {
  return (this.jugador.y + this.jugador.alto) > 530;
};




//Inicia el juego luego del tiempo que lleva a las imagenes de apertura hacer la introduccion
$(document).ready(function () {
  setInterval(Juego.iniciarRecursos,13501);

});



// Activa las lecturas del teclado al presionar teclas
// Documentacion: https://developer.mozilla.org/es/docs/Web/API/EventTarget/addEventListener
document.addEventListener('keydown', function(e) {
  var allowedKeys = {
    37: 'izq',
    38: 'arriba',
    39: 'der',
    40: 'abajo'
  };

  Juego.capturarMovimiento(allowedKeys[e.keyCode]);
});


//Se cargan imagenes antes de iniciar el juego con una pequeña historia, luego inicia el juego
$(document).ready(function () {

  var iniciodos = $("#iniciodos");

  iniciodos.animate({opacity: '0'}, 5000);

  setInterval(inicio, 5000);
  function inicio() {iniciodos.css("background-image", "url('../imagenes/Mensaje2.png')")}

  setInterval(segundaImg,5000);
  function segundaImg() {iniciodos.animate({opacity: '1'}, 4000);}

//Cuenta regresiva
 setInterval(segundaImg3, 10500);
  function segundaImg3() {iniciodos.css("background-image", "url('../imagenes/3.png')")}
  
  setInterval(segundaImg2, 11500);
  function segundaImg2() {iniciodos.css("background-image", "url('../imagenes/2.png')")}
 
  setInterval(segundaImg1, 12500);
  function segundaImg1() {iniciodos.css("background-image", "url('../imagenes/1.png')")}

//Quitamos el div con las imagenes de inicio
  setInterval(borrarInicio, 13500);
  function borrarInicio() {iniciodos.remove();}

  

});

