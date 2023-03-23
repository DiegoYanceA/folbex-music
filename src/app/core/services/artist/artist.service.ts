import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/enviroments/environment';
import { TrackResponse } from '../../dto/response/track/track-reponse.model';

@Injectable({
  providedIn: 'root'
})
export class ArtistService {
  public readonly API:string = "artist";
  constructor(private http: HttpClient) { }

  public search(q:string) {
    return this.http.get<TrackResponse[]>(`${environment.url_api}/search/${this.API}?q=${q}`);
  }
}
