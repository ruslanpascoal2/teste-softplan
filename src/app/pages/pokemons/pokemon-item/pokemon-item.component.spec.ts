import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonItemComponent } from './pokemon-item.component';
import { BsModalService } from 'ngx-bootstrap/modal';
import { PokemonFacade } from '../state/pokemons.facade';
import { Pokemon } from '../pokemons.models';
import { By } from '@angular/platform-browser';

describe('PokemonItemComponent', () => {
  let component: PokemonItemComponent;
  let fixture: ComponentFixture<PokemonItemComponent>;
  const modalService = {
    show: () => {},
  };
  const facade = {
    toggleFavorite: (pokemon: Pokemon) => {},
    isPokemonFavorite: (id: number) => {},
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
    TestBed.configureTestingModule({
      declarations: [PokemonItemComponent],
      providers: [
        { provide: BsModalService, useValue: modalService },
        { provide: PokemonFacade, useValue: facade },
      ],
    });
    fixture = TestBed.createComponent(PokemonItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call toggle favorite', () => {
    const spy = jest.spyOn(facade, 'toggleFavorite');
    const pokemon = mockPokemon();
    component.toggleFavorite(pokemon);
    expect(spy).toHaveBeenCalledWith(pokemon);
  });
  it('should display a spinner while pokemon image is loading', () => {
    fixture.componentInstance.ngOnInit();
    const spinner = fixture.debugElement.query(By.css('#mock'));
    fixture.detectChanges();
    expect(spinner).toBeTruthy();
  });
});
