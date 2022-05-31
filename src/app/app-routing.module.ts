import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameComponent } from './game/game.component';
import { HomeComponent } from './home/home.component';
import { PATHS } from './services/router.service';

const routes: Routes = [
  { path: PATHS.home, component: HomeComponent },
  { path: PATHS.game, component: GameComponent },
  { path: '**', redirectTo: PATHS.home }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
