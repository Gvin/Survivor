import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SurvivorGameComponent } from './components/game/game.component';
import { SurvivorMenuComponent } from './components/menu/menu.component';

const routes: Routes = [
    {path: '', component: SurvivorMenuComponent, pathMatch: 'full'},
    {path: 'game', component: SurvivorGameComponent, pathMatch: 'full'}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
