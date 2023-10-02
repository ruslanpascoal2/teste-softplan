import { Component } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-delete-confirm-dialog',
  templateUrl: './delete-confirm-dialog.component.html',
  styleUrls: ['./delete-confirm-dialog.component.scss'],
})
export class DeleteConfirmDialogComponent {

  onClose: Subject<boolean> = new Subject();

  constructor(private _bsModalRef: BsModalRef) {}

  onConfirm(): void {
    this.onClose.next(true);
    this._bsModalRef.hide();
  }

  onCancel(): void {
    this.onClose.next(false);
    this._bsModalRef.hide();
  }
}
