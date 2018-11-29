import { Component } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable, Subject } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css', './0Trackbase.css']
})

export class AppComponent {
  private musicBrainzSearchURL = 'http://musicbrainz.org/ws/2/artist/?query=artist:';
  private myMusicBrainzSearchURL = '';

  title = 'TrackBase';
  searchTerm = 'metroboomin';
  searchData: any = {};

  constructor(private http: Http) {
    console.log("AppComponent constructor");
    //this.getSearchData();
    //this.initiateSearch();
  }

  // TODO: investigate what does subscribe do?
  // TODO: change html so that it does not reference the internal json property names
  // TODO: figure out the right way to do mock data
  getSearchData() {
    this.myMusicBrainzSearchURL = this.musicBrainzSearchURL
      + this.searchTerm
      + '&fmt=json';
    return this.http.get(this.myMusicBrainzSearchURL)
      .map((res: Response) => res.json());
  }

  initiateSearch() {
    this.getSearchData().subscribe(data => {
        this.searchData = data;
    })
  }
}
