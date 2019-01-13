import { Component, OnInit } from '@angular/core';
import { Artist } from '../artist';
import { ArtistService } from '../artist.service';

@Component({
  selector: 'app-artists',
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.css']
})
export class ArtistsComponent implements OnInit {
  artists: Artist[];

  constructor(private artistService: ArtistService) { }

  ngOnInit() {
    this.getArtists();
  }

  getArtists(): void {
    this.artistService.getArtists()
      .subscribe(artists => this.artists = artists);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.artistService.addArtist({ name } as Artist)
      .subscribe(artist => {
        this.artists.push(artist);
      });
  }

  delete(artist: Artist): void {
    this.artists = this.artists.filter(a => a !== artist);
    this.artistService.deleteArtist(artist).subscribe();
  }
}
