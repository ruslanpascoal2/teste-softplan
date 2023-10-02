import { Component } from '@angular/core';
import { PokemonFacade } from './state/pokemons.facade';
import { Observable, map, of } from 'rxjs';
import { Pokemon } from './pokemons.models';

@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemons.component.html',
  styleUrls: ['./pokemons.component.scss'],
})
export class PokemonsComponent {
  totalPokemons$ = of(0);
  currentPage = 0;
  pokemons$: Observable<Pokemon[]> = of([]);

  constructor(private readonly pokemonFacade: PokemonFacade) {}

  ngOnInit() {
    this.pokemonFacade.getPokemons();
    this.totalPokemons$ = this.pokemonFacade.totalPokemons$;
    this.pokemons$ = this.pokemonFacade.pokemons$;
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.pokemonFacade.getPokemons(page);
  }
}
