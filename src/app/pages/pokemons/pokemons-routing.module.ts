import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokemonsComponent } from './pokemons.component';
import { PokemonDetailsDialogComponent } from './pokemon-details-dialog/pokemon-details-dialog.component';

const routes: Routes = [
  { path: '', component: PokemonsComponent },
  { path: 'dialog', component: PokemonDetailsDialogComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PokemonsRoutingModule { }
