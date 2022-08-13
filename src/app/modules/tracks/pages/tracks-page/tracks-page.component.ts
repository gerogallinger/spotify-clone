//import { TrackService } from '@modules/tracks/services/track.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { TrackService } from '@modules/tracks/services/track.service';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tracks-page',
  templateUrl: './tracks-page.component.html',
  styleUrls: ['./tracks-page.component.css'],
})
export class TracksPageComponent implements OnInit, OnDestroy {
  listObservers$: Array<Subscription> = [];

  trackRandom: Array<TrackModel> = [];
  tracksTrending: Array<TrackModel> = [];
  trackSelected: Array<TrackModel> = [];

  constructor(private trackService: TrackService) {}

  ngOnInit(): void {
    this.loadDataAll();
    this.loadDataRandom();
  }

  async loadDataAll(): Promise<any> {
    this.tracksTrending = await this.trackService.getAllTracks$().toPromise();
  }

  loadDataRandom(): void {
    this.trackService.getAllRandom$().subscribe(
      (responsive: TrackModel[]) => {
        this.trackRandom = responsive;
      },
      (err) => {
        console.log('Error de conexion');
      }
    );
  }

  ngOnDestroy(): void {}
}
