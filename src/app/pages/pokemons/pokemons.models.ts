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
  moves: {move: Entity}[];
  types: {type: Entity}[];
}

export interface Entity {
  name: string;
  url: string;
}

export interface PokemonListResponse {
  count: number;
  results: {name: string; url: string;}[];
}
