import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { modalService } from '../../services/modal.service';
import { GameBoardVariablesService } from '../../services/game-board-variables.service';
import { GameConfigServiceService } from '../../services/game-config-service.service';
import { InitialStructure } from '../../Models/initial-structure.model';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrl: './game-board.component.scss',
})
export class GameBoardComponent implements OnInit {

  matrizGenerada: number[][] = [];
  boardSizeInitial = 0
  pitsInitial = 0
  
  constructor(
    public ModalService: modalService,
    private gamePerceptionsService: GameBoardVariablesService,
    private gameConfigService: GameConfigServiceService
  ) {}

 

  ngOnInit(): void {
    this.gameConfigService
      .getConfigObserver()
      .subscribe((config: InitialStructure) => {
        console.log('Información recibida del form:', config);

        this.boardSizeInitial = config.boardSize
        this.pitsInitial = config.numberOfPits
        
        this.matrizGenerada = this.generarMatrizAleatoria(config.boardSize, config.numberOfPits);

        this.ModalService.resetGame.subscribe(() => {
        
          this.resetGame()
          
        });

  
      });
  
  }



  resetGame(): void {
    
    //generamos nueva matriz
    this.matrizGenerada = this.generarMatrizAleatoria(this.boardSizeInitial, this.pitsInitial);
    //reiniciamos posicion inicial
    this.usuario = { fila: 0, columna: 0 };
    this.showMessage = false;

  }

  

  gameConfig$: any;
  wumpus: number = 1;
   gold: number = 2;
   hole: number = 3;
   wall: number = -1;
   exit: number = 4;
   HaveGold: boolean = false;
   GameStatusMessage: string = '';
   gamePerceptions: string = '';
  gameStructure: {} = {};
   usuario: { fila: number; columna: number } = { fila: 0, columna: 0 };
   casillaSize: number = 50; //tamaño de la imagen cavernicola
  arrowCount: number = 3;
  showMessage = false;


  //recorremos la matriz
  IterarMatriz() {
    for (let x = 0; x < this.matrizGenerada.length; x++) {
      for (let y = 0; y < this.matrizGenerada[x].length; y++) {}
    }
  }



  obtenerCasillasAdyacentes(matriz: number[][], fila: number, columna: number) {
    const filas = matriz.length;
    const columnas = matriz[0].length;

    const casillasAdyacentes: {
      izquierda?: number;
      arriba?: number;
      derecha?: number;
      abajo?: number;
    } = {};

    // Casilla a la izquierda
    if (columna > 0) {
      casillasAdyacentes.izquierda = matriz[fila][columna - 1];
    }

    // Casilla arriba
    if (fila > 0) {
      casillasAdyacentes.arriba = matriz[fila - 1][columna];
    }

    // Casilla a la derecha
    if (columna < columnas - 1) {
      casillasAdyacentes.derecha = matriz[fila][columna + 1];
    }

    // Casilla abajo
    if (fila < filas - 1) {
      casillasAdyacentes.abajo = matriz[fila + 1][columna];
    }

    return casillasAdyacentes;
  }

  evaluarCasilla(valor: number | undefined): string {
    this.gamePerceptions = '';
    switch (valor) {
      case this.hole:
        this.gamePerceptions = 'There is a breeze';
        break;

      case this.gold:
        this.gamePerceptions = 'There is somethng shiny';
        console.log('Game perceeptions:', this.gamePerceptions);
        break;

      case this.wumpus:
        this.gamePerceptions = 'It smells bad';
        break;

      case this.wall:
        break;

     
    }
    return this.gamePerceptions;
  }

  //Cuando clicamos la casilla nos da un mensaje
  EvaluateAndUpdate(fila: number, columna: number) {
    let perceptions: string[] = [];
    const casillas = this.obtenerCasillasAdyacentes(this.matrizGenerada,fila,columna);

    perceptions[0] = this.evaluarCasilla(casillas.derecha);
    perceptions[1] = this.evaluarCasilla(casillas.izquierda);
    perceptions[2] = this.evaluarCasilla(casillas.abajo);
    perceptions[3] = this.evaluarCasilla(casillas.arriba);
    this.GameStatus(fila, columna);

    const noEmptyStrings = perceptions.filter((str) => str !== '');
    this.gamePerceptionsService.setModalState(noEmptyStrings.toString());
  }


  showModal(message: string): void {
    this.ModalService.openDialog(message);
  }

  /*showModal() {
    this.modalService.setModalState(true);
    console.log(true);
    
  }*/

  GameStatus(fila: number, columna: number) {
    const valorCasillaActual =
      this.matrizGenerada[this.usuario.fila][this.usuario.columna];
    const casillaActual = this.matrizGenerada[fila][columna];

 
    //Verificamos si tiene el oro
    if (valorCasillaActual === 2) {
      console.log('¡Has encontrado el oro!');
      // Eliminamos el oro de la matriz (asignando 0 a la posición)
      this.matrizGenerada[fila][columna] = 0;
      this.HaveGold = true;
      this.showMessage = true;
    }

    if (
      this.usuario.fila === 0 &&
      this.usuario.columna === 0 &&
      this.HaveGold === true
    ) {
      this.GameStatusMessage = '¡Has ganado!';
      this.showModal(this.GameStatusMessage);
    }

    if (casillaActual === this.wumpus) {
      this.GameStatusMessage = 'Te ha pillado el WUMPUS. Fin del juego';
      console.log('message=', this.GameStatusMessage);
      this.showModal(this.GameStatusMessage);
    }

    if (casillaActual === this.hole) {
      this.GameStatusMessage = 'Ups! Has caído en un pozo. Fin del juego';
      console.log('message=', this.GameStatusMessage);
      this.showModal(this.GameStatusMessage);
    }
  }


  //Verificamos que los numeros 1,2 y 3 no aparezcan en la posición inicial del jugador x=0 y y=0
  generarMatrizAleatoria(gridSize:number, Pits:number): number[][] {
    const matriz: number[][] = [];
    const numeros = [1, 2]; //Wumpus y oro

    // Rellenar la matriz con ceros
    for (let i = 0; i < gridSize; i++) {
      matriz[i] = Array(gridSize).fill(0);
    }

    for (let i = 0; i < Pits + numeros.length; i++) {
      let fila, columna;
    
      do {
        fila = this.generarPosicionAleatorio(0, gridSize - 1);
        columna = this.generarPosicionAleatorio(0, gridSize - 1);
      } while (
        matriz[fila][columna] !== 0 ||
        (fila === this.usuario.fila && columna === this.usuario.columna)
      );
    
      // Seleccionar el número según la iteración
      //Durante cada iteración del bucle se coloca el número correcto (pozo, oro o wumpus) en una posición aleatoria de la matriz.
      let numero;

      if (i < Pits) {
        numero = 3;
      } else {
        numero = numeros[i - Pits];
      }
    

      matriz[fila][columna] = numero;
    }
    console.log('hola',matriz)
  
      return matriz;
    }

  generarPosicionAleatorio(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }



  moverUsuario(direccion: string) {
    switch (direccion) {
      case 'arriba':
        if (this.usuario.fila > 0) {
          this.usuario.fila--;
          this.EvaluateAndUpdate(this.usuario.fila, this.usuario.columna);
        }
        break;
      //verificamos si el usuario no esta en la última fila
      case 'abajo':
        if (this.usuario.fila < this.matrizGenerada.length - 1) {
          this.usuario.fila++;
          this.EvaluateAndUpdate(this.usuario.fila, this.usuario.columna);
        }
        break;
      case 'izquierda':
        if (this.usuario.columna > 0) {
          this.usuario.columna--;
          this.EvaluateAndUpdate(this.usuario.fila, this.usuario.columna);
        }
        break;
      case 'derecha':
        if (this.usuario.columna < this.matrizGenerada[0].length - 1) {
          this.usuario.columna++;
          this.EvaluateAndUpdate(this.usuario.fila, this.usuario.columna);
        }
        break;
    }
  }

  onKeyDown(event: KeyboardEvent) {
    switch (event.key) {
      case 'ArrowUp':
        this.moverUsuario('arriba');
        break;
      case 'ArrowDown':
        this.moverUsuario('abajo');
        break;
      case 'ArrowLeft':
        this.moverUsuario('izquierda');
        break;
      case 'ArrowRight':
        this.moverUsuario('derecha');
        break;
    }
  }

  obtenerRutaImagen(valorCasilla: number): string {
    switch (valorCasilla) {
      case 0:
        return 'assets/casilla-blanca.png';
      case 1:
        return 'assets/wumpus.png';
      case 2:
        return 'assets/oro.png';
      case 3:
        return 'assets/lavado-en-seco.png';

      default:
        return '0';
    }
  }

  detectarWumpus(): boolean {
    const casillasAdyacentes = this.obtenerCasillasAdyacentes(
      this.matrizGenerada,
      this.usuario.fila,
      this.usuario.columna
    );

    // Verifica si hay percepciones que indiquen la presencia del Wumpus (por ejemplo, un olor desagradable)
    if (
      this.evaluarCasilla(casillasAdyacentes.arriba) === 'It smells bad' ||
      this.evaluarCasilla(casillasAdyacentes.abajo) === 'It smells bad' ||
      this.evaluarCasilla(casillasAdyacentes.izquierda) === 'It smells bad' ||
      this.evaluarCasilla(casillasAdyacentes.derecha) === 'It smells bad'
    ) {
      return true;
    }

    return false;
  }

  lanzarFlecha() {
    if (this.arrowCount > 0) {
      if (this.detectarWumpus()) {
        // Lógica para indicar que el cazador ha acertado al Wumpus
        this.GameStatusMessage = '¡Has derrotado al Wumpus con una flecha!';
      } else {
        // Lógica para indicar que el cazador ha lanzado una flecha, pero no ha alcanzado al Wumpus
        this.GameStatusMessage =
          '¡Has lanzado una flecha, pero no has acertado al Wumpus!';
      }

      // Resta una flecha
      this.arrowCount--;
    } else {
      // Lógica para indicar que el cazador no tiene flechas disponibles
      this.GameStatusMessage = '¡Te has quedado sin flechas!';
      console.log('FLECHAS:', this.arrowCount);
    }
  }

  spinMovemnet() {}

  FormsInformation() {
    this.gameStructure = this.gameConfigService.getConfigObserver();
    console.log('structure recieved:', this.gameStructure);
    
  }

  



  
    
  
}

