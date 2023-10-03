import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalContainerComponent } from './modal-container.component';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BehaviorSubject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { PokemonFacade } from '../state/pokemons.facade';

describe('ModalContainerComponent', () => {
  let component: ModalContainerComponent;
  let fixture: ComponentFixture<ModalContainerComponent>;
  let activatedRouteStub = { params: new BehaviorSubject<any>({}) };
  let facadeStub = () => {}
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalContainerComponent],
      providers: [
        {
          provide: BsModalService,
          useValue: () => {
            show: () => {};
          },
        },
        { provide: ActivatedRoute, useValue: activatedRouteStub },
        { provide: PokemonFacade, useValue: facadeStub },
      ],
    });
    fixture = TestBed.createComponent(ModalContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
