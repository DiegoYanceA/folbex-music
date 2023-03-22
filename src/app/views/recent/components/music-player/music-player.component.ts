import { Component, Input, OnInit } from '@angular/core';
import { faStepBackward, faStepForward, faPlay } from '@fortawesome/free-solid-svg-icons';
import { Track } from 'src/app/core/models/track/track.model';

@Component({
  selector: 'app-music-player',
  templateUrl: './music-player.component.html',
  styleUrls: ['./music-player.component.sass']
})
export class MusicPlayerComponent implements OnInit{
  
  faPlay = faPlay;
  faStepBackward = faStepBackward;
  faStepForward = faStepForward;

  @Input() trackCurrent: Track = new Track();

  ngOnInit(): void {
    
  }
}
