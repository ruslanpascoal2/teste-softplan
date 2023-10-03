import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokemonsComponent } from './pokemons.component';
import { ModalContainerComponent } from './modal-container/modal-container.component';

const routes: Routes = [
  { path: '', component: PokemonsComponent },
  { path: ':id', component: ModalContainerComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PokemonsRoutingModule { }
