import { Component, OnInit } from '@angular/core';
import { Artist } from '../artist';
import { ArtistService } from '../artist.service';

@Component({
  selector: 'app-artists',
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.css']
})
export class ArtistsComponent implements OnInit {
  selectedArtist: Artist;
  artists: Artist[];

  getArtists(): void {
    this.artistService.getArtists()
      .subscribe(artists => this.artists = artists);
  }

  onSelect(artist: Artist): void {
    console.log("onSelect");
    this.selectedArtist = artist;
  }

  constructor(private artistService: ArtistService) { }

  ngOnInit() {
    this.getArtists();
  }

}
