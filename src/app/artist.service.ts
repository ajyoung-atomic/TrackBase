import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Artist } from './artist';
import { ARTISTS } from './mock-artists';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class ArtistService {

  getArtists(): Observable<Artist[]> {
    this.messageService.add('ArtistService: fetched artists');
    return of(ARTISTS);
  }

  getArtist(id: number): Observable<Artist> {
    this.messageService.add(`ArtistService: fetched artist id=${id}`);
    return of(ARTISTS.find(artist => artist.id === id));
  }

  constructor(private messageService: MessageService) { }
}
