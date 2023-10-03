import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { PokemonsService } from './pokemons.service';
import { Pokemon, PokemonListResponse } from './pokemons.models';
import { of } from 'rxjs';

describe('PokemonsService', () => {
  let service: PokemonsService;
  let httpMock = jest.fn();
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = new PokemonsService(httpMock as any);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should search for a pokemon and return a Pokemon object', (done) => {
    const terms = 'Magikarp';
    const mockResponse: Pokemon = {
      id: 129,
      moves: [],
      types: [
        {
          type: {
            name: 'water',
            url: '',
          },
        },
      ],
      name: 'magikarp',
      sprites: {
        front_default: '',
        other: {
          dream_world: {
            front_default: '',
          },
        },
      },
    };
    const httpMock = {
      get: jest.fn().mockReturnValue(of(mockResponse)),
    };
    const service = new PokemonsService(httpMock as any);
    service.search(terms).subscribe((data) => {
      expect(httpMock.get).toHaveBeenCalledWith(
        'https://pokeapi.co/api/v2/pokemon/Magikarp'
      );
      expect(data).toEqual(mockResponse);
      done();
    });
  });

  it('should list pokemons of a page', (done) => {
    const page = 4;
    const mockPokemonListResponse: PokemonListResponse = {
      count: 1,
      results: [
        {
          name: 'Pokemon',
          url: '',
        },
      ],
    };
    const httpMock = {
      get: jest.fn().mockReturnValue(of(mockPokemonListResponse)),
    };
    const service = new PokemonsService(httpMock as any);
    service.getPokemonList(page).subscribe((data) => {
      expect(httpMock.get).toHaveBeenCalledWith(
        'https://pokeapi.co/api/v2/pokemon?offset=40&limit=10'
      );
      expect(data).toEqual(mockPokemonListResponse);
      done();
    });
  });
  it('should call pokemonDetails api and return a Pokemon object ', (done) => {
    const mockResponse: Pokemon = {
      id: 129,
      moves: [],
      types: [
        {
          type: {
            name: 'water',
            url: '',
          },
        },
      ],
      name: 'magikarp',
      sprites: {
        front_default: '',
        other: {
          dream_world: {
            front_default: '',
          },
        },
      },
    };
    const httpMock = {
      get: jest.fn().mockReturnValue(of(mockResponse)),
    };
    const url = `https://pokeapi.co/api/v2/pokemon/${mockResponse.id}`;

    const service = new PokemonsService(httpMock as any);
    service.getPokemonDetails(url).subscribe((data) => {
      expect(httpMock.get).toHaveBeenCalledWith(url);
      expect(data).toEqual(mockResponse);
      done();
    });
  });
});
