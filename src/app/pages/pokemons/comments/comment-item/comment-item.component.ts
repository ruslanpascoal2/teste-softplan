import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { Comment } from '../comments.models';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import { DeleteConfirmDialogComponent } from 'src/app/shared/components/delete-confirm-dialog/delete-confirm-dialog.component';

@Component({
  selector: 'app-comment-item',
  templateUrl: './comment-item.component.html',
  styleUrls: ['./comment-item.component.scss'],
})
export class CommentItemComponent {
  @Input() comment: Comment | undefined = undefined;
  @Input() isNewComment = false;
  @Output() edit = new EventEmitter<Comment>();
  @Output() add = new EventEmitter<Comment>();
  @Output() delete = new EventEmitter<Comment>();
  @Output() cancel = new EventEmitter();
  @ViewChild('inputEl') inputEl: ElementRef | undefined;

  newComment = '';
  isEditing = false;

  constructor(
    private readonly cdRef: ChangeDetectorRef,
    private readonly modalService: BsModalService
  ) {}

  ngOnInit() {
    this.newComment = this.comment?.text || '';
  }

  editDone(cancel = false) {
    if (!cancel && this.comment?.id) {
      const comment: Comment = {
        ...this.comment,
        text: this.newComment,
      };
      this.isNewComment ? this.add.emit(comment) : this.edit.emit(comment);
    } else {
      if (this.isNewComment) this.cancel.emit();
    }
    this.isEditing = false;
  }

  startEditing() {
    if (this.comment) {
      this.newComment = this.comment.text;
    }
    this.isEditing = true;
    this.cdRef.detectChanges();
    if (this.inputEl) {
      this.inputEl?.nativeElement.focus();
    }
  }

  openDeleteConfirmation() {
    let modalRef = this.modalService.show(
      DeleteConfirmDialogComponent,
      {class: 'modal-dialog-centered'}
    );
    modalRef.content?.onClose.subscribe((result) => {
      result && this.deleteComment();
    });
  }

  deleteComment() {
    this.delete.emit(this.comment);
  }
}
