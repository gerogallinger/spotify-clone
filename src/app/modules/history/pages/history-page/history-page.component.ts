import { Component, OnInit } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { SearchService } from '@modules/history/service/search.service';

import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.css'],
})
export class HistoryPageComponent implements OnInit {
  listResults$: Observable<any> = of([]);
  //TODO: todos los servicios que inyectas los tenes que poner como private en el constructor

  constructor(private searchService: SearchService) {}

  ngOnInit(): void {}

  receiveData(event: string): void {
    //TODO: agarras el termino y sabes que solo se ejecuta cunado tiene 4 caracters

    console.log('🎁 Estoy en el padre: ', event);
    //  Si usas un pipe no es necesario suscribirte, asi no recibis peticiones constantemente va cambiando la variable

    this.listResults$ = this.searchService.searchTracks$(event);
  }
}
