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
  ) {
    console.log("constructor: 初期化時・一度のみ実行");
    // @ts-ignore
    window.gnshbrequest = window.gnshbrequest || {cmd:[]};
    window.gnshbrequest.cmd.push(function(){
      window.gnshbrequest.registerPassback("1550723");
      window.gnshbrequest.rerun();
    });
  }

  ngOnChanges() {
    console.log("ngOnChanges: @Input 経由で入力値が設定されたときに実行される")
  }

  ngOnInit() {
    console.log("ngOnInit: コンポーネントの初期化時に実行される・一度のみ実行")
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.serveInterstitialAdService.executeAdScript(event.url);
      }
    });
    window.gnshbrequest = window.gnshbrequest || {cmd:[]};
    window.gnshbrequest.cmd.push(function(){
      window.gnshbrequest.applyPassback("1550723", "[data-cptid='1550723']");
    });
  }

  ngDoCheck() {
    console.log("ngDoCheck: コンポーネントの状態が変わったことを検知したら実行される")
    window.gnshbrequest = window.gnshbrequest || {cmd:[]};
    window.gnshbrequest.cmd.push(function(){
      window.gnshbrequest.registerPassback("1550723");
      window.gnshbrequest.rerun();
    });
  }

  ngAfterContentInit() {
    console.log("ngAfterContentInit: 外部コンテンツを初期化したときに実行される・一度のみ実行")


  }

  ngAfterContentChecked() {
    console.log("ngAfterContentChecked: 外部コンテンツの変更を検知したときに実行される")
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
          window.gnshbrequest = window.gnshbrequest || {cmd:[]};
          window.gnshbrequest.cmd.push(function(){
            window.gnshbrequest.applyPassback("1550723", "[data-cptid='1550723']");
          });
      }
    })
  }

  ngAfterViewInit() {
    console.log("ngAfterViewInit: 自分自身と子コンポーネントのビューの初期化時に実行される・一度のみ実行")

  }

  ngAfterViewChecked() {
    console.log("ngAfterViewChecked: 自分自身と子コンポーネントのビューが変更されたときに実行される")
    console.log("=============================================================================")

  }

  ngOnDestroy() {
    console.log("ngOnDestroy: コンポーネントが破棄されるときに実行される")
    console.log("=============================================================================")
  }
}
