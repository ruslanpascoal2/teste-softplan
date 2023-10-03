import { Component, Input } from '@angular/core';
import { Pokemon } from '../pokemons.models';
import { PokemonFacade } from '../state/pokemons.facade';
import { of } from 'rxjs';
import { BsModalService } from 'ngx-bootstrap/modal';
import { PokemonDetailsDialogComponent } from '../pokemon-details-dialog/pokemon-details-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pokemon-item',
  templateUrl: './pokemon-item.component.html',
  styleUrls: ['./pokemon-item.component.scss'],
})
export class PokemonItemComponent {
  @Input() pokemon: Pokemon | undefined = undefined;
  isFav$ = of(false);
  loadingImg = true;


  constructor(
    private readonly pokemonFacade: PokemonFacade,
    private readonly router: Router,
    private readonly modalService: BsModalService
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

  openDetails(pokemon: Pokemon) {
    const modalRef = this.modalService.show(PokemonDetailsDialogComponent, {
      initialState: {
        pokemon
      },
      class: 'modal-dialog-centered'})
  }
}
