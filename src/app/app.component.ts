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
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // this.serveInterstitialAdService.executeAdScript(event.url);
      }
    });
    // this.router.events.subscribe((event) => {
    //   if (event instanceof NavigationEnd) {
        console.log("ngOnInit: コンポーネントの初期化時に実行される・一度のみ実行")
        window.gnshbrequest = window.gnshbrequest || {cmd:[]};
        window.gnshbrequest.cmd.push(function(){
          window.gnshbrequest.applyPassback("1550723", "[data-cptid='1550723']");
        });
    //   }
    // });
  }

  ngDoCheck() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        console.log("ngDoCheck: コンポーネントの状態が変わったことを検知したら実行される")
        // window.gnshbrequest = window.gnshbrequest || {cmd:[]};
        // window.gnshbrequest.cmd.push(function(){
        //   window.gnshbrequest.registerPassback("1550723");
        //   window.gnshbrequest.rerun();
        // });
      }
    });
  }

  ngAfterContentInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
      console.log("ngAfterContentInit: 外部コンテンツを初期化したときに実行される・一度のみ実行")
      // window.gnshbrequest = window.gnshbrequest || {cmd:[]};
      //   window.gnshbrequest.cmd.push(function(){
      //     window.gnshbrequest.registerPassback("1550723");
      //     window.gnshbrequest.rerun();
      //   });
      }
    });

  }

  ngAfterContentChecked() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        console.log("ngAfterContentChecked: 外部コンテンツの変更を検知したときに実行される")  
          // window.gnshbrequest = window.gnshbrequest || {cmd:[]};
          // window.gnshbrequest.cmd.push(function(){
          //   window.gnshbrequest.applyPassback("1550723", "[data-cptid='1550723']");
          // });
      }
    })
  }

  // ページ遷移時のregisterPassbackはココがいい説？
  ngAfterViewInit() {
    // this.router.events.subscribe((event) => {
    //   if (event instanceof NavigationEnd) {
        console.log("ngAfterViewInit: 自分自身と子コンポーネントのビューの初期化時に実行される・一度のみ実行")
      window.gnshbrequest = window.gnshbrequest || {cmd:[]};
        window.gnshbrequest.cmd.push(function(){
          window.gnshbrequest.registerPassback("1550723");
          window.gnshbrequest.rerun();
        });
    //   }
    // });

  }

  // ページ遷移時のapplyPassbackはココがいい説？
  ngAfterViewChecked() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        console.log("ngAfterViewChecked: 自分自身と子コンポーネントのビューが変更されたときに実行される")
        console.log("=============================================================================")
        window.gnshbrequest = window.gnshbrequest || {cmd:[]};
        window.gnshbrequest.cmd.push(function(){
          window.gnshbrequest.applyPassback("1550723", "[data-cptid='1550723']");
        });
      }
    })
  }

  ngOnDestroy() {
    console.log("ngOnDestroy: コンポーネントが破棄されるときに実行される")
    console.log("=============================================================================")
  }
}
