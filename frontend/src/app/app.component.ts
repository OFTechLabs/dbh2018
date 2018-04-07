import { Component, OnInit } from '@angular/core';
import { BlockchainHttpService } from './services/blockchain/blockchain.http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private blockChainHttpService: BlockchainHttpService) {}

  ngOnInit(): void {
    this.blockChainHttpService.bootstrapWeb3();
  }
}
