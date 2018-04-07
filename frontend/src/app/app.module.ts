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
  MatProgressBarModule,
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
import { DynamicAssetmixOptimizerHttpService } from './services/dynamic-assetmix-optimizer/dynamic-assetmix-optimizer.http.service';
import { LoadingComponent } from './components/loading/loading.component';
import { HttpClientModule } from '@angular/common/http';
import { BlockchainHttpService } from './services/blockchain/blockchain.http.service';
import { DashboardState } from './model/dashboard.state';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';

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
  MatSelectModule,
  MatProgressBarModule
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
    RegistrationFormComponent,
    LoadingComponent,
    ConfirmationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ChartModule,
    MATERIAL_MODULES,
    NgxsModule.forRoot([RegistrationState, RegistrationFormState, DashboardState]),
    NgxsFormPluginModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [DynamicAssetmixOptimizerHttpService, BlockchainHttpService],
  bootstrap: [AppComponent]
})
export class AppModule {}
