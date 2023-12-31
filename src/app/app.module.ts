import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WelcomePageComponent } from './components/welcome-page/welcome-page.component';
import { ModalStateComponent } from './components/modal-state/modal-state.component';
import { GameBoardComponent } from './components/game-board/game-board.component';
import { GamePerceptionsComponent } from './components/game-perceptions/game-perceptions.component';
import { MatDialogModule } from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { GameConfigServiceService } from './services/game-config-service.service';





@NgModule({
  declarations: [
    AppComponent,
    WelcomePageComponent,
    ModalStateComponent,
    GameBoardComponent,
    GamePerceptionsComponent,
    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    MatCardModule,
    ReactiveFormsModule
  ],
  providers: [GameConfigServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
