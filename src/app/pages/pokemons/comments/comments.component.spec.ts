import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentsComponent } from './comments.component';
import { PokemonFacade } from '../state/pokemons.facade';
import { Comment } from './comments.models';
import { Observable, of } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('CommentsComponent', () => {
  let component: CommentsComponent;
  let fixture: ComponentFixture<CommentsComponent>;
  const facade = {
    addComment: (comment: Comment) => {},
    editComment: (comment: Comment) => {},
    deleteComment: (comment: Comment) => {},
    getPokemonComments: (id: number): Observable<Comment[]> => of([]),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CommentsComponent],
      providers: [{ provide: PokemonFacade, useValue: facade }],
    });
    fixture = TestBed.createComponent(CommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('when pokemon has no comments, an Empty Comment Add button should be visible, when pokemon do has comments, then it should NOT', () => {
    jest.spyOn(facade, 'getPokemonComments').mockReturnValue(of([]));
    component.ngOnInit();
    fixture.detectChanges();
    let emptyCommentAddButton = fixture.debugElement.query(
      By.css('.empty-comment')
    );
    expect(emptyCommentAddButton).toBeTruthy();

    const mockComment: Comment = {
      id: '1',
      pokemonId: 213,
      text: 'comment',
    };
    jest.spyOn(facade, 'getPokemonComments').mockReturnValue(of([mockComment]));
    component.ngOnInit();
    fixture.detectChanges();
    emptyCommentAddButton = fixture.debugElement.query(
      By.css('.empty-comment')
    );
    expect(emptyCommentAddButton).toBeFalsy();
  });

  it('should list comments', () => {
    const mockComment: Comment = {
      id: '1',
      pokemonId: 213,
      text: 'comment',
    };
    jest.spyOn(facade, 'getPokemonComments').mockReturnValue(of([mockComment, mockComment, mockComment]));
    component.ngOnInit();
    fixture.detectChanges();
    const comments = fixture.debugElement.queryAll(By.css('app-comment-item[test-id="comment-item"]'));
    expect(comments.length).toBe(3);
  });

  it('should call facade to remove a comment', () => {
    const mockComment: Comment = {
      id: '1',
      pokemonId: 213,
      text: 'comment',
    };
    const spy = jest.spyOn(facade, 'deleteComment');

    component.ngOnInit();
    component.deleteComment(mockComment);
    expect(spy).toHaveBeenCalled();
  })
  it('should call facade to add a comment', () => {
    const mockComment: Comment = {
      id: '1',
      pokemonId: 213,
      text: 'comment',
    };
    const spy = jest.spyOn(facade, 'addComment');
    component.ngOnInit();
    component.addComment(mockComment);
    expect(spy).toHaveBeenCalled();
  })
  it('should call facade to edit a comment', () => {
    const mockComment: Comment = {
      id: '1',
      pokemonId: 213,
      text: 'comment',
    };
    const spy = jest.spyOn(facade, 'editComment');
    component.ngOnInit();
    component.editComment(mockComment)
    expect(spy).toHaveBeenCalled();
  })

});
