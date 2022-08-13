import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { catchError, map, mergeMap, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TrackService {
  private URL = environment.api;
  constructor(private http: HttpClient) {}

  /**
   *
   * @returns Retorna todas las canciones el signo $ es para decir que retorno un observable
   Aca mandas la suscripcion y en el tracksPageComponent te suscribis para que este escuchando eso

  */

  private skipById(
    listTracks: TrackModel[],
    id: number
  ): Promise<TrackModel[]> {
    return new Promise((resolve, reject) => {
      const listTmp = listTracks.filter((a) => a._id !== id);
      resolve(listTmp);
    });
  }

  getAllTracks$(): Observable<any> {
    return this.http.get(`${this.URL}/tracks`).pipe(
      map(({ data }: any) => {
        return data;
      })
    );
  }

  getAllRandom$(): Observable<any> {
    return this.http.get(`${this.URL}/tracks`).pipe(
      mergeMap(({ data }: any) => this.skipById(data, 2)),
      // map((dataRevertida) => { //TODO aplicar un filter comun de array
      //   return dataRevertida.filter((track: TrackModel) => track._id !== 1)
      // })
      catchError((err) => {
        //capturo el error en una estructura de datos
        const { status, statusText } = err;
        return of([]);
      })
    );
  }
}
