import { Component, OnDestroy } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { PokemonDetailsDialogComponent } from 'src/app/pages/pokemons/pokemon-details-dialog/pokemon-details-dialog.component';

@Component({
  selector: 'app-modal-container',
  template: '',
})
export class ModalContainerComponent implements OnDestroy {
  destroy = new Subject<any>();
  currentDialog!: BsModalRef<PokemonDetailsDialogComponent>;

  constructor(
    private modalService: BsModalService,
    route: ActivatedRoute,
    router: Router
  ) {
    route.params.pipe(takeUntil(this.destroy)).subscribe(() => {
      this.currentDialog = this.modalService.show(
        PokemonDetailsDialogComponent,
        { class: 'modal-dialog-centered' }
      );
      this.currentDialog.onHide?.subscribe(() => {
        router.navigateByUrl('/');
      });
    });
  }

  ngOnDestroy() {
    this.destroy.next(true);
    this.destroy.complete();
  }
}
