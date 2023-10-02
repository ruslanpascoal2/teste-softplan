import { createFeature, createReducer, on } from '@ngrx/store';
import { Pokemon } from '../pokemons.models';
import { PokemonsActions } from './pokemons.actions';
import { v4 as uuidv4 } from 'uuid';
import { Comment } from '../comments/comments.models';

export interface PokemonsState {
  pokemons: Pokemon[];
  comments: Comment[];
  isLoading: boolean;
  total: number;
}

const initialState: PokemonsState = {
  pokemons: [],
  comments: [
    {
      id: uuidv4(),
      pokemonId: 1,
      text: 'ola'
    }
  ],
  isLoading: false,
  total: 0,
};

export const pokemonsFeature = createFeature({
  name: 'pokemons',
  reducer: createReducer(
    initialState,
    on(PokemonsActions.getPokemonList, (state) => ({
      ...state,
      loading: true,
    })),
    on(PokemonsActions.getPokemonListSuccess, (state, { response }) => ({
      ...state,
      total: response.count,
    })),
    on(PokemonsActions.getPokemonListError, (state) => ({
      ...state,
      loading: false,
    })),
    on(PokemonsActions.getPokemonSuccess, (state, { pokemon }) => ({
      ...state,
      pokemons: [
        ...state.pokemons, pokemon
      ],
      loading: false,
    })),
    on(PokemonsActions.editComment, (state, {comment}) => {
      const _comments = [...state.comments];
      const index = state.comments.findIndex((c) => c.id === comment.id);

      if(index > -1){
        _comments[index] = {...comment};
      }

      return ({
        ...state,
        comments: _comments
      })
    }),
    on(PokemonsActions.addComment, (state, {comment}) => ({
      ...state,
      comments: [...state.comments, comment]
    })),
    on(PokemonsActions.deleteComment, (state, {comment}) => ({
      ...state,
      comments: [...state.comments.filter((c) => c.id !== comment.id)]
    })),
    on(PokemonsActions.toggleFavorite, (state, {pokemon}) => {
      const index = state.pokemons.findIndex((p) => pokemon.id === p.id);
      const pokemonList = [...state.pokemons];
      if(index > -1){
        pokemonList[index] = {...pokemon, favorite: !pokemon.favorite}
      }
      return ({
        ...state,
        pokemons: pokemonList
      })
    }),
  ),
});

export const {
  name,
  reducer,
  selectPokemons,
  selectIsLoading,
  selectTotal,
  selectComments
} = pokemonsFeature;
