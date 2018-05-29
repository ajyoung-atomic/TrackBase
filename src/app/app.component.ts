import { Component } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
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
