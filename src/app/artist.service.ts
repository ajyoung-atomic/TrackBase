import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Artist } from './artist';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})

export class ArtistService {
  private artistsUrl = 'api/artists';

  getArtists(): Observable<Artist[]> {
    this.messageService.add('ArtistService: fetched artists');
    return this.http.get<Artist[]>(this.artistsUrl)
      .pipe(
        tap(_ => this.log('fetched artists')),
        catchError(this.handleError('getArtistis', []))
    );
  }

  getArtist(id: number): Observable<Artist> {
    const url = `${this.artistsUrl}/${id}`;
    return this.http.get<Artist>(url).pipe(
      tap(_ => this.log(`fetched artist id=${id}`)),
      catchError(this.handleError<Artist>(`getArtist id=${id}`))
    );
  }

  updateArtist(artist: Artist): Observable<any> {
    return this.http.put(this.artistsUrl, artist, httpOptions).pipe(
      tap(_ => this.log(`updated artist id=${artist.id}`)),
      catchError(this.handleError<any>('updateArtist'))
    );
  }

  addArtist(artist: Artist): Observable<Artist> {
    return this.http.post<Artist>(this.artistsUrl, artist, httpOptions).pipe(
      tap((artist: Artist) => this.log(`added artist w/ id=${artist.id}`)),
      catchError(this.handleError<Artist>('addArtist'))
    );
  }

  deleteArtist(artist: Artist | number): Observable<Artist> {
    const id = typeof artist === 'number' ? artist : artist.id;
    const url = `${this.artistsUrl}/${id}`;

    return this.http.delete<Artist>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted artist id=${id}`)),
      catchError(this.handleError<Artist>('deleteArtist'))
    );
  }

  searchArtists(term: string): Observable<Artist[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Artist[]>(`${this.artistsUrl}/?name=${term}`)
      .pipe(
        tap(_ => this.log(`found artists matching "${term}"`)),
        catchError(this.handleError<Artist[]>('searchArtists', []))
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
