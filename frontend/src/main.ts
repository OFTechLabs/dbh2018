import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import 'hammerjs';
import * as Highcharts from 'highcharts';

Highcharts.setOptions({
  colors: ['#0084cc', '#87bc41', '#f58025', '#ED561B', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4']
});

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch(err => console.log(err));
