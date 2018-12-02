import { Component, OnInit } from '@angular/core';
import { Artist } from '../artist';
import { ARTISTS } from '../mock-artists';

@Component({
  selector: 'app-artists',
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.css']
})
export class ArtistsComponent implements OnInit {
  selectedArtist: Artist;
  artists = ARTISTS;

  onSelect(artist: Artist): void {
    this.selectedArtist = artist;
  }
  constructor() { }

  ngOnInit() {
  }

}
