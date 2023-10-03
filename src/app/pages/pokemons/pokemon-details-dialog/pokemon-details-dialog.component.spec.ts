import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonDetailsDialogComponent } from './pokemon-details-dialog.component';

describe('PokemonDetailsDialogComponent', () => {
  let component: PokemonDetailsDialogComponent;
  let fixture: ComponentFixture<PokemonDetailsDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PokemonDetailsDialogComponent]
    });
    fixture = TestBed.createComponent(PokemonDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
