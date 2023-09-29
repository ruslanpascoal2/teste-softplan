import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIconsModule } from '@ng-icons/core';
import { ionSearch, ionStarOutline, ionStar } from '@ng-icons/ionicons';
import { PaginatorModule } from './components/paginator/paginator.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgIconsModule.withIcons({ ionSearch, ionStarOutline, ionStar }),
    PaginatorModule
  ],
  exports: [NgIconsModule, PaginatorModule]
})
export class SharedModule {}
