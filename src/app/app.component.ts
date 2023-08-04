import { Component, Inject, Renderer2 } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(
    private router: Router,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        console.log(event.url);
        if (!this.isRestrictedPage(event.url)) {
          this.executeAdScript();
        }
      }
    });
  }
  private executeAdScript() {
    ((window, document) => {
      const createIframe = (insteTag: string) => {
        const html = document.documentElement;
        const body = document.body;
        const iframe = document.createElement('iframe');
        const style =
          'width: 100%;height: 100%;position: fixed;top: 0;left: 0;border: 0;z-index: 2147483647;';

        html.style.overflow = 'hidden';
        body.style.overflow = 'hidden';
        body.prepend(iframe);
        iframe.setAttribute('id', 'iframeContent');
        iframe.scrolling = 'no';
        iframe.setAttribute('style', style);
        const iframeContent = document.getElementById(
          'iframeContent'
        ) as HTMLIFrameElement;
        if (!iframeContent || !iframeContent.contentWindow) return;
        const iframeContentDoc = iframeContent.contentWindow.document;
        iframeContentDoc.open();
        iframeContentDoc.write(
          '<html><head></head><body style="margin:0;padding:0;">' +
            insteTag +
            '</body></html>'
        );
        iframeContentDoc.close();
        iframeContentDoc.addEventListener('click', (event: MouseEvent) => {
          const targetElement = event.target as HTMLElement;
          if (
            !targetElement ||
            targetElement.id !== 'gn_interstitial_close_icon'
          )
            return;
          html.style.overflow = '';
          body.style.overflow = '';
          iframe.style.display = 'none';
          iframe.remove();
        });
      };
      createIframe(
        '<script type="text/javascript" src="https://js.gsspcln.jp/t/546/770/a1546770.js"></sc' +
          'ript>'
      );
    })(window, document);
  }

  private isTopPage(url: string) {
    return url === '/';
  }

  private isSpecRegExpPage(url: string): boolean {
    const restrictedPatterns: RegExp[] = [
      /^.*\/article\?page=[0-9]+$/,
      /^.*\/search.*$/,
    ];
    return restrictedPatterns.some(pattern => pattern.test(url));
  }

  private isRestrictedPage(url: string) {
    return this.isTopPage(url) || this.isSpecRegExpPage(url);
  }
}
