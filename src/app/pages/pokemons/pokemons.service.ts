import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pokemon, PokemonListResponse } from './pokemons.models';
import { Observable } from 'rxjs';

export const API = "https://pokeapi.co/api/v2";

@Injectable({
  providedIn: 'root',
})
export class PokemonsService {
  constructor(private readonly http: HttpClient) {}

  getPokemonList(page: number): Observable<PokemonListResponse> {
    const take = 10;
    const offset = page * take;
    return this.http.get<PokemonListResponse>(`${API}/pokemon?offset=${offset}&limit=${take}`);
  }

  getPokemonDetails(url: string): Observable<Pokemon> {
    return this.http.get<Pokemon>(url);
  }

  search(terms: string): Observable<Pokemon> {
    return this.http.get<Pokemon>(`${API}/pokemon/${terms.trim()}`);
  }
}
