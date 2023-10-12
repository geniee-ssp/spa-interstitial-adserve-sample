import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { ServeInterstitialAdService } from './services/serve-interstitial-ad.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(
    private router: Router,
    private serveInterstitialAdService: ServeInterstitialAdService
  ) {}

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.serveInterstitialAdService.executeAdScript(event.id, event.url); // ★第一引数に`event.id`を追加
      }
    });
  }
}
