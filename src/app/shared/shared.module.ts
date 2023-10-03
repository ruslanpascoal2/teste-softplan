import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIconsModule } from '@ng-icons/core';
import {
  ionSearch,
  ionStarOutline,
  ionStar,
  ionChatbubbleEllipsesOutline,
  ionCloseCircle,
  ionAdd,
  ionCheckmarkCircle,
  ionCreate,
  ionPencilSharp,
  ionRemoveCircle,
  ionTrashOutline,
  ionEyeOutline,
  ionOpenOutline,
} from '@ng-icons/ionicons';
import { PaginatorModule } from './components/paginator/paginator.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeleteConfirmDialogComponent } from './components/delete-confirm-dialog/delete-confirm-dialog.component';
import { ModalContainerComponent } from './components/modal-container/modal-container.component';

@NgModule({
  declarations: [DeleteConfirmDialogComponent, ModalContainerComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgIconsModule.withIcons({
      ionSearch,
      ionStarOutline,
      ionStar,
      ionChatbubbleEllipsesOutline,
      ionCloseCircle,
      ionAdd,
      ionCheckmarkCircle,
      ionCreate,
      ionPencilSharp,
      ionRemoveCircle,
      ionTrashOutline,
      ionEyeOutline,
      ionOpenOutline,
    }),
    PaginatorModule,
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    NgIconsModule,
    PaginatorModule,
    DeleteConfirmDialogComponent,
  ],
})
export class SharedModule {}
