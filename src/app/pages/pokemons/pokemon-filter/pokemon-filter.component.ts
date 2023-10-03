import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PokemonFacade } from '../state/pokemons.facade';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-pokemon-filter',
  templateUrl: './pokemon-filter.component.html',
  styleUrls: ['./pokemon-filter.component.scss'],
})
export class PokemonFilterComponent {
  form!: FormGroup;

  error$: Observable<boolean> = of(false);
  loading$: Observable<boolean> = of(false);

  constructor(
    private readonly fb: FormBuilder,
    private readonly pokemonFacade: PokemonFacade
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      filter: [],
    });
    this.error$ = this.pokemonFacade.searchError$;
    this.loading$ = this.pokemonFacade.searchLoading$;
  }

  submit() {
    const value: string = this.form.value['filter'];
    this.pokemonFacade.filter(value.toLowerCase().trim());
  }
}
