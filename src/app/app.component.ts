import { Component, Inject } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { ServeInstService } from './services/serve-inst.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(
    private router: Router,
    private serveInstService: ServeInstService
  ) {}

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (!this.serveInstService.isRestrictedPage(event.url)) {
          this.serveInstService.executeAdScript();
        }
      }
    });
  }
}
