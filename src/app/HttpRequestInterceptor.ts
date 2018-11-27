import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest,HttpResponse,HttpErrorResponse } from '@angular/common/http';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/observable/throw'
import 'rxjs/add/operator/catch';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
    constructor(private router: Router) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
            // request = request.clone({
            //     withCredentials: true,
            //     setHeaders: {
            //         'Content-Type': 'application/json'
            //     } 
            // });

            return next.handle(request).catch(
                (err: HttpErrorResponse) => {
                if (this.router.url !== '/login' && err.status === 401) {
                    this.router.navigate(['/logout']);
                }else if(this.router.url !== '/login' && err.status === 403){
                    this.router.navigate(['/logout']);
                }
                return Observable.throw(err);
                }
            );
    }

}
  

