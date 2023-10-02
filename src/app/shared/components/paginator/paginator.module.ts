import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginatorComponent } from './paginator.component';
import { NgIconsModule } from '@ng-icons/core';
import { ionChevronBack, ionChevronForward } from '@ng-icons/ionicons';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [PaginatorComponent],
  imports: [
    CommonModule,
    NgIconsModule.withIcons({ ionChevronBack, ionChevronForward }),
    NgxPaginationModule
  ],
  exports: [PaginatorComponent],
})
export class PaginatorModule {}
