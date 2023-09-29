import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PokemonsRoutingModule } from './pokemons-routing.module';
import { PokemonsComponent } from './pokemons.component';
import { PokemonFilterComponent } from './pokemon-filter/pokemon-filter.component';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { PokemonItemComponent } from './pokemon-item/pokemon-item.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    PokemonsComponent,
    PokemonFilterComponent,
    PokemonListComponent,
    PokemonItemComponent
  ],
  imports: [
    CommonModule,
    PokemonsRoutingModule,
    SharedModule
  ]
})
export class PokemonsModule { }
