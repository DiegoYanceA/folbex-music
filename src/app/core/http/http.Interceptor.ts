import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, throwError, TimeoutError } from 'rxjs';
import { map, catchError, finalize, timeout } from 'rxjs/operators';

const APP_XHR_TIMEOUT = 300000;

@Injectable()
export class AppInterceptor implements HttpInterceptor {

  constructor() {}

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next
    .handle(this.performRequest(req))
    .pipe(
      timeout(APP_XHR_TIMEOUT)
    );
    
  }


  private performRequest(req: HttpRequest<any>): HttpRequest<any> {
    let headers: HttpHeaders = req.headers;
    
    headers.set('Access-Control-Allow-Origin', '*');
    headers.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT');
    headers.set('Content-Type', 'application/json');

    return req.clone({ url: `${req.url}`, headers });
  }

}