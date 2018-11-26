import { Component } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable, Subject } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./0Trackbase.css']
})

export class AppComponent {
  private musicBrainzSearchURL = 'http://musicbrainz.org/ws/2/artist/?query=artist:';
  private myMusicBrainzSearchURL = '';

  title = 'TrackBase';
  searchTerm = 'metroboomin';
  searchData: any = {};

  constructor(private http: Http) {
    console.log("AppComponent constructor");
    this.getSearchData();
    this.executeMusicBrainzSearch();
  }

  // TODO: investigate why both getSearchData and executeMusicBrainzSearch must be called from constructor
  // TODO: investigate what does subscribe do?
  // TODO: rename executeMusicBrainzSearch to just executeSearch
  // TODO: change html so that it does not reference the internal json property names
  // TODO: figure out the right way to do mock data
  getSearchData() {
    console.log("AppComponent getSearchData");
    this.myMusicBrainzSearchURL = this.musicBrainzSearchURL
      + this.searchTerm
      + '&fmt=json';
    return this.http.get(this.myMusicBrainzSearchURL)
      .map((res: Response) => res.json());
  }

  executeMusicBrainzSearch() {
    this.getSearchData().subscribe(data => {
        console.log("AppComponent.executeMusicBrainzSearch: " + data);
        console.log(data);
        this.searchData = data;
    })
  }
}
