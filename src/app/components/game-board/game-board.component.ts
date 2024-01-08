import { Component, OnInit } from '@angular/core';
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

  //Initialized variables
  matrixGenerated: number[][] = [];
  boardSizeInitial = 0
  pitsInitial = 0
   gameConfig$: any;
   wumpus: number = 1;
   gold: number = 2;
   hole: number = 3;
   HaveGold: boolean = false;
   GameStatusMessage: string = '';
   gamePerceptions: string = '';
   gamePerceptionsImage:string = '';
   gameStructure: {} = {};
   user: { row: number; column: number } = { row: 0, column: 0 };
   BoxSize: number = 50; //cavernicola image size
   arrowCountChild: number = 3;
   showMessage = false;
   rotationAngle = 0
   arrowInformationChild = ''
   showImage: boolean = false;
   arrowButton: boolean = true;
   showArrowMessage = false;
  
  constructor(
    public ModalService: modalService,
    private gamePerceptionsService: GameBoardVariablesService,
    private gameConfigService: GameConfigServiceService,
    
  ) {}

 

  ngOnInit(): void {
    this.gameConfigService
      .getConfigObserver()
      .subscribe((config: InitialStructure) => {
        console.log('Information received from the form:', config);

        this.boardSizeInitial = config.boardSize
        this.pitsInitial = config.numberOfPits
        this.matrixGenerated = this.generateRandomMatrix(config.boardSize, config.numberOfPits);

        //Play Again modal button
        this.ModalService.resetGame.subscribe(() => {
          this.resetGame()
        });
      });

  }



  resetGame(): void {
    
    //new matrix is generated
    this.matrixGenerated = this.generateRandomMatrix(this.boardSizeInitial, this.pitsInitial);
    //reset initial position and other variables when the game is restarted
    this.user = { row: 0, column: 0 };
    this.showMessage = false;
    this.HaveGold = false;
    this.gamePerceptionsService.setArrowState(this.arrowCountChild = 3 ) ;
    this.gamePerceptionsService.setArrowInformationState(this.arrowInformationChild = '');
    this.arrowButton = true;
    this.showArrowMessage = false;

  }

  
   


  //recorremos la matriz
  IterateMatrix() {
    for (let x = 0; x < this.matrixGenerated.length; x++) {
      for (let y = 0; y < this.matrixGenerated[x].length; y++) {}
    }
  }

  getAdjacentSquares(matrix: number[][], row: number, column: number) {
    const filas = matrix.length;
    const columnas = matrix[0].length;

    const boxesAdjacent: {
      left?: number;
      up?: number;
      right?: number;
      down?: number;
    } = {};

    // Box on the left
    if (column > 0) {
      boxesAdjacent.left = matrix[row][column - 1];
    }

    // Top box
    if (row > 0) {
      boxesAdjacent.up = matrix[row - 1][column];
    }

    // Box on the right
    if (column < columnas - 1) {
      boxesAdjacent.right = matrix[row][column + 1];
    }

    // Down box
    if (row < filas - 1) {
      boxesAdjacent.down = matrix[row + 1][column];
    }

    return boxesAdjacent;
  }

  evaluateSquare(valor: number | undefined): string {
    this.gamePerceptions = '';
    switch (valor) {
      case this.hole:
        this.gamePerceptions = 'There is a breeze';
        break;

      case this.gold:
        this.gamePerceptions = 'There is somethng shiny';
        break;

      case this.wumpus:
        this.gamePerceptions = 'It smells bad';
        break;
     
    }
    return this.gamePerceptions;
  }

  /*perceptionImage(value: number| undefined): string {
    this.gamePerceptionsImage = ''
    switch (value) {
    
      case this.hole:
        this.gamePerceptionsImage =  'assets/lavado-en-seco.png';
        break;
        

      case this.gold:
        this.gamePerceptionsImage ='assets/oro.png';
        break;

      case this.wumpus:
        this.gamePerceptionsImage = 'assets/wumpus.png';
        break;

    }
        
          return this.gamePerceptionsImage;
     
  }*/



  EvaluateAndUpdate(row: number, column: number) {
    let perceptions: string[] = [];
    const casillas = this.getAdjacentSquares(this.matrixGenerated,row,column);

    perceptions[0] = this.evaluateSquare(casillas.right);
    perceptions[1] = this.evaluateSquare(casillas.left);
    perceptions[2] = this.evaluateSquare(casillas.down);
    perceptions[3] = this.evaluateSquare(casillas.up);

    //this.perceptionImage(casillas.derecha)
    //console.log('PERCEPTIONIMAGE', this.perceptionImage(casillas.derecha));
   
    
    this.GameStatus(row, column);

    const noEmptyStrings = perceptions.filter((str) => str !== '');
    this.gamePerceptionsService.setModalState(noEmptyStrings.toString());
  }

       

  showModal(message: string): void {
    this.ModalService.openDialog(message);
  }

 

  GameStatus(row: number, column: number) {
    const CurrentSquareValue = this.matrixGenerated[this.user.row][this.user.column];
    const CurrentBox = this.matrixGenerated[row][column];

 
    //Verificamos si tiene el oro
    if (CurrentSquareValue === 2) {
      console.log('¡Has encontrado el oro!');
      // Eliminamos el oro de la matriz (asignando 0 a la posición)
      this.matrixGenerated[row][column] = 0;
      this.HaveGold = true;
      this.showMessage = true;
    }

    if (
      this.user.row === 0 &&
      this.user.column === 0 &&
      this.HaveGold === true
    ) {
      this.GameStatusMessage = 'You have won!';
      this.showModal(this.GameStatusMessage);
    }

    if (CurrentBox === this.wumpus) {
      this.GameStatusMessage = 'You have been caught by the WUMPUS. End of game';
      console.log('message=', this.GameStatusMessage);
      this.showModal(this.GameStatusMessage);
    }

    if (CurrentBox === this.hole) {
      this.GameStatusMessage = 'Oops! You have fallen into a well. End of game';
      console.log('message=', this.GameStatusMessage);
      this.showModal(this.GameStatusMessage);
    }
  }


  //Verificamos que los numeros 1,2 y 3 no aparezcan en la posición inicial del jugador x=0 y y=0
  generateRandomMatrix(gridSize:number, Pits:number): number[][] {
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
        (fila === this.user.row && columna === this.user.column)
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
        if (this.user.row > 0) {
          this.user.row--;
          this.EvaluateAndUpdate(this.user.row, this.user.column);
          this.rotationAngle = 270;
          this.arrowButton = true;
        }
        break;
      //verificamos si el usuario no esta en la última fila
      case 'abajo':
        if (this.user.row < this.matrixGenerated.length - 1) {
          this.user.row++;
          this.EvaluateAndUpdate(this.user.row, this.user.column);
          this.rotationAngle = 90;
          this.arrowButton = true;
        }
        break;
      case 'izquierda':
        if (this.user.column > 0) {
          this.user.column--;
          this.EvaluateAndUpdate(this.user.row, this.user.column);
          this.rotationAngle = 180;
          this.arrowButton = true;
        }
        break;
      case 'derecha':
        if (this.user.column < this.matrixGenerated[0].length - 1) {
          this.user.column++;
          this.EvaluateAndUpdate(this.user.row, this.user.column);
          this.rotationAngle = 0;
          this.arrowButton = true;
        }
        break;

    }
  }

  onKeyDown(event: KeyboardEvent): void {
    switch (event.code) {
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



  getPathImage(valorCasilla: number): string {
    switch (valorCasilla) {
      
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



  coordinatesValidator(matriz: number[][], fila: number, columna: number): boolean {
    return fila >= 0 && fila < matriz.length && columna >= 0 && columna < matriz[fila].length;
  }

  throwArrows(event: KeyboardEvent) {
    const matriz = this.matrixGenerated
    const direction = event.key;
    
    if (this.arrowCountChild > 0 ) {
      
      switch (direction) {
        case 'ArrowUp':
          if (this.user.row > 0 && matriz[this.user.row - 1][this.user.column] === 1 ) {
            matriz[this.user.row - 1][this.user.column] = 0;
            this.arrowInformationChild = 'You killed Wumpus ';
          } else { 
            this.arrowInformationChild = 'You have shot an arrow and missed the Wumpus!';
            
            
          }
          break;
        case 'ArrowDown':
          if (this.user.row < matriz.length - 1 && matriz[this.user.row + 1][this.user.column] === 1) {
            matriz[this.user.row + 1][this.user.column] = 0;
            this.arrowInformationChild = 'You killed Wumpus ';
          } else { 
            this.arrowInformationChild = 'You have shot an arrow and missed the Wumpus!';
            
            
          }
          break;
        case 'ArrowLeft':
          if (this.user.column > 0 && matriz[this.user.row][this.user.column - 1] === 1) {
            matriz[this.user.row][this.user.column - 1] = 0;
            this.arrowInformationChild = 'You killed Wumpus ';
          } else { 
            this.arrowInformationChild = 'You have shot an arrow and missed the Wumpus!';
            
            
          }
          
          break;
        case 'ArrowRight':
          if (this.user.column < this.matrixGenerated[0].length - 1 && matriz[this.user.row][this.user.column + 1] ===1 ) {
            matriz[this.user.row][this.user.column + 1] = 0;
            this.arrowInformationChild = 'You killed Wumpus ';
            
          } else { 
            this.arrowInformationChild = 'You have shot an arrow and missed the Wumpus!';
           
            
          }
          break;
        default:
          this.arrowInformationChild = 'Invalid direction';
      } 
       
    //Restamos una flecha
    this.gamePerceptionsService.setArrowState(this.arrowCountChild = this.arrowCountChild -1 ) 
    this.showArrowMessage = false
    } else {
      this.arrowInformationChild = 'You have run out of available arrows ';
    }
    //Actualizamos información al usuario
    this.gamePerceptionsService.setArrowInformationState(this.arrowInformationChild) 
    this.arrowButton = false;
    
   
  }

 
  
}

