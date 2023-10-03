import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PokemonsService } from '../pokemons.service';
import { PokemonsActions } from './pokemons.actions';
import { catchError, exhaustMap, forkJoin, map, of, switchMap, withLatestFrom } from 'rxjs';
import { PokemonsState, pokemonsFeature } from './pokemons.state';
import { Action, Store } from '@ngrx/store';

@Injectable()
export class PokemonEffects {
  constructor(
    private actions$: Actions,
    private store$: Store<PokemonsState>,
    private pokemonsService: PokemonsService
  ) {}

  pageChange$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PokemonsActions.pageChange),
      withLatestFrom(this.store$.select(pokemonsFeature.selectPokemonMap)),
      map(([{page}, pokemonMap]) => {
        if (page in pokemonMap) {
          return PokemonsActions.updateDisplayedPokemons({results: pokemonMap[page as keyof typeof pokemonMap] || []});
        } else {
          return PokemonsActions.getPokemonList({ page });
        }
      })
    )
  );

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
      exhaustMap(({response}) => {
        const urls = response.results.map((result) => result.url);
        const serviceCalls = urls.map((url) =>
          this.pokemonsService.getPokemonDetails(url)
        );
        return forkJoin(serviceCalls).pipe(
          switchMap((pokemons) => {
            const actionsToDispatch: Action[] = pokemons.map((p) =>
                PokemonsActions.getPokemonSuccess({
                  pokemon: p
                })
            );
            actionsToDispatch.push(PokemonsActions.updateDisplayedPokemons({results: pokemons}));
            return actionsToDispatch;
          })
        );
      })
    )
  );

  filter$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PokemonsActions.search),
      exhaustMap(({ terms }) =>
        this.pokemonsService.search(terms).pipe(
          map((result) => {
            return PokemonsActions.searchSuccess({result});
          }),
          catchError((err) => of(PokemonsActions.searchError(err)))
        )
      )
    )
  );
}
