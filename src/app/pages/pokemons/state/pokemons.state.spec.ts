import { Action, ActionReducer } from '@ngrx/store';
import { PokemonsState, pokemonsFeature } from './pokemons.state';
import { PokemonsActions } from './pokemons.actions';
import { Pokemon } from '../pokemons.models';
import { Comment } from '../comments/comments.models';

describe('Pokemon Reducer', () => {
  let reducer: ActionReducer<PokemonsState, Action>;
  const actions = PokemonsActions;

  const initialState: PokemonsState = {
    pokemonMap: {},
    comments: [],
    favs: [],
    isLoading: false,
    total: 0,
    totalSearch: 0,
    currentPage: 0,
    pokemonsToDisplay: [],
    isLoadingSearch: false,
    openPokemon: undefined,
    searchError: false
  };

  const mockPokemon = () => {
    const randomId = Math.floor(Math.random() * 100);
    return {
      id: randomId,
      name: 'Pokemon ' + randomId,
      moves: [],
      sprites: {
        front_default: '',
        other: {
          dream_world: {
            front_default: '',
          },
        },
      },
      types: [],
    };
  };

  beforeEach(() => {
    reducer = pokemonsFeature.reducer;
  });

  describe('Paging', () => {
    it('should handle the page/pokemon mapping when getPokemon is successful', () => {
      let currentPage = 9;
      const fetchedPokemon = mockPokemon();
      const pageChangeAction = actions.pageChange({ page: currentPage });
      let state = reducer(initialState, pageChangeAction);

      const map = {
        9: [fetchedPokemon],
      };

      const newState: PokemonsState = {
        ...state,
        pokemonMap: map,
      };

      const getPokemonSuccessAction = actions.getPokemonSuccess({
        pokemon: fetchedPokemon,
      });
      state = { ...reducer(state, getPokemonSuccessAction) };

      expect(state).toEqual(newState);
      expect(state).not.toBe(initialState);
    });
    it('should update currentPage and reset totalSearch when page changes', () => {
      const newPage = 3;
      const newState: PokemonsState = {
        ...initialState,
        currentPage: newPage,
        totalSearch: 0,
      };
      const action = actions.pageChange({ page: newPage });
      const state = reducer(initialState, action);
      expect(state).toEqual(newState);
      expect(state).not.toBe(initialState);
    });
    it('should update displayedPokemons and reset isLoading', () => {
      const results: Pokemon[] = [mockPokemon(), mockPokemon(), mockPokemon()];
      const newState: PokemonsState = {
        ...initialState,
        pokemonsToDisplay: results,
        isLoading: false,
      };
      const action = actions.updateDisplayedPokemons({ results });
      const state = reducer(initialState, action);
      expect(state.pokemonsToDisplay.length).toEqual(3);
      expect(state).toEqual(newState);
      expect(state).not.toBe(initialState);
    });
  });

  describe('Search', () => {
    it('should update state when search is successful', () => {
      const result = mockPokemon();
      const newState: PokemonsState = {
        ...initialState,
        pokemonsToDisplay: [result],
        currentPage: 0,
        totalSearch: 1,
        isLoading: false,
      };
      const action = actions.searchSuccess({ result });
      const state = reducer(initialState, action);
      expect(state).toEqual(newState);
      expect(state).not.toBe(initialState);
    });
  });

  describe('Comments', () => {
    it('should add a comment', () => {
      const comment: Comment = {
        id: '1',
        pokemonId: 200,
        text: 'This is a comment',
      };
      const newState: PokemonsState = {
        ...initialState,
        comments: [comment],
      };
      const action = actions.addComment({ comment });
      const state = reducer(initialState, action);
      expect(state).toEqual(newState);
      expect(state).not.toBe(initialState);
    });
    it('should edit a comment', () => {
      let comment: Comment = {
        id: '1',
        pokemonId: 200,
        text: 'This is a comment',
      };

      const addAction = actions.addComment({ comment });
      let state = reducer(initialState, addAction);

      const newText = 'This is an edited comment';
      comment.text = newText;

      const editAction = actions.editComment({ comment });
      state = { ...reducer(state, editAction) };

      const commentIndex = state.comments.findIndex((c) => c.id === comment.id);
      expect(commentIndex).toBeGreaterThan(-1);
      expect(state.comments[commentIndex].text === newText);
      expect(state.comments.length).toBe(1);
    });
    it('should delete a comment', () => {
      let comment: Comment = {
        id: '1',
        pokemonId: 200,
        text: 'This is a comment',
      };

      const addAction = actions.addComment({ comment });
      let state = reducer(initialState, addAction);

      const deleteAction = actions.deleteComment({ comment });
      state = { ...reducer(state, deleteAction) };

      const commentIndex = state.comments.findIndex((c) => c.id === comment.id);
      expect(commentIndex).toBe(-1);
      expect(state.comments.length).toBe(0);
    });
  });

  describe('Favorites', () => {
    it('should toggle a favorite pokemon', () => {
      const pokemon = mockPokemon();

      const toggleFavoriteAction = actions.toggleFavorite({pokemon});
      const state = reducer(initialState, toggleFavoriteAction);

      const favoriteIndex = state.favs.findIndex((f) => f === pokemon.id);
      expect(favoriteIndex).toBeGreaterThan(-1);
      expect(state.favs[favoriteIndex]).toEqual(pokemon.id);
    });
  });
});
