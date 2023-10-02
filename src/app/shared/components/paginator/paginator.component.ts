import { Component, EventEmitter, Input, Output } from '@angular/core';

interface Page {
  pageNumber: number;
}

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
})
export class PaginatorComponent {
   @Input() currentPage = 0;
   @Input() total = 0;
   @Output() pageChange = new EventEmitter<any>();

  // pages: Page[] = [];
  // pagesToShow: Page[] = [];

  // ngOnInit(){
  //   const totalPages = Math.floor(this.total / this.pageSize);
  //   this.pages = Array(totalPages).fill({}).map((x, i) => ({pageNumber: i}))
  //   this.pagesToShow = this.pages.filter((x) => x.pageNumber - this.currentPage <= 2);
  // }

  // pageClick(page: Page){
  //   if(this.currentPage === page.pageNumber) return;
  //   this.pageChanged.emit(page.pageNumber);
  //   this.currentPage = page.pageNumber;
  // }

  // next() {
  //   this.pageChanged.emit(this.currentPage + 1);
  //   this.currentPage++;
  //   this.setPagesTotShow();
  // }

  // previous() {
  //   this.pageChanged.emit(this.currentPage - 1);
  //   this.currentPage--;
  // }

  // setPagesTotShow(){
  //   this.pagesToShow = this.pages.filter((x) => (x.pageNumber - this.currentPage <= 2) && (this.currentPage - x.pageNumber < 1));
  // }

}
