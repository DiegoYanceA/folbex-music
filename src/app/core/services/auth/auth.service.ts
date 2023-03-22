import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/enviroments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public readonly ENDPOINT:string = environment.url_token;
  public readonly APP_ID:number = environment.app_id;
  public readonly SECRET:string = environment.secret;
  constructor(private http: HttpClient) { }

  public getToken(code:string){
    console.log(`${this.ENDPOINT}?app_id=${this.APP_ID}&secret=${this.SECRET}&code=${code}&output=json`)
    return this.http.get(`${this.ENDPOINT}?app_id=${this.APP_ID}&secret=${this.SECRET}&code=${code}&output=json`);
  }
}
