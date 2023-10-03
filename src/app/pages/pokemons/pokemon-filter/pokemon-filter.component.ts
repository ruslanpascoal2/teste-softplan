import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PokemonFacade } from '../state/pokemons.facade';
import { Observable, Subject, of, takeUntil } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pokemon-filter',
  templateUrl: './pokemon-filter.component.html',
  styleUrls: ['./pokemon-filter.component.scss'],
})
export class PokemonFilterComponent {
  form!: FormGroup;

  error$: Observable<boolean> = of(false);
  loading$: Observable<boolean> = of(false);
  destroy$ = new Subject();

  constructor(
    private readonly fb: FormBuilder,
    private readonly pokemonFacade: PokemonFacade,
    private readonly router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      filter: [],
    });
    this.setRouteListener();
    this.error$ = this.pokemonFacade.searchError$;
    this.loading$ = this.pokemonFacade.searchLoading$;
  }

  ngOnDestroy(){
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  setRouteListener() {
    this.route.queryParams
    .pipe(
      takeUntil(this.destroy$)
    )
    .subscribe((queryParam) => {
      let filter = queryParam['filter'];

      if(filter){
        this.form.setValue({filter});
        this.pokemonFacade.filter(filter.toLowerCase().trim());
      }
    });
  }

  submit() {
    const value: string = this.form.value['filter'];
    this.pokemonFacade.filter(value.toLowerCase().trim());
    this.router.navigate([], {queryParams: {filter: value}})
  }
}
