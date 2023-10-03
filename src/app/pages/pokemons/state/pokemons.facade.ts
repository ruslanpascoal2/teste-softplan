import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { PokemonsState, pokemonsFeature } from './pokemons.state';
import { PokemonsActions } from './pokemons.actions';
import { Comment } from '../comments/comments.models';
import { Observable, map } from 'rxjs';
import { Pokemon } from '../pokemons.models';

@Injectable()
export class PokemonFacade {

  loading$ = this.store.select(pokemonsFeature.selectIsLoading);
  totalPokemons$ = this.store.select(pokemonsFeature.selectCurrentTotal);
  comments$ = this.store.select(pokemonsFeature.selectComments);
  favs$ = this.store.select(pokemonsFeature.selectFavs);
  pokemons$ = this.store.select(pokemonsFeature.selectPokemonMap);
  pokemonsToDisplay$ = this.store.select(pokemonsFeature.selectPokemonsToDisplay);
  openPokemon$ = this.store.select(pokemonsFeature.selectOpenPokemon);
  searchError$ = this.store.select(pokemonsFeature.selectSearchError);
  searchLoading$ = this.store.select(pokemonsFeature.selectIsLoadingSearch);

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

  isPokemonFavorite(pokemonId: number): Observable<boolean>{
    return this.favs$.pipe(
      map((favs) => favs.findIndex((f) => f === pokemonId) > -1)
    )
  }

  pageChange(page: number){
    this.store.dispatch(PokemonsActions.pageChange({page}))
  }

  filter(terms: string){
    if(terms){
      this.store.dispatch(PokemonsActions.search({terms}))
      return;
    }
    this.pageChange(0);
  }

  openPokemonDetails(pokemon: Pokemon){
    this.store.dispatch(PokemonsActions.openPokemonDetails({pokemon}));
  }

  closePokemonDetails(){
    this.store.dispatch(PokemonsActions.closePokemonDetails());
  }

}
