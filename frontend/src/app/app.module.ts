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
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { RegistrationPageComponent } from './registration-page/registration-page.component';
import { ReturnChartComponent } from './components/return-chart/return-chart.component';
import { CurrentCapitalComponent } from './components/current-capital/current-capital.component';
import { GoalComponent } from './components/goal/goal.component';
import { FeasibilityComponent } from './components/feasibility/feasibility.component';
import { FeasibilityCardComponent } from './components/feasibility-card/feasibility-card.component';
import { GoalCardComponent } from './components/goal-card/goal-card.component';
import { CurrentCapitalCardComponent } from './components/current-capital-card/current-capital-card.component';
import { ReturnCardComponent } from './components/return-card/return-card.component';

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
  declarations: [
    AppComponent,
    ToolbarComponent,
    DashboardPageComponent,
    RegistrationPageComponent,
    ReturnChartComponent,
    CurrentCapitalComponent,
    GoalComponent,
    FeasibilityComponent,
    FeasibilityCardComponent,
    GoalCardComponent,
    CurrentCapitalCardComponent,
    ReturnCardComponent
  ],
  imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule, ChartModule, MATERIAL_MODULES],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
