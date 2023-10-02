import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Pokemon, PokemonListResponse } from '../pokemons.models';
import { Comment } from '../comments/comments.models';

export const PokemonsActions = createActionGroup({
  source: 'Pokemons',
  events: {
    'Get Pokemon List': props<{ page: number }>(),
    'Get Pokemon List Success': props<{ response: PokemonListResponse }>(),
    'Get Pokemon List Error': props<{ error: Error }>(),
    'Get Pokemon': props<{ url: string }>(),
    'Get Pokemon Success': props<{ pokemon: Pokemon }>(),
    'Get Pokemon Error': props<{ error: Error }>(),
    'Add Comment': props<{ comment: Comment }>(),
    'Edit Comment': props<{ comment: Comment }>(),
    'Delete Comment': props<{ comment: Comment }>(),
    'Toggle Favorite': props<{ pokemon: Pokemon }>(),
    'Page Change': props<{page: number}>(),
    'Update Displayed Pokemons': props<{results: Pokemon[]}>(),
    'Search': props<{terms: string}>(),
    'Search Error':  props<{ error: Error }>(),
  },
});
