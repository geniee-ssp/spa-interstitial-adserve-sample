![](https://img.shields.io/badge/11.2.14-Angular-DD0031.svg?logo=angular&style=plastic)
![](https://img.shields.io/badge/~14.21.3-Node.js-339933.svg?logo=node.js&style=plastic)
# adserve-angular-spa

## ディレクトリ構造
```
adserve-angular-spa
├── README.md
├── angular.json
├── e2e
│   ├── protractor.conf.js
│   ├── src
│   │   ├── app.e2e-spec.ts
│   │   └── app.po.ts
│   └── tsconfig.json
├── karma.conf.js
├── package-lock.json
├── package.json
├── src
│   ├── app
│   │   ├── about
│   │   │   ├── about.component.css
│   │   │   ├── about.component.html
│   │   │   ├── about.component.spec.ts
│   │   │   └── about.component.ts
│   │   ├── app-routing.module.ts
│   │   ├── app.component.css
│   │   ├── app.component.html
│   │   ├── app.component.spec.ts
│   │   ├── app.component.ts
│   │   ├── app.module.ts
│   │   ├── article
│   │   │   ├── article.component.css
│   │   │   ├── article.component.html
│   │   │   ├── article.component.spec.ts
│   │   │   └── article.component.ts
│   │   ├── content
│   │   │   ├── content.component.css
│   │   │   ├── content.component.html
│   │   │   ├── content.component.spec.ts
│   │   │   └── content.component.ts
│   │   ├── home
│   │   │   ├── home.component.css
│   │   │   ├── home.component.html
│   │   │   ├── home.component.spec.ts
│   │   │   └── home.component.ts
│   │   ├── search
│   │   │   ├── search.component.css
│   │   │   ├── search.component.html
│   │   │   ├── search.component.spec.ts
│   │   │   └── search.component.ts
│   │   └── services
│   │       └── serve-inst.service.ts
│   ├── assets
│   ├── environments
│   │   ├── environment.prod.ts
│   │   └── environment.ts
│   ├── favicon.ico
│   ├── index.html
│   ├── main.ts
│   ├── polyfills.ts
│   ├── reset.css
│   ├── styles.css
│   └── test.ts
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.spec.json
└── tslint.json
```

## これはなにか
SPAでインターステシャル広告を配信するためのサンプルアプリです。

## なぜこれが必要なのか
SPAでは通常の広告タグが正常に動作しないため。
そのためSPA媒体用に導入のサンプルを用意する。

## ローカルへのインストール
```
git clone https://github.com/reiya-hattori/adserve-angular-spa.git
npm install
```

### 起動
```
npm start
OR
ng serve -o
```

[localhost:4200](http://localhost:4200/)

#### 注意点
Angular：version 11.2.14 の場合 Nodeのバージョンが14.Xでないと動作しない

## 本番にリリースされるファイルに制約はあるか

## mainへの権限

### mainの保護

## 注意点

## 参考
既存のプロジェクトに導入するための手順書です。
https://docs.google.com/document/d/1p65BFvTIRgKdf6n8R3Xq-WEQ8FPRLOA_ep29nNjbizE/edit
