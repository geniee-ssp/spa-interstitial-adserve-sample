import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ServeInstService {
  constructor() {}

  public executeAdScript(url: string, afterUrl: string): void {
    const DIV_ID = '1548501';
    const RESTRICTED_PATTERNS: RegExp[] = [
      /^.*\/article\?page=[0-9]+$/,
      /^.*\/search.*$/,
    ];
    const FREQUENCY_MINUTES: number = 0;
    const CK_FREQUENCY: string = `gninstfreq_${DIV_ID}`;

    const isTopPage: boolean = url === '/';
    const isSpecRegExpPage: boolean = RESTRICTED_PATTERNS.some(pattern => pattern.test(url));
    const isFrequency: boolean = document.cookie.split('; ').indexOf(CK_FREQUENCY + '=' + CK_FREQUENCY) >= 0;
    const isAdServeRestricted: boolean = isTopPage || isSpecRegExpPage || isFrequency;

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
    const createIframe = () => {
      const html = document.documentElement;
      const body = document.body;
      const iframe = document.createElement('iframe');
      const style =
        'width: 100%;height: 100%;position: fixed;top: 0;left: 0;border: 0;z-index: 2147483647;';
      const lastThreeNum = DIV_ID.slice(-3);
      const beforeLastThreeNum = DIV_ID.slice(-6, -3);
      const src = `https://js.gsspcln.jp/t/${beforeLastThreeNum}/${lastThreeNum}/a${DIV_ID}.js`;

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
        '<html><head></head><body style="margin:0;padding:0;"><script type="text/javascript" src="' + src + '"></script></body></html>'
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
      manageFrequencyControl();
    };
    if (!isAdServeRestricted) {
      createIframe();
    }
  }
}
