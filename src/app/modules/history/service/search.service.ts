import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private readonly url = environment.api;
  constructor(private http: HttpClient) {}

  ///metodo que devuelve las canciones al history page
  searchTracks$(term: string): Observable<any> {
    return this.http
      .get(`${this.url}/tracks?src=${term}`)
      .pipe(map((dataRaw: any) => dataRaw.data));
  }
}
