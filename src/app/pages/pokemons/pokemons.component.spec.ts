import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonsComponent } from './pokemons.component';
import { PokemonFacade } from './state/pokemons.facade';
import { BehaviorSubject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

describe('PokemonsComponent', () => {
  let component: PokemonsComponent;
  let fixture: ComponentFixture<PokemonsComponent>;
  let pokemonFacadeMock = {
    pageChange: jest.fn(),
  };
  const activatedRouteStub = { queryParams: new BehaviorSubject<any>({}) };
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PokemonsComponent],
      providers: [
        { provide: PokemonFacade, useValue: pokemonFacadeMock },
        { provide: ActivatedRoute, useValue: activatedRouteStub },
      ],
    });
    fixture = TestBed.createComponent(PokemonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Component Setup', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('Pokemon List', () => {
    it('should get first 10 pokemons when component inits', () => {
      const spy = jest.spyOn(fixture.componentInstance, 'onPageChange');
      fixture.componentInstance.ngOnInit();
      const initialPage = 1;
      expect(spy).toHaveBeenCalledWith(initialPage);
    });
  });
});
