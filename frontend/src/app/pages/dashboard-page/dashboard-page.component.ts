import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { LoadDashboard } from '../../model/dashboard.actions';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { Observable } from 'rxjs/Observable';
import { DashboardModel, DashboardState } from '../../model/dashboard.state';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {
  @Select(DashboardState) dashboard$: Observable<DashboardModel>;

  public currentYear = new Date().getFullYear();

  constructor(private store: Store) {}

  ngOnInit() {
    this.store
      .selectOnce(state => state.registration)
      .map(state => this.store.dispatch(new LoadDashboard(state)))
      .take(1)
      .subscribe();
  }
}
