import { Component, OnDestroy, OnInit } from '@angular/core';
import { InitialStructure } from '../../Models/initial-structure.model';
import { GameConfigServiceService } from '../../services/game-config-service.service';
import { Subscription } from 'rxjs';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { GameBoardComponent } from '../game-board/game-board.component';


@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrl: './welcome-page.component.scss'
})
export class WelcomePageComponent implements OnInit, OnDestroy {

 
  config: InitialStructure | undefined;
  private configSubscription: Subscription | undefined;
  showGameBoard: boolean = false
  formGroup!: FormGroup;



  constructor(
    private gameConfigService: GameConfigServiceService,) {

    // Suscribirse a cambios en la configuración y almacenar la suscripción
    this.configSubscription = this.gameConfigService.getConfigObserver().subscribe((config: InitialStructure) => {
      console.log('array:',config);
      this.config = config;
    });
  }

    //inicializamos el formulario
  ngOnInit(): void {
    this.initFormGroup();
  }

  ngOnDestroy(): void {
    // Desuscribirse en ngOnDestroy
    if (this.configSubscription) {
      this.configSubscription.unsubscribe();
    }
  }

  private initFormGroup(): void {
    this.formGroup = new FormGroup({
      boardSize: new FormControl('', [Validators.required, Validators.minLength(1), Validators.pattern(/^[0-9]*$/), Validators.max(10),Validators.min(4)]),
      numberOfPits: new FormControl('', [Validators.required, Validators.pattern(/^[3-9]|10$/) ])
    }, [this.validatePits]);
  }
  


  private validatePits: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const boardSize = control.get('boardSize')?.value;
    const numberOfPits = control.get('numberOfPits')?.value;
    
    if (numberOfPits > boardSize * 2 * 0.8) {
      return { pitsError: 'Los hoyos no pueden superar el 80% del tamaño de la cuadrícula.' };
    }
    
    return null;
  }

  //actualizamos la información almacenada en el servicio
  public onPlayClick() {
    console.log(this.formGroup);
    

    // Obtener los valores del formulario
    const boardSize = this.formGroup.get('boardSize')?.value;
    const numberOfPits = this.formGroup.get('numberOfPits')?.value;

    // Actualizar la configuración del juego
    const config: InitialStructure = {
      boardSize: boardSize,
      numberOfPits: numberOfPits
    };
    this.gameConfigService.updateConfig(config);

    /*if (this.formGroup.valid) {
      this.showGameBoard = true;
  };*/
};


}
  
