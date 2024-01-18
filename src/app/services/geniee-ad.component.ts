import { isPlatformServer } from '@angular/common';
import { OnInit, Component, ChangeDetectionStrategy, OnDestroy, PLATFORM_ID, Inject, Input, Renderer2, ElementRef } from '@angular/core';
import { RemoteConfigAdKeys } from '@app/models/ad.model';
​
import { WindowService } from '@app/services/window/window.service';
import { PlatformId } from '@universal/models/common.model';
import { interval, Subscription } from 'rxjs';
declare let gnshbrequest: any;
​
@Component({
    selector: 'app-geniee-ad',
    templateUrl: './geniee-ad.component.html',
    styleUrls: ['./geniee-ad.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GenieeAdComponent implements OnInit, OnDestroy {
    private readonly AD_ID = 'novel-geniee-ad-id';
    private subscriptions = new Subscription();
    @Input() public isSensitive = false;
    @Input() public adFrameType: RemoteConfigAdKeys;
    private firstTimeLoad = true;
​
    constructor(
        @Inject(PLATFORM_ID) private platformId: PlatformId,
        private renderer: Renderer2,
        private windowService: WindowService,
        private elementRef: ElementRef,
    ) {}
​
    public ngOnInit() {
        console.warn('ngOnInit');
​
        if (isPlatformServer(this.platformId)) {
            return;
        }
        this.loadScript();
        this.subscriptions.add(
            interval(10_000).subscribe(() => {
                this.refreshAd();
            }),
        );
​
        (this.windowService.nativeWindow as any).gnshbrequest = (this.windowService.nativeWindow as any).gnshbrequest || { cmd: [] };
        (this.windowService.nativeWindow as any).gnshbrequest.cmd.push(function() {
            console.warn('registerPassback');
            (this.windowService.nativeWindow as any).gnshbrequest.registerPassback('1550723');
            (this.windowService.nativeWindow as any).gnshbrequest.rerun();
        });
​
        this.loadAd();
    }
​
    public ngOnDestroy() {
        this.removeScript();
        this.removeAd();
        this.subscriptions.unsubscribe();
    }
​
    private refreshAd() {
        console.warn('refreshAd');
        (this.windowService.nativeWindow as any).gnshbrequest = (this.windowService.nativeWindow as any).gnshbrequest || { cmd: [] };
        (this.windowService.nativeWindow as any).gnshbrequest.cmd.push(function() {
            console.warn('registerPassback');
            (this.windowService.nativeWindow as any).gnshbrequest.registerPassback('1550723');
            (this.windowService.nativeWindow as any).gnshbrequest.rerun();
        });
        this.loadAd();
    }
​
    private removeAd() {
        this.windowService.document.getElementById('geniee_overlay_outer')?.remove();
    }
​
    private removeScript() {
        const isExisted = this.windowService.document.getElementById(this.AD_ID);
        isExisted?.remove();
    }
​
    private loadScript() {
        console.warn('loadScript');
        this.removeScript();
        // 通常ページ用の自動実行を停止し、componentのライフサイクルに合わせて実行します。
        (this.windowService.nativeWindow as any).gnshbrequest = (this.windowService.nativeWindow as any).gnshbrequest || { cmd: [] };
        (this.windowService.nativeWindow as any).gnshbrequest.cmd.push(function() {
            console.warn('hogehoge');
            (this.windowService.nativeWindow as any).gnshbrequest.preventFirstRun();
            (this.windowService.nativeWindow as any).gnshbrequest.forceInternalRequest();
        });
​
        const script = this.windowService.document.createElement('script');
        script.async = true;
        script.id = this.AD_ID;
        script.src = 'https://cpt.geniee.jp/hb/v1/217381/1204/wrapper.min.js';
​
        const node = this.windowService.document.getElementsByTagName('script')[0];
        node?.parentNode?.insertBefore(script, node);
    }
​
    private loadAd() {
        console.warn('loadAd');
        // const newElement = this.renderer.createElement('div');
        // newElement.id = 'tag.elementid';
        // newElement.dataset.cptid = '1550723';
​
        // // NOTE: 広告サイズ変えるときはここも変えないと変わらない。
        // newElement.style = 'height:50px;width:320px;margin:auto;';
        // this.renderer.appendChild(this.elementRef.nativeElement, newElement);
​
        setTimeout(() => {
            (this.windowService.nativeWindow as any).gnshbrequest = (this.windowService.nativeWindow as any).gnshbrequest || { cmd: [] };
            (this.windowService.nativeWindow as any).gnshbrequest.cmd.push(function() {
                console.warn('applyPassback');
                (this.windowService.nativeWindow as any).gnshbrequest.applyPassback('1550723', "[data-cptid='1550723']");
            });
        }, 200);
    }
}