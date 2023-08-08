import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ServeInstService {
  constructor() {}

  private isTopPage(url: string): boolean {
    return url === '/';
  }

  private isSpecRegExpPage(url: string): boolean {
    const restrictedPatterns: RegExp[] = [
      /^.*\/article\?page=[0-9]+$/,
      /^.*\/search.*$/,
    ];
    return restrictedPatterns.some((pattern) => pattern.test(url));
  }

  public executeAdScript(): void {
    const FREQUENCY_MINUTES: number = 1;
    const CK_FREQUENCY: string = 'gninstfreq';
    const isFrequency: boolean =
      document.cookie.split('; ').indexOf(CK_FREQUENCY + '=' + CK_FREQUENCY) >=
      0;

    const manageFrequencyControl = () => {
      if (isFrequency) return;

      cookieSetLimit();

      function cookieSetLimit(): void {
        const now = new Date();
        now.setMinutes(now.getMinutes() + FREQUENCY_MINUTES);
        document.cookie =
          CK_FREQUENCY +
          '=' +
          CK_FREQUENCY +
          '; path=/; expires=' +
          now.toUTCString();
      }
    };
    const createIframe = (instTag: string) => {
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
          instTag +
          '</body></html>'
      );
      iframeContentDoc.close();
      iframeContentDoc.addEventListener('click', (event: MouseEvent) => {
        const targetElement = event.target as HTMLElement;
        if (!targetElement || targetElement.id !== 'gn_interstitial_close_icon')
          return;
        html.style.overflow = '';
        body.style.overflow = '';
        iframe.style.display = 'none';
        iframe.remove();
      });
    };
    manageFrequencyControl();
    if (!isFrequency) {
      createIframe(
        '<script type="text/javascript" src="https://js.gsspcln.jp/t/546/770/a1546770.js"></sc' +
          'ript>'
      );
    }
  }

  public isRestrictedPage(url: string): boolean {
    return this.isTopPage(url) || this.isSpecRegExpPage(url);
  }
}
