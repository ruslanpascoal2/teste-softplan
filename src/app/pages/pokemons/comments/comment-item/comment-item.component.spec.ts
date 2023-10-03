import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentItemComponent } from './comment-item.component';
import { By } from '@angular/platform-browser';
import { Comment } from '../comments.models';
import { BsModalService } from 'ngx-bootstrap/modal';

describe('CommentItemComponent', () => {
  let component: CommentItemComponent;
  let fixture: ComponentFixture<CommentItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CommentItemComponent],
      providers:[{provide: BsModalService, useValue: () => {}}]
    });
    fixture = TestBed.createComponent(CommentItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should be able to edit a comment', () => {
    const mockComment: Comment = {
      id: '1',
      pokemonId: 213,
      text: 'this is a comment',
    };

    component.comment = mockComment;
    component.ngOnInit();
    fixture.detectChanges();
    const btn = fixture.debugElement.query(By.css('button[test-id="btn-edit-comment"]'));
    expect(btn).toBeTruthy();

    if(btn){
      btn.nativeElement.click();
    }
    fixture.detectChanges();
    expect(component.newComment).not.toEqual('wrong text')
    expect(component.newComment).toEqual(mockComment.text)
  });


  it('should cancel editing when cancel btn is clicked', () => {
    const mockComment: Comment = {
      id: '1',
      pokemonId: 213,
      text: 'this is a comment',
    };

    component.comment = mockComment;
    const spyEditDone = jest.spyOn(component, 'editDone');
    component.ngOnInit();
    component.startEditing();
    fixture.detectChanges();
    const btn = fixture.debugElement.query(By.css('button[test-id="btn-cancel"]'));
    expect(btn).toBeTruthy();

    if(btn) btn.nativeElement.click();
    expect(spyEditDone).toHaveBeenCalledWith(true);
  })

});
