import { Comment } from "./comments/comments.models";

export interface Pokemon {
  id: number;
  name: string;
  sprites: {
    front_default: string;
    other: {
      dream_world:{
        front_default: string;
      }
    };
  }
  type: string;
  favorite: boolean;
}

export interface PokemonListResponse {
  count: number;
  results: {name: string; url: string;}[];
}
