import { Component, Input } from '@angular/core';
import { Pokemon } from '../pokemons.models';
import { PokemonFacade } from '../state/pokemons.facade';
import { of } from 'rxjs';

@Component({
  selector: 'app-pokemon-item',
  templateUrl: './pokemon-item.component.html',
  styleUrls: ['./pokemon-item.component.scss']
})
export class PokemonItemComponent {
  @Input() pokemon: Pokemon | undefined = undefined;
  isFav$ = of(false);
  loadingImg = true;
  constructor(private readonly pokemonFacade: PokemonFacade){}

  ngOnInit(){
    if(this.pokemon){
      this.isFav$ = this.pokemonFacade.isPokemonFavorite(this.pokemon.id);
    }
  }

  toggleFavorite(pokemon: Pokemon){
    this.pokemonFacade.toggleFavorite(pokemon);
  }

  imageLoaded(e: any){
    this.loadingImg = false;
  }
}
