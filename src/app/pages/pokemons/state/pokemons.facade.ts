import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { PokemonsState, pokemonsFeature } from './pokemons.state';
import { PokemonsActions } from './pokemons.actions';
import { Comment } from '../comments/comments.models';
import { Observable, filter, map } from 'rxjs';
import { Pokemon } from '../pokemons.models';

@Injectable()
export class PokemonFacade {

  totalPokemons$ = this.store.select(pokemonsFeature.selectTotal);
  pokemons$ = this.store.select(pokemonsFeature.selectPokemons);
  comments$ = this.store.select(pokemonsFeature.selectComments);

  constructor(private readonly store: Store<PokemonsState>) {}

  getPokemons(page = 0) {
    this.store.dispatch(PokemonsActions.getPokemonList({ page }));
  }

  getPokemon(url: string){
    this.store.dispatch(PokemonsActions.getPokemon({ url }));
  }

  toggleFavorite(pokemon: Pokemon){
    this.store.dispatch(PokemonsActions.toggleFavorite({pokemon}))
  }

  getPokemonComments(pokemonId: number) : Observable<Comment[]>{
    return this.comments$.pipe(
      map((comments) => comments.filter((c) => c.pokemonId === pokemonId))
    );
  }

  editComment(comment: Comment){
    this.store.dispatch(PokemonsActions.editComment({comment}))
  }

  addComment(comment: Comment) {
    this.store.dispatch(PokemonsActions.addComment({comment}))
  }

  deleteComment(comment: Comment) {
    this.store.dispatch(PokemonsActions.deleteComment({comment}))
  }
}
