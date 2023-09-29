import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonFilterComponent } from './pokemon-filter.component';

describe('PokemonFilterComponent', () => {
  let component: PokemonFilterComponent;
  let fixture: ComponentFixture<PokemonFilterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PokemonFilterComponent]
    });
    fixture = TestBed.createComponent(PokemonFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
