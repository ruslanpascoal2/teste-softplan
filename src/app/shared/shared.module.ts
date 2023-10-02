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
  ionTrashOutline
} from '@ng-icons/ionicons';
import { PaginatorModule } from './components/paginator/paginator.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
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
      ionTrashOutline
    }),
    PaginatorModule,
  ],
  exports: [FormsModule, NgIconsModule, PaginatorModule],
})
export class SharedModule {}
