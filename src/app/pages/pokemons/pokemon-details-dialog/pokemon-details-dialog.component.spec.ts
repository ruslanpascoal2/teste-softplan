import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonDetailsDialogComponent } from './pokemon-details-dialog.component';
import { PokemonFacade } from '../state/pokemons.facade';
import { of } from 'rxjs';

describe('PokemonDetailsDialogComponent', () => {
  let component: PokemonDetailsDialogComponent;
  let fixture: ComponentFixture<PokemonDetailsDialogComponent>;
  const facadeStub = {
    openPokemon$: of(),
    closePokemonDetails: () => {},
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PokemonDetailsDialogComponent],
      providers: [{ provide: PokemonFacade, useValue: facadeStub }],
    });
    fixture = TestBed.createComponent(PokemonDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
