import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.handlePageTransition();
      }
    });

    this.handlePageTransition();
  }

  handlePageTransition(): void {
    document.documentElement.classList.add('gn_inst_scroll_cancel');

    const interstitialArea = document.getElementById('gn_interstitial_area');
    if (interstitialArea) {
      interstitialArea.style.display = 'block';
    }
  }
}
