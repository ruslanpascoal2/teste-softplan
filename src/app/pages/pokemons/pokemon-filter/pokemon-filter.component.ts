import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PokemonFacade } from '../state/pokemons.facade';

@Component({
  selector: 'app-pokemon-filter',
  templateUrl: './pokemon-filter.component.html',
  styleUrls: ['./pokemon-filter.component.scss']
})
export class PokemonFilterComponent {
  form!: FormGroup;
  constructor(
    private readonly fb: FormBuilder,
    private readonly pokemonFacade: PokemonFacade
  ){}

  ngOnInit(){
    this.form = this.fb.group({
      filter: []
    })
  }

  submit(){
    this.pokemonFacade.filter(this.form.value['filter']);
  }
}
