import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonFilterComponent } from './pokemon-filter.component';
import { PokemonFacade } from '../state/pokemons.facade';

describe('PokemonFilterComponent', () => {
  let component: PokemonFilterComponent;
  let fixture: ComponentFixture<PokemonFilterComponent>;
  const facade = {
    filter: (terms: string) => {}
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PokemonFilterComponent],
      providers: [
        {provide: PokemonFacade, useValue: facade}
      ]
    });
    fixture = TestBed.createComponent(PokemonFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should submit form', () => {
    const spy = jest.spyOn(facade, 'filter');
    const filter = "Magikarp";
    fixture.componentInstance.ngOnInit();
    fixture.componentInstance.form.setValue({filter})
    fixture.componentInstance.submit();
    expect(spy).toHaveBeenCalledWith(filter);
  })
});
