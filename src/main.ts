import {bootstrapApplication, provideProtractorTestingSupport} from '@angular/platform-browser';
import {AppComponent} from './app/app.component';
import {importProvidersFrom} from "@angular/core";
import {HttpClientModule} from "@angular/common/http";
import {provideRouter} from "@angular/router";
import {routes} from "./app/routes/routes";


bootstrapApplication(AppComponent,
  {
    providers: [
      provideProtractorTestingSupport(),
      importProvidersFrom(HttpClientModule),
      provideRouter(routes)
    ]
  })
  .catch(err => console.error(err));
