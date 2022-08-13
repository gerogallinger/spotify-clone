import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { InjectTokenInterceptor } from '@core/interceptors/inject-token.interceptor';
import { CookieService } from 'ngx-cookie-service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent], // declaraciones, componentes, directivas
  imports: [BrowserModule, AppRoutingModule, HttpClientModule], //Solo se importan otros modules
  providers: [
    CookieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InjectTokenInterceptor,
      multi: true,
    },
    //TODO: si usas varios interceptores a la vez tenes que agregar la propiedad multi: true
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
