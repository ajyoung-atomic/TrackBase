import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Artist } from './artist';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const artists = [
      {id: 1, name: 'Metroboomin'},
      {id: 2, name: 'Metro'},
      {id: 3, name: 'Boomin'}
    ];
    return {artists};
  }

  genId(artists: Artist[]): number {
    return artists.length > 0 ? 
      Math.max(...artists.map(artist => artist.id)) + 1 : 11;
  }

  constructor() { }
}
