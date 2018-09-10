# HelloCfNg

Pivotal Cloud FoundryへのAngular Appデプロイのサンプル

## Development Environment

試した環境

```bash
$ ng version

     _                      _                 ____ _     ___
    / \   _ __   __ _ _   _| | __ _ _ __     / ___| |   |_ _|
   / △ \ | '_ \ / _` | | | | |/ _` | '__|   | |   | |    | |
  / ___ \| | | | (_| | |_| | | (_| | |      | |___| |___ | |
 /_/   \_\_| |_|\__, |\__,_|_|\__,_|_|       \____|_____|___|
                |___/
    

Angular CLI: 6.1.5
Node: 10.8.0
OS: darwin x64
Angular: 6.1.6

$ cf -v
cf version 6.38.0+7ddf0aadd.2018-08-07
```

### Environment Setting

Angular CLIのインストール

```bash
$ npm install -g @angular/cli
$ ng version
```

[Cloud Foundry CLI](https://github.com/crowdfoundy/cli)のインストール

```bash
$ brew install cloudfoundry/tap/cf-cli
$ cf --version
```

またはインストーラで

## Create Project

```bash
$ ng new HelloCf --prefix hc --routing
```

## Staticfile Setting for URL Rewrite

ルート以外のパスがルートの`index.html`にリライトされるよう設定する。

`Staticfile`を追加。

```bash
$ touch src/Staticfile
```

`Staticfile`に設定を追加。

```diff
+ pushstate: enabled
```

`Staticfile`がビルド時に資産に含まれるよう、`angular.json`を編集する。

` projects.hello-cf-ng.architect.build.options.assets`

```diff
    "assets": [
      "src/favicon.ico",
      "src/assets",
+      "src/Staticfile"
    ],
```

## build

```bash
$ ng build --prod
```

`dist/hello-cf/`に`Staticfile`が含まれることを確認する。

## Deploy

Cloud Foundryへのデプロイ。

ログインする。ドメインやユーザー情報は管理者に確認。

```bash
$ cf login -a {cf domain}
EMAIL> {User ID}
PASSWORD> {User Password}
```

デプロイする

```bash
$ cf push hello-ng -p dist/hello-cf/ -b staticfile_buildpack -m 32m 
```

|オプション|設定値|
|---|---|
|-p|デプロイする資産の格納ディレクトリ|
|-b|ビルドパックの設定。Angularのビルド資産は静的Webアプリなので`staticfile_buildpack`を設定。|
|-m|メモリ容量|

確認

```bash
$ cf apps
  .
  .
  .
hello-cf               started           1/1         32M      1G     hello-cf.example.com

```

ログの確認
```bash
$ cf logs hello-cf --recent
```
