import { Component, OnInit } from '@angular/core';
import { BlockchainHttpService } from './blockchain/blockchain.http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    BlockchainHttpService.call();
  }
}
