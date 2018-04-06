import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
import { ToolbarComponent } from './toolbar/toolbar.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';

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
  declarations: [AppComponent, ToolbarComponent, DashboardPageComponent],
  imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule, MATERIAL_MODULES],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
