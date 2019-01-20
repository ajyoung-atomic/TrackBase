import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Artist } from './artist';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})

export class ArtistService {
  private musicBrainzBaseUrl = 'http://musicbrainz.org/ws/2/';
  private musicBrainzArtistQueryUri = 'artist/?query=artist:';
  private musicBrainzArtistFetchUri = 'artist';
  private musicBrainzDetailParams = '&fmt=json&inc=aliases'

  getArtists(): Observable<Artist[]> {
    this.messageService.add('ArtistService: fetched artists');
    return this.searchArtists('metro');
  }

  getArtist(id: string): Observable<Artist> {
    const url = `${this.musicBrainzBaseUrl + this.musicBrainzArtistFetchUri}/${id}?${this.musicBrainzDetailParams}`;
    return this.http.get<Artist>(url).pipe(
      tap(_ => this.log(`fetched artist id=${id}`)),
      catchError(this.handleError<Artist>(`getArtist id=${id}`))
    );
  }

  updateArtist(artist: Artist): Observable<any> {
    // TODO: decide whether allow updateArtist, for now fetch and return requested artist
    // return this.http.put(this.artistsUrl, artist, httpOptions).pipe(
    //   tap(_ => this.log(`updated artist id=${artist.id}`)),
    //   catchError(this.handleError<any>('updateArtist'))
    // );
    return this.getArtist(artist.id);
  }

  addArtist(artist: Artist): Observable<Artist> {
    // TODO: decide whether to allow addArtist, for now fetch and return requested artist
    // return this.http.post<Artist>(this.artistsUrl, artist, httpOptions).pipe(
    //   tap((artist: Artist) => this.log(`added artist w/ id=${artist.id}`)),
    //   catchError(this.handleError<Artist>('addArtist'))
    // );
    return this.getArtist(artist.id);
  }

  deleteArtist(artist: Artist | string): Observable<Artist> {
    const id = typeof artist === 'string' ? artist : artist.id;
    // TODO: decide whether to allow deleteArtist, for now fetch and return requested artist
    // const url = `${this.artistsUrl}/${id}`;
    //
    // return this.http.delete<Artist>(url, httpOptions).pipe(
    //   tap(_ => this.log(`deleted artist id=${id}`)),
    //   catchError(this.handleError<Artist>('deleteArtist'))
    // );
    return this.getArtist(id);
  }

  searchArtists(term: string): Observable<Artist[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Artist[]>(`${this.musicBrainzBaseUrl}${this.musicBrainzArtistQueryUri}${term}${this.musicBrainzDetailParams}`)
      .pipe(
        tap(_ => this.log(`found artists matching "${term}"`)),
        map(response => response['artists']),
        catchError(this.handleError<Artist[]>('searchArtists', [])),
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  private log(message: String) {
    this.messageService.add('ArtistService: ' + message);
  }
}
