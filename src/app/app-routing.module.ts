import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomePageComponent } from './components/welcome-page/welcome-page.component';
import { GameBoardComponent } from './components/game-board/game-board.component';

const routes: Routes = [
  {path: '', redirectTo: '/Welcome', pathMatch: 'full'},
  {path: 'Welcome', component: WelcomePageComponent },
  {path: 'Game', component: GameBoardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
