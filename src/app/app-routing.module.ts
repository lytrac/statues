import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameComponent } from './game/game.component';
import { HomeComponent } from './home/home.component';
import { RankingComponent } from './ranking/ranking.component';
import { PATHS } from './services/router.service';

export const routes: Routes = [
  { path: PATHS.home, component: HomeComponent },
  { path: PATHS.game, component: GameComponent },
  { path: PATHS.ranking, component: RankingComponent },
  { path: '**', redirectTo: PATHS.home }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
