![](https://img.shields.io/badge/11.2.14-Angular-DD0031.svg?logo=angular&style=plastic)
![](https://img.shields.io/badge/~14.21.3-Node.js-339933.svg?logo=node.js&style=plastic)
# adserve-angular-spa

#### フリークエンシーコントロールなしの場合

## 概要
SPAでインターステシャル広告を配信するためのサンプルアプリです。(for Angular)

SPAでは通常の広告タグが正常に動作しないため、SPAで広告タグが配信できる用に作成したサンプルアプリケーションです。

![インターステシャル広告を配信](https://github.com/reiya-hattori/adserve-angular-spa/assets/135287492/2f47bc56-59ef-4b97-a9b8-87618ec8a4f6)

#### フリークエンシーコントロールありの場合

![インターステシャル広告・フリークエンシーコントロールあり](https://github.com/reiya-hattori/adserve-angular-spa/assets/135287492/9707afe6-0363-4dda-9c63-3fdf19256747)

## ローカルへのインストール
```
git clone https://github.com/reiya-hattori/adserve-angular-spa.git

npm install

nvm use // バージョン管理ツールがnvmでNode.js 14.21.3がインストールされている場合

npm start
```

Open your browser : [localhost:4200](http://localhost:4200/)

### 注意点
Node.jsのバージョン ~ 14で動作します。
パッケージ管理ツールなどで所定のバージョンに合わせてから実行してください。（推奨バージョン: 14.21.3）\
当リポジトリではnvmでバージョン管理していますので推奨バージョンを用意の上`nvm use`で切り替えます。
## 解説

### 主要な編集ファイル
アプリケーションごとに必要な設定を行うために以下ファイルを編集します。
- serve-interstitial-ad.service.ts
- app.component.ts

### [serve-interstitial-ad.service.ts](./src/app/services/serve-interstitial-ad.service.ts)

#### ServeInterstitialAdService
インターステシャル告を書き出すための機能をまとめたサービス関数

#### executeAdScript
広告の配信枠の設定、配信制限ページの設定、フリークエンシーコントロール（フリークエンシーキャップ）の設定を管理して設定した条件に応じて配信制御を実行している関数

アプリケーションに応じて情報を書き換えます。
```
const ZONE_ID = '1466310'; // 対象の配信枠のZoneIDを挿入します

// 配信しないページを正規表現で指定します
const RESTRICTED_PATTERNS: RegExp[] = [
  /^.*\/article\?page=[0-9]+$/,
  /^.*\/search.*$/,
];

const FREQUENCY_MINUTES: number = 0; // 広告の表示間隔を分単位で指定
```

#### isMobile
ユーザーエージェントを利用して、モバイル端末を判定するための関数

#### createInstTagWithIframe
iframeタグで囲った広告要素をDOMに書き出すための処理を行っている関数

### [app.component.ts](./src/app/app.component.ts)
ngOnInitでサービス関数を呼び出します。
