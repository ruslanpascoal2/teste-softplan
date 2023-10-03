import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PokemonsRoutingModule } from './pokemons-routing.module';
import { PokemonsComponent } from './pokemons.component';
import { PokemonFilterComponent } from './pokemon-filter/pokemon-filter.component';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { PokemonItemComponent } from './pokemon-item/pokemon-item.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PokemonFacade } from './state/pokemons.facade';
import { StoreModule } from '@ngrx/store';
import { pokemonsFeature } from './state/pokemons.state';
import { PokemonEffects } from './state/pokemons.effects';
import { EffectsModule } from '@ngrx/effects';
import { CommentsComponent } from './comments/comments.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { CommentItemComponent } from './comments/comment-item/comment-item.component';
import { PokemonDetailsDialogComponent } from './pokemon-details-dialog/pokemon-details-dialog.component';


@NgModule({
  declarations: [
    PokemonsComponent,
    PokemonFilterComponent,
    PokemonListComponent,
    PokemonItemComponent,
    CommentsComponent,
    CommentItemComponent,
    PokemonDetailsDialogComponent
  ],
  imports: [
    CommonModule,
    PokemonsRoutingModule,
    SharedModule,
    NgxPaginationModule,
    StoreModule.forFeature(pokemonsFeature),
    EffectsModule.forFeature(PokemonEffects)
  ],
  providers: [
    PokemonFacade,
  ]
})
export class PokemonsModule { }
