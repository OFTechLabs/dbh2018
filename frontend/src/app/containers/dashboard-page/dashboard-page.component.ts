import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { LoadDashboard } from '../../model/dashboard.actions';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {
  constructor(private store: Store) {}

  ngOnInit() {
    this.store
      .selectOnce(state => state.registration)
      .map(state => this.store.dispatch(new LoadDashboard(state)))
      .take(1)
      .subscribe();
  }
}
