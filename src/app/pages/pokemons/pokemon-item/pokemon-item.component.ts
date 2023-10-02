import { Component, Input } from '@angular/core';
import { Pokemon } from '../pokemons.models';
import { PokemonFacade } from '../state/pokemons.facade';

@Component({
  selector: 'app-pokemon-item',
  templateUrl: './pokemon-item.component.html',
  styleUrls: ['./pokemon-item.component.scss']
})
export class PokemonItemComponent {
  @Input() pokemon: Pokemon | undefined = undefined;

  constructor(private readonly pokemonFacade: PokemonFacade){}

  toggleFavorite(pokemon: Pokemon){
    this.pokemonFacade.toggleFavorite(pokemon);
  }
}
