import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { Pokemon } from '../pokemons.models';
import { PokemonsActions } from './pokemons.actions';
import { Comment } from '../comments/comments.models';

export interface PokemonsState {
  pokemonMap: {};
  comments: Comment[];
  favs: number[];
  isLoading: boolean;
  total: number;
  totalSearch: number;
  currentPage: number;
  pokemonsToDisplay: Pokemon[];
}

const initialState: PokemonsState = {
  pokemonMap: {},
  comments: [],
  favs: [],
  isLoading: false,
  total: 0,
  totalSearch: 0,
  currentPage: 0,
  pokemonsToDisplay: [],
};

export const pokemonsFeature = createFeature({
  name: 'pokemons',
  reducer: createReducer(
    initialState,
    on(PokemonsActions.pageChange, (state, { page }) => ({
      ...state,
      currentPage: page,
      totalSearch: 0
    })),
    on(PokemonsActions.updateDisplayedPokemons, (state, { results }) => ({
      ...state,
      pokemonsToDisplay: results,
      isLoading: false,
    })),
    on(PokemonsActions.searchSuccess, (state, { result }) => ({
      ...state,
      pokemonsToDisplay: [result],
      currentPage: 0,
      totalSearch: 1,
      isLoading: false,
    })),
    on(PokemonsActions.getPokemonList, (state) => ({
      ...state,
      isLoading: true,
    })),
    on(PokemonsActions.getPokemonListSuccess, (state, { response }) => ({
      ...state,
      total: response.count,
    })),
    on(PokemonsActions.getPokemonListError, (state) => ({
      ...state,
      isLoading: false,
    })),
    on(PokemonsActions.getPokemonSuccess, (state, { pokemon }) => {
      const map: any = { ...state.pokemonMap };
      const page = state.currentPage;
      if (page in map) {
        map[page] = [...map[page], pokemon];
      } else {
        map[page] = [pokemon];
      }
      return {
        ...state,
        pokemonMap: map,
      };
    }),
    on(PokemonsActions.editComment, (state, { comment }) => {
      const _comments = [...state.comments];
      const index = state.comments.findIndex((c) => c.id === comment.id);

      if (index > -1) {
        _comments[index] = { ...comment };
      }

      return {
        ...state,
        comments: _comments,
      };
    }),
    on(PokemonsActions.addComment, (state, { comment }) => ({
      ...state,
      comments: [...state.comments, comment],
    })),
    on(PokemonsActions.deleteComment, (state, { comment }) => ({
      ...state,
      comments: [...state.comments.filter((c) => c.id !== comment.id)],
    })),
    on(PokemonsActions.toggleFavorite, (state, { pokemon }) => {
      const id = pokemon.id;
      const index = state.favs.findIndex((f) => f === id);
      let _favs = [...state.favs];
      if (index > -1) {
        _favs = _favs.filter((x) => x !== id);
      } else {
        _favs.push(id);
      }
      return {
        ...state,
        favs: _favs,
      };
    })
  ),
  extraSelectors: ({ selectTotal, selectTotalSearch }) => ({
    selectCurrentTotal: createSelector(
      selectTotal,
      selectTotalSearch,
      (total, search) => search || total)
  }),
});

export const {
  name,
  reducer,
  selectPokemonMap,
  selectIsLoading,
  selectTotal,
  selectComments,
  selectFavs,
  selectCurrentTotal
} = pokemonsFeature;
