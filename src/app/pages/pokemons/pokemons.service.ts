import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pokemon, PokemonListResponse } from './pokemons.models';
import { Observable } from 'rxjs';
import { API } from 'src/enviroments';

@Injectable({
  providedIn: 'root',
})
export class PokemonsService {
  constructor(private readonly http: HttpClient) {}

  getPokemonList(page: number): Observable<PokemonListResponse> {
    const take = 10;
    const offset = page * take;
    console.log(take, page, offset);

    return this.http.get<PokemonListResponse>(`${API}/pokemon?offset=${offset}&limit=${take}`);
  }

  getPokemonDetails(url: string): Observable<Pokemon> {
    return this.http.get<Pokemon>(url);
  }
}
