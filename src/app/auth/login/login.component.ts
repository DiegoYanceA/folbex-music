import { Component, OnInit } from '@angular/core';
import { environment } from 'src/enviroments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  public href:string = "";
  public readonly ENDPOINT:string = environment.url_auth;

  ngOnInit(): void {
    this.href = `${this.ENDPOINT}?app_id=${environment.app_id}&redirect_uri=${environment.redirect_uri}&perms=${environment.perms}`
  }

  public login(): void {
    location.href= this.href;
  }
  
}
