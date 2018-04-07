import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChartModule } from 'angular-highcharts';
import {
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatSidenavModule,
  MatSnackBarModule,
  MatToolbarModule
} from '@angular/material';

import { AppComponent } from './app.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { DashboardPageComponent } from './containers/dashboard-page/dashboard-page.component';
import { RegistrationPageComponent } from './containers/registration-page/registration-page.component';
import { ReturnChartComponent } from './components/return-chart/return-chart.component';
import { CurrentCapitalComponent } from './components/current-capital/current-capital.component';
import { GoalComponent } from './components/goal/goal.component';
import { FeasibilityComponent } from './components/feasibility/feasibility.component';
import { FeasibilityCardComponent } from './containers/feasibility-card/feasibility-card.component';
import { GoalCardComponent } from './containers/goal-card/goal-card.component';
import { CurrentCapitalCardComponent } from './containers/current-capital-card/current-capital-card.component';
import { ReturnCardComponent } from './containers/return-card/return-card.component';
import { RegistrationState } from './model/registration.state';
import { NgxsModule } from '@ngxs/store';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { RegistrationFormComponent } from './containers/registration-form/registration-form.component';
import { RegistrationFormState } from './containers/registration-form/registration-form.state';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const MATERIAL_MODULES = [
  MatButtonModule,
  MatListModule,
  MatMenuModule,
  MatSidenavModule,
  MatToolbarModule,
  MatIconModule,
  MatProgressSpinnerModule,
  MatSnackBarModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule
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
    ReturnCardComponent,
    RegistrationFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ChartModule,
    MATERIAL_MODULES,
    NgxsModule.forRoot([RegistrationState, RegistrationFormState]),
    NgxsFormPluginModule.forRoot(),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
