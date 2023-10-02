import { Component } from '@angular/core';
import { PokemonFacade } from './state/pokemons.facade';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import { Pokemon } from './pokemons.models';

@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemons.component.html',
  styleUrls: ['./pokemons.component.scss'],
})
export class PokemonsComponent {
  totalPokemons$ = of(0);
  currentPage = 1;
  pageSize = 10;
  pokemons$: Observable<Pokemon[]> = of([]);
  loading$: Observable<boolean> = of(false);
  visitedPages = new Set();
  pokemonsToDisplay$ = new BehaviorSubject<Pokemon[]>([]);

  constructor(private readonly pokemonFacade: PokemonFacade) {}

  ngOnInit() {
    this.loading$ = this.pokemonFacade.loading$;
    this.totalPokemons$ = this.pokemonFacade.totalPokemons$;
    this.pokemons$ = this.pokemonFacade.pokemonsToDisplay$;
    this.onPageChange(1);
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.pokemonFacade.pageChange(page - 1);
  }


}
