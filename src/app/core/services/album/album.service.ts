import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/enviroments/environment';
import { AlbumResponse } from '../../dto/response/album/album-response.model';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {
  public readonly API:string = "album";
  constructor(private http: HttpClient) { }

  public search(q:string) {
    return this.http.get<AlbumResponse[]>(`${environment.url_api}/search/${this.API}?q=${q}`);
  }

  public get(id: number) {
    return this.http.get<AlbumResponse[]>(`${environment.url_api}/${this.API}/${id}`);
  }
}
