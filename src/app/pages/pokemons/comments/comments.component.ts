import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { Comment } from './comments.models';
import { PokemonFacade } from '../state/pokemons.facade';
import { Observable, of} from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { CommentItemComponent } from './comment-item/comment-item.component';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent {
  @Input() pokemonId: number = 0;

  comments$: Observable<Comment[]> = of([]);
  newComment: Comment | undefined;

  constructor(private readonly pokemonsFacade: PokemonFacade, private cdRef: ChangeDetectorRef) {}

  ngOnInit() {
    this.comments$ = this.pokemonsFacade.getPokemonComments(this.pokemonId);
  }

  editComment(comment: Comment) {
    this.pokemonsFacade.editComment(comment);
  }

  addComment(comment: Comment) {
    this.pokemonsFacade.addComment(comment);
    this.newComment = undefined;
  }

  handleAddComment(component: CommentItemComponent){
    this.newComment = {
      id: uuidv4(),
      pokemonId: this.pokemonId,
      text: ''
    }
    this.cdRef.detectChanges();
    component.startEditing();
  }

  deleteComment(comment: Comment){
    this.pokemonsFacade.deleteComment(comment);
  }
}
