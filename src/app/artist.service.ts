import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Artist } from './artist';
import { ARTISTS } from './mock-artists';

@Injectable({
  providedIn: 'root'
})
export class ArtistService {

  getArtists(): Observable<Artist[]> {
    return of(ARTISTS);
  }

  constructor() { }
}
