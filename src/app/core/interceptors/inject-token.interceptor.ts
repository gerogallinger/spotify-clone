import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class InjectTokenInterceptor implements HttpInterceptor {
  constructor(private cookieService: CookieService) {}

  /**
   * TODO:cuando usas un interceptor tenes que decirle a tu servicio/aplicacion que lo use
   */

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    try {
      const token = this.cookieService.get('token');
      let newRequest = request;
      newRequest = request.clone({
        setHeaders: {
          authorization: `Bearer ${token}`,
          CUSTOM_HEADER: 'HOLA',
        },
      });

      return next.handle(newRequest);
    } catch (e) {
      console.log('🔴🔴🔴 Ojito error', e);
      return next.handle(request);
    }
  }
}
