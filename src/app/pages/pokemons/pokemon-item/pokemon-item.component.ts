import { Component, Input } from '@angular/core';
import { Pokemon } from '../pokemons.models';
import { PokemonFacade } from '../state/pokemons.facade';
import { of } from 'rxjs';
import { BsModalService } from 'ngx-bootstrap/modal';
import { PokemonDetailsDialogComponent } from '../pokemon-details-dialog/pokemon-details-dialog.component';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-pokemon-item',
  templateUrl: './pokemon-item.component.html',
  styleUrls: ['./pokemon-item.component.scss'],
})
export class PokemonItemComponent {
  @Input() pokemon: Pokemon | undefined = undefined;
  isFav$ = of(false);
  loadingImg = true;
  imageFailed = false;

  constructor(
    private readonly pokemonFacade: PokemonFacade,
    private readonly modalService: BsModalService,
    private router: Router
  ) {}

  ngOnInit() {
    if (this.pokemon) {
      this.isFav$ = this.pokemonFacade.isPokemonFavorite(this.pokemon.id);
    }
  }

  toggleFavorite(pokemon: Pokemon) {
    this.pokemonFacade.toggleFavorite(pokemon);
  }

  imageLoaded() {
    this.loadingImg = false;
  }

  imageError() {
    this.loadingImg = false;
    this.imageFailed = true;
  }

  openDetails(pokemon: Pokemon) {
    this.pokemonFacade.openPokemonDetails(pokemon);
    this.router.navigate([pokemon.id]);
  }
}
