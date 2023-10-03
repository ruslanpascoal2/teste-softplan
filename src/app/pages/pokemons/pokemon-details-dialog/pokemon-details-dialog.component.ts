import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Observable, Subject, of, tap } from 'rxjs';
import { Pokemon } from '../pokemons.models';
import { PokemonFacade } from '../state/pokemons.facade';

@Component({
  selector: 'app-pokemon-details-dialog',
  templateUrl: './pokemon-details-dialog.component.html',
  styleUrls: ['./pokemon-details-dialog.component.scss'],
})
export class PokemonDetailsDialogComponent {
  onClose: Subject<boolean> = new Subject();
  pokemon$: Observable<Pokemon | undefined> = of();
  imageFailed = false;
  constructor(
    private modalRef: BsModalRef,
    private readonly pokemonFacade: PokemonFacade
  ) {}

  ngOnInit() {
    this.pokemon$ = this.pokemonFacade.openPokemon$.pipe(
      tap((openPokemon) => {
        if (!openPokemon) {
          this.close(); //caso entrar na url direto
        }
      })
    );
  }

  close(): void {
    this.pokemonFacade.closePokemonDetails();
    this.onClose.next(false);
    this.modalRef.hide();
  }
}
