import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PokemonsService } from '../pokemons.service';
import { PokemonsActions } from './pokemons.actions';
import {
  catchError,
  exhaustMap,
  forkJoin,
  map,
  of,
  switchMap,
} from 'rxjs';

@Injectable()
export class PokemonEffects {
  constructor(
    private actions$: Actions,
    private pokemonsService: PokemonsService
  ) {}

  getPokemonList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PokemonsActions.getPokemonList),
      exhaustMap(({ page }) =>
        this.pokemonsService.getPokemonList(page).pipe(
          map((response) => {
            return PokemonsActions.getPokemonListSuccess({ response });
          }),
          catchError(() => of(PokemonsActions.getPokemonListError))
        )
      )
    )
  );

  getPokemonDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PokemonsActions.getPokemonListSuccess),
      exhaustMap(({ response }) => {
        const urls = response.results.map((result) => result.url);
        const serviceCalls = urls.map((url) =>
          this.pokemonsService.getPokemonDetails(url)
        );
        return forkJoin(serviceCalls).pipe(
          switchMap((pokemons) => {
            const actionsToDispatch = pokemons.map((p) =>
              PokemonsActions.getPokemonSuccess({ pokemon: p })
            );
            return actionsToDispatch;
          })
        );
      })
    )
  );
}
