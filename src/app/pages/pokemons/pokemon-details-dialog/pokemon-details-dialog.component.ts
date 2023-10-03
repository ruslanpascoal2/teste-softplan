import { Component, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { Pokemon } from '../pokemons.models';

@Component({
  selector: 'app-pokemon-details-dialog',
  templateUrl: './pokemon-details-dialog.component.html',
  styleUrls: ['./pokemon-details-dialog.component.scss'],
})
export class PokemonDetailsDialogComponent {

  onClose: Subject<boolean> = new Subject();
  pokemon!: Pokemon;

  constructor(private _bsModalRef: BsModalRef) {}

  close(): void {
    this.onClose.next(false);
    this._bsModalRef.hide();
  }
}
