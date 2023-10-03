import { Component } from '@angular/core';
import { PokemonFacade } from './state/pokemons.facade';
import { BehaviorSubject, Observable, Subject, of, takeUntil } from 'rxjs';
import { Pokemon } from './pokemons.models';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemons.component.html',
  styleUrls: ['./pokemons.component.scss'],
})
export class PokemonsComponent {
  totalPokemons$ = of(0);
  currentPage = 1;
  pageSize = 10;
  pokemons$: Observable<Pokemon[]> = of([]);
  loading$: Observable<boolean> = of(false);
  pokemonsToDisplay$ = new BehaviorSubject<Pokemon[]>([]);
  destroy$ = new Subject();

  constructor(
    private readonly pokemonFacade: PokemonFacade,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.setPageListener();
    this.loading$ = this.pokemonFacade.loading$;
    this.totalPokemons$ = this.pokemonFacade.totalPokemons$;
    this.pokemons$ = this.pokemonFacade.pokemonsToDisplay$;
  }

  ngOnDestroy(){
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  setPageListener() {
    this.route.queryParams
    .pipe(
      takeUntil(this.destroy$)
    )
    .subscribe((queryParam) => {
      let filter = queryParam['filter'];
      let page = queryParam['page'];

      if(!filter && !page){
        this.onPageChange(Number(1));
        return;
      }

      if(filter){
        this.currentPage = 1;
        return;
      };

      if(page){
        if(isNaN(page) || page < 1 || page > 130){
          page = 1;
        }
        this.onPageChange(Number(page));
      }
    });
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.pokemonFacade.pageChange(page - 1);
    this.router.navigate([], { queryParams: { page } });
  }
}
