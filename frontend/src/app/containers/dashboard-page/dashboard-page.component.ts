import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { LoadDashboard } from '../../model/dashboard.actions';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {
  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(new LoadDashboard());
  }
}
