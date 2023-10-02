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

  constructor(private readonly cdRef: ChangeDetectorRef) {}

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
    this.newComment = '';
    this.isEditing = false;
  }

  startEditing() {
    this.isEditing = true;
    this.cdRef.detectChanges();
    if (this.inputEl) {
      this.inputEl?.nativeElement.focus();
    }
  }

  deleteComment() {
    this.delete.emit(this.comment)
  }
}
