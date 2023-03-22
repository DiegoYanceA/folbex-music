import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-oauth',
  templateUrl: './oauth.component.html',
  styleUrls: ['./oauth.component.sass']
})
export class OauthComponent {

  public code: string = "";
  constructor(private route: ActivatedRoute, private authService:AuthService){}

  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
        console.log(params);
        if(params["code"] != null) {
          this.code = params["code"];
          this.getToken(this.code)
        }
        
      }
    );
  }

  private getToken(code:string):void {
    this.authService.getToken(code).subscribe({
      next: (v) => console.log(v),
      error: (e) => console.error(e),
      complete: () => {
        
      }
    })
  }
}
