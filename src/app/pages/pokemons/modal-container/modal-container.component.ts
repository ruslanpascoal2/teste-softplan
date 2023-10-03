import { Component, OnDestroy } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil, withLatestFrom } from 'rxjs/operators';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { PokemonDetailsDialogComponent } from '../pokemon-details-dialog/pokemon-details-dialog.component';
import { PokemonFacade } from '../state/pokemons.facade';

@Component({
  selector: 'app-modal-container',
  template: '',
})
export class ModalContainerComponent implements OnDestroy {
  destroy = new Subject<any>();
  currentDialog!: BsModalRef<PokemonDetailsDialogComponent>;

  constructor(
    private modalService: BsModalService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly pokemonFacade: PokemonFacade
  ) {}

  ngOnInit(){
    const page$ = this.pokemonFacade.currentPage$;
    this.route.params.pipe(takeUntil(this.destroy)).subscribe(() => {
      this.currentDialog = this.modalService.show(
        PokemonDetailsDialogComponent,
        { class: 'modal-dialog-centered' }
      );
      if (this.currentDialog.onHide) {
        this.currentDialog.onHide.pipe(withLatestFrom(page$)).subscribe(([_, page]) => {
          this.router.navigate([''], { queryParams: { page: page + 1} });
        });
      }
    });
  }

  ngOnDestroy() {
    this.destroy.next(true);
    this.destroy.complete();
  }
}
