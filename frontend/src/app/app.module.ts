import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChartModule } from 'angular-highcharts';
import {
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatListModule,
  MatMenuModule,
  MatProgressSpinnerModule,
  MatSidenavModule,
  MatSnackBarModule,
  MatToolbarModule
} from '@angular/material';

import { AppComponent } from './app.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { RegistrationPageComponent } from './registration-page/registration-page.component';
import { ReturnChartComponent } from './return-chart/return-chart.component';

const MATERIAL_MODULES = [
  MatButtonModule,
  MatListModule,
  MatMenuModule,
  MatSidenavModule,
  MatToolbarModule,
  MatIconModule,
  MatProgressSpinnerModule,
  MatSnackBarModule,
  MatCardModule
];

@NgModule({
  declarations: [AppComponent, ToolbarComponent, DashboardPageComponent, RegistrationPageComponent, ReturnChartComponent],
  imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule, ChartModule, MATERIAL_MODULES],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
