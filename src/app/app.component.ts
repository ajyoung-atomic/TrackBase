import { Component } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private metroBoominURL = 'http://musicbrainz.org/ws/2/artist/59db3d82-86ea-451f-881f-dffc8ec387c9?inc=aliases&fmt=json';

  title = 'TrackBase';
  overviewData: any = {};
  musicbrainzID = '59db3d82-86ea-451f-881f-dffc8ec387c9';

  constructor(private http: Http) {
    console.log("AppComponent constructor");
    this.getOverviewData();
    this.getArtistDetails();
  }

  getOverviewData() {
    console.log("AppComponent getOverviewData");
    this.metroBoominURL = 'http://musicbrainz.org/ws/2/artist/'
      + this.musicbrainzID
      + '?inc=aliases&fmt=json';
    return this.http.get(this.metroBoominURL)
      .map((res: Response) => res.json());
  }

  getArtistDetails() {
    this.getOverviewData().subscribe(data => {
        console.log("AppComponent.getArtistDetails: " + data);
        console.log(data);
        this.overviewData = data;
    })
  }
}
