import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonDetailsDialogComponent } from './pokemon-details-dialog.component';
import { PokemonFacade } from '../state/pokemons.facade';
import { of } from 'rxjs';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

describe('PokemonDetailsDialogComponent', () => {
  let component: PokemonDetailsDialogComponent;
  let fixture: ComponentFixture<PokemonDetailsDialogComponent>;
  let store: MockStore;
  const facadeStub = {
    openPokemon$: of(),
    closePokemonDetails: () => {},
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PokemonDetailsDialogComponent],
      providers: [
        { provide: PokemonFacade, useValue: facadeStub },
        provideMockStore({})
      ],
    });
    fixture = TestBed.createComponent(PokemonDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
