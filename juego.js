
var juego = {
  filas: [ [], [], [] ],
  espacioVacio: {
  fila: 2,
  columna: 2
  },
  iniciar: function(tablero) {

      this.instalarPieza(tablero);
      this.capturarTeclas();
      this.mezclarFichas(10);
      
  },
  crearPieza: function(numero, fila, columna) {
    
    var objeto = $('<div>');

    objeto.addClass('pieza');
  
    objeto.css({
      
      backgroundImage:'url(piezas/'+numero+'.jpg)',
      top: fila * 200,      
      left: columna * 200

    });
    return {
      objeto,
      numero,
      fila,
      columna,
    };
  },
  instalarPieza: function(contenedor) {
    
    var contador = 1;

    for (var fila=0;fila<3;fila++) {
      
      for (var columna=0;columna<3;columna++) 
      {

        if ( (this.espacioVacio.fila == fila) && (this.espacioVacio.columna == columna) ) 

        {
        this.filas[fila][columna] =null;
        } else {
        
        var pieza= this.crearPieza(contador++,fila,columna);
        contenedor.append(pieza.objeto);
        this.filas[fila][columna]=pieza;
      
      }
              
      }

    }

  },
  capturarTeclas: function() {
        var referencia = this;
       	$(document).keydown(function(evento) {
          switch (evento.which)
          {
            case 37: referencia.moverHaciaLaIzquierda(); break;
            case 38: referencia.moverHaciaArriba(); break;
            case 39: referencia.moverHaciaLaDerecha(); break;
            case 40: referencia.moverHaciaAbajo(); break;
       		}

       	});
  },
  moverHaciaAbajo: function () {
      var filaOrigen = this.espacioVacio.fila - 1;
      var columnaOrigen = this.espacioVacio.columna;
      console.log("se mueve la pieza" + " " + filaOrigen + ", " + columnaOrigen);
      this.intercambiarPosicionConEspacioVacio(filaOrigen, columnaOrigen);
    },
    moverHaciaArriba: function () {
      var filaOrigen = this.espacioVacio.fila + 1;
      var columnaOrigen = this.espacioVacio.columna;
      console.log("se mueve la pieza" + " " + filaOrigen + ", " + columnaOrigen);
      this.intercambiarPosicionConEspacioVacio(filaOrigen, columnaOrigen);
    },
    moverHaciaLaDerecha: function () {
      var filaOrigen = this.espacioVacio.fila;
      var columnaOrigen = this.espacioVacio.columna - 1;
      console.log("se mueve la pieza" + " " + filaOrigen + ", " + columnaOrigen);
      this.intercambiarPosicionConEspacioVacio(filaOrigen, columnaOrigen);    
    },
    moverHaciaLaIzquierda: function () {
      var filaOrigen = this.espacioVacio.fila;
      var columnaOrigen = this.espacioVacio.columna + 1;
      console.log("se mueve la pieza" + " " + filaOrigen + ", " + columnaOrigen);
      this.intercambiarPosicionConEspacioVacio(filaOrigen, columnaOrigen);
    },

moverFichaFilaColumna: function(ficha, fila, columna) {
  ficha.objeto.css ({
    top: fila * 200,
    left: columna *200
  })
},
guardarEspacioVacio: function(fila,columna) {
  this.espacioVacio.fila= fila ;
  this.espacioVacio.columna= columna;
  this.filas[fila][columna] = null;
},
intercambiarPosicionConEspacioVacio: function(fila, columna) {
var ficha = this.filas[fila] && this.filas[fila][columna];
  if (ficha) { 
    this.filas[this.espacioVacio.fila][this.espacioVacio.columna] = ficha;
    this.moverFichaFilaColumna(ficha, this.espacioVacio.fila, this.espacioVacio.columna);
    this.guardarEspacioVacio(fila, columna);
    this.chequearSiGano();
  }
},
chequearSiGano: function() {
  for(var fila=0; fila<3; fila++){
      for(var columna=0; columna<3; columna++){
          var pieza = this.filas[fila][columna];
          if(pieza && !(fila == pieza.fila && columna == pieza.columna)){
            return false;
          }        
      }
    }
    alert("Ganaste!!");
},
mezclarFichas: function(veces){
    var metodos = ["moverHaciaLaIzquierda","moverHaciaArriba","moverHaciaAbajo","moverHaciaLaDerecha"];
    for(var i =0 ; i < veces; i++){
      var a = Math.floor(Math.random() * 4);
      var funcion= metodos[a];
       this[funcion]();
    }
  }

};

$(document).ready(function () {
  juego.iniciar( $("#juego") );
});
