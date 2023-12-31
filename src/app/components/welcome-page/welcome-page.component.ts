import { Component, OnDestroy, OnInit } from '@angular/core';
import { InitialStructure } from '../../Models/initial-structure.model';
import { GameConfigServiceService } from '../../services/game-config-service.service';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrl: './welcome-page.component.scss'
})
export class WelcomePageComponent implements OnInit, OnDestroy {

 
  config: InitialStructure | undefined;
  private configSubscription: Subscription | undefined;
  
  formGroup!: FormGroup;

  constructor(
    private gameConfigService: GameConfigServiceService,) {

    // Suscribirse a cambios en la configuración y almacenar la suscripción
    this.configSubscription = this.gameConfigService.getConfigObserver().subscribe((config: InitialStructure) => {
      console.log(config);
      this.config = config;
    });
  }

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
      arrowCount: new FormControl('', [Validators.required,Validators.minLength(1), Validators.maxLength(3) ]),
      boardSize: new FormControl('', [Validators.required, Validators.pattern(/^[4-9]|10$/)]),
      numberOfPits: new FormControl('', Validators.required),
    });
  }

  public onPlayClick() {
    this.gameConfigService.updateConfig(this.formGroup.value);
  }
  
}