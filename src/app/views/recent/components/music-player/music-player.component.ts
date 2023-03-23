import { Component, Input, OnChanges } from '@angular/core';
import { faStepBackward, faStepForward, faPlay, faPause, faVolumeUp, faVolumeMute, faVolumeOff,faVolumeDown } from '@fortawesome/free-solid-svg-icons';
import { Track } from 'src/app/core/models/track/track.model';

@Component({
  selector: 'app-music-player',
  templateUrl: './music-player.component.html',
  styleUrls: ['./music-player.component.sass']
})
export class MusicPlayerComponent implements OnChanges{
  
  faPlay = faPlay;
  faPause = faPause;
  faStepBackward = faStepBackward;
  faStepForward = faStepForward;
  faVolumeUp = faVolumeUp;
  faVolumeOff = faVolumeOff;
  faVolumeDown = faVolumeDown;
  faVolumeMute = faVolumeMute;

  @Input() tracksCurrentInput: Track[] = [];
  @Input() current: number = 0;

  public audio = new Audio();
  public volumen:number = 1;
  public firstPlay:boolean = false;

  ngOnChanges(): void {
    if(this.tracksCurrentInput[this.current] != null){
      if(this.firstPlay){
        this.play();        
        return;
      }
      this.firstPlay = true;
    }

  }

  public play(): void{
    if(!this.audio.paused){
      this.audio.pause();
    }

    this.audio = new Audio();
    if(this.tracksCurrentInput[this.current]?.preview){
      this.audio.src = this.tracksCurrentInput[this.current].preview
      this.audio.load();
      this.audio.volume = this.volumen;
      this.audio.play();

      this.audio.addEventListener('ended', () => {
        this.audio.pause();
      });
    }
  }

  public next():void{
    if(this.current < this.tracksCurrentInput.length - 1) {
      this.current++;
      this.play();
    }
  }

  public back():void{
    if(0 < this.current) {
      this.current--;
      this.play();
    }
  }

  public stop(){
    if(!this.audio.paused){
      this.audio.pause();
    }
  }

  public changeVolumen(){
    this.audio.volume = this.volumen;
  }

  public showVolumeIcon(){
    if(0.7 < this.volumen) {
      return this.faVolumeUp;
    } else if (this.volumen < 0.3){
      return this.faVolumeOff;
    }
    return this.faVolumeDown;
  }

  public toggleMute(){
    this.audio.muted = !this.audio.muted;
  }

  public isThereMusic():boolean {
    return this.tracksCurrentInput[this.current] != null;
  }
}
